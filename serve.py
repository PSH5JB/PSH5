import http.server
import re
import subprocess
from pathlib import Path

PORT = 8000
ROOT = Path(__file__).resolve().parent

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, *args):
        pass

    def do_GET(self):
        path = (self.path or "").split("?", 1)[0]
        if path == "/cache.appcache" or path == "/offline.appcache":
            self.send_error(404, "obsolete")
            return
        return super().do_GET()

    def guess_type(self, path):
        if str(path).endswith(".appcache"):
            return "text/cache-manifest"
        return super().guess_type(path)

    def end_headers(self):
        path = (self.path or "").split("?", 1)[0]
        self.send_header("Access-Control-Allow-Origin", "*")
        if path.endswith(".appcache"):
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

def local_ip():
    output = subprocess.check_output(
        ["ipconfig"],
        text=True,
        encoding="utf-8",
        errors="ignore",
    )

    for ip in re.findall(r"IPv4[^:]*:\s*([\d.]+)", output):
        if ip.startswith("192.168."):
            return ip

    return "localhost"

if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as server:
        print(f"http://{local_ip()}:{PORT}/")
        server.serve_forever()
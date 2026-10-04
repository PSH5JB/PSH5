$port = 8000
$root = "D:\Relapse exploit localhost"
$rootFull = [IO.Path]::GetFullPath($root)

$ips = @(
    Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
        Where-Object { $_.IPAddress -like '192.168.*' -or $_.IPAddress -like '10.*' } |
        Select-Object -ExpandProperty IPAddress -Unique
)
if (-not $ips) { $ips = @() }
$ips = @($ips) + @('127.0.0.1') | Select-Object -Unique

$mime = @{
    '.html'     = 'text/html; charset=utf-8'
    '.js'       = 'application/javascript; charset=utf-8'
    '.css'      = 'text/css; charset=utf-8'
    '.png'      = 'image/png'
    '.jpg'      = 'image/jpeg'
    '.elf'      = 'application/octet-stream'
    '.bin'      = 'application/octet-stream'
    '.json'     = 'application/json'
    '.md'       = 'text/plain; charset=utf-8'
    '.appcache' = 'text/cache-manifest'
}

$listener = New-Object System.Net.HttpListener
foreach ($ip in $ips) {
    $listener.Prefixes.Add("http://${ip}:${port}/")
}
$listener.Start()

Write-Host ""
foreach ($ip in $ips) {
    if ($ip -eq '127.0.0.1') {
        Write-Host "  Local -> http://${ip}:${port}/"
    } else {
        Write-Host "  PS5   -> http://${ip}:${port}/"
    }
}
Write-Host ""
Write-Host "  Press Ctrl+C to stop."
Write-Host ""

while ($listener.IsListening) {
    $ctx = $null
    try {
        $ctx = $listener.GetContext()
    } catch {
        Write-Host "  listener stopped"
        break
    }

    $req = $ctx.Request
    $resp = $ctx.Response
    $resp.KeepAlive = $false
    $resp.Headers.Add('Access-Control-Allow-Origin', '*')
    $resp.Headers.Add('Cache-Control', 'no-store')

    try {
        $urlPath = [Uri]::UnescapeDataString($req.Url.AbsolutePath)
        if ($urlPath -eq '/') { $urlPath = '/index.html' }

        if ($urlPath -eq '/cache.appcache' -or $urlPath -eq '/offline.appcache') {
            $resp.StatusCode = 404
            $body = [Text.Encoding]::UTF8.GetBytes('obsolete')
            $resp.ContentType = 'text/plain'
            $resp.ContentLength64 = $body.Length
            $resp.OutputStream.Write($body, 0, $body.Length)
            Write-Host "  404  $urlPath (obsolete old cache)"
            continue
        }

        if ($urlPath -like '*.appcache') {
            $resp.Headers.Add('Cache-Control', 'no-cache')
        }

        $rel = $urlPath.TrimStart('/').Replace('/', '\')
        $file = [IO.Path]::GetFullPath((Join-Path $rootFull $rel))
        if ($file -notlike "$rootFull*") {
            throw "path outside root"
        }

        if (Test-Path -LiteralPath $file -PathType Leaf) {
            $ext = [IO.Path]::GetExtension($file).ToLower()
            $resp.ContentType = if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' }
            $bytes = [IO.File]::ReadAllBytes($file)
            $resp.StatusCode = 200
            $resp.ContentLength64 = $bytes.Length
            $resp.OutputStream.Write($bytes, 0, $bytes.Length)
            $resp.OutputStream.Flush()
            Write-Host "  200  $urlPath  $($bytes.Length)"
        } else {
            $resp.StatusCode = 404
            $body = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
            $resp.ContentType = 'text/plain'
            $resp.ContentLength64 = $body.Length
            $resp.OutputStream.Write($body, 0, $body.Length)
            Write-Host "  404  $urlPath"
        }
    } catch {
        Write-Host "  ERR  $($req.Url.AbsolutePath)  $($_.Exception.Message)"
        try {
            $resp.StatusCode = 500
        } catch {}
    } finally {
        try { $resp.OutputStream.Close() } catch {}
        try { $resp.Close() } catch {}
    }
}

# PSH5JB User Guide DNS

Public Primary DNS for this host: **`167.99.91.255`**

On the PS5 set that as Manual DNS, then open User’s Guide. Press **OK** on the certificate warning.

The rest of this file is only if you want your own box.

The PS5 User Guide loads `https://manuals.playstation.net/...`. A DNS box you control answers that name with **your** server IP, then HTTPS on that box serves this host.

You need a machine with a public (or LAN) IP and ports **53/udp**, **80**, and **443** open.

Replace `YOUR_IP` in `dnsmasq.conf` with that machine’s IP.

## Ubuntu (VPS or home server)

```bash
sudo apt-get update
sudo apt-get install -y nginx dnsmasq openssl git
sudo git clone https://github.com/PSH5JB/PSH5.git /var/www/psh5
sudo openssl req -x509 -nodes -newkey rsa:2048 -sha256 -days 3650 \
  -keyout /etc/ssl/private/psh5jb.key \
  -out /etc/ssl/certs/psh5jb.crt \
  -subj "/CN=manuals.playstation.net" \
  -addext "subjectAltName=DNS:manuals.playstation.net,DNS:manuals.sonyentertainmentnetwork.com" \
  -addext "basicConstraints=CA:FALSE" \
  -addext "keyUsage=digitalSignature,keyEncipherment" \
  -addext "extendedKeyUsage=serverAuth"

sudo cp /var/www/psh5/dns/nginx-user-guide.conf /etc/nginx/sites-available/psh5jb
sudo ln -sf /etc/nginx/sites-available/psh5jb /etc/nginx/sites-enabled/psh5jb
sudo rm -f /etc/nginx/sites-enabled/default
sudo cp /var/www/psh5/dns/dnsmasq.conf /etc/dnsmasq.d/psh5jb.conf
# edit YOUR_IP in /etc/dnsmasq.d/psh5jb.conf
sudo nginx -t && sudo systemctl restart nginx dnsmasq
```

PS5 Primary DNS = that machine’s IP. The public PSH5JB host already uses `167.99.91.255`.

## What this does

- `manuals.playstation.net` (and the Sony manuals alias) → your server, which serves PSH5JB for every path, including `/document/<lang>/ps5/`.
- PSN (sign-in, store, trophies) and PlayStation update hosts → nowhere.
- Everything else → `1.1.1.1`.

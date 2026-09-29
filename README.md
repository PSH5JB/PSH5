# PSH5JB

PS5 jailbreak host for firmware **7.00–13.60**.

**Website:** https://psh5jb.github.io/PSH5/

## Open it on the PS5

On the PS5 browser, go to:

https://psh5jb.github.io/PSH5/

Leave the page open. It runs WebKit, then kernel, then loads **kstuff**, **ShadowMountPlus**, and **etaHEN** on its own.

## User Guide (auto-connect)

The User Guide only opens this host if the PS5’s DNS sends `manuals.playstation.net` to a server you control. GitHub Pages cannot do that by itself.

1. Stand up the DNS box in [`dns/`](dns/).
2. On the PS5: **Settings → Network → Set Up Internet Connection** → your Wi-Fi/LAN → **Advanced Settings → DNS Settings → Manual**.
3. **Primary DNS** = that server’s IP. Leave Secondary blank.
4. **Settings → User’s Guide, Health and Safety, and Other Information → User’s Guide**.
5. If a certificate warning appears, press **OK**.

Until that DNS IP is live, use the website link above.

## If it stalls

Reload the page if the browser freezes. If the kernel stage hangs, reboot the PS5 and try again.

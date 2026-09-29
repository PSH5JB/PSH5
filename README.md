# PSH5JB

PS5 jailbreak host for firmware **7.00–13.60**.

**Website:** https://psh5jb.github.io/PSH5/

**User Guide DNS:** `167.99.91.255`

## User Guide (auto-connect)

On the PS5:

1. **Settings → Network → Set Up Internet Connection** → your Wi-Fi/LAN → **Advanced Settings → DNS Settings → Manual**.
2. **Primary DNS** = `167.99.91.255`. Leave Secondary blank.
3. Finish the connection, then open **Settings → User’s Guide, Health and Safety, and Other Information → User’s Guide**.
4. If a certificate warning appears, press **OK**.

The page runs WebKit, then kernel, then loads **kstuff**, **ShadowMountPlus**, and **etaHEN** on its own.

This DNS also blocks PSN (sign-in, store, trophies) and system updates.

## Browser

On the PS5 browser, go to:

https://psh5jb.github.io/PSH5/

Leave the page open. Same chain as User Guide.

## If it stalls

Reload the page if the browser freezes. If the kernel stage hangs, reboot the PS5 and try again.

To run your own DNS box instead of the public IP above, see [`dns/`](dns/).

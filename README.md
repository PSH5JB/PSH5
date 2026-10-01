# PS5 Relapse Exploit
Supported firmware: 7.00 through 13.60.

## Usage
- In the network settings, set Primary DNS to `45.56.67.85` (Recommended)
- Run `python serve.py` locally, or open https://ntfargo.github.io/Relapse-Exploit/ on the PS5.
- The default payloads are stored in `payloads/` after a successful run, the ELF loader listens on port `9021`.
- If the page cannot read the firmware (PKG Internet Browser), pick it on the page. The jailbreak starts after that.
- After elfldr starts on port `9021`, the host auto-sends `payloads/OnionHEN.elf`, waits for the HEN stack, then sends `payloads/pldmgr_v0.5.2.elf` (do not send kstuff/etaHEN first). Payload Manager is then at `http://<PS5>:8084`.
- OnionHEN auto-starts a built-in FTP server on TCP `1337`.
- After Payload Manager, the host sends `payloads/webkit-autoloader-installer_v0.5.2.elf` unless WebKit Autoloader is already on the homescreen. Leave `http://127.0.0.1:18181/` open until install finishes, then reboot and open **WebKit Autoloader**. The Internet Browser PKG is kept.

## Stability notes
Webkit may need several attempts, reload the page if the browser stalls. The kernel exploit may hang or panic the console, so reboot before trying again if that happens.

## Exploit chain
Browser stage uses JSC info leaks and a structured clone object pool mismatch to corrupt a typedarray. The kernel stage combines a address leak with an `aio_multi_wait` uaf race to establish kernel r/w.

## Credits
ntfargo, ufm42, Sonic-Iso, Jordy, Dr. Yenyen, TheFlow, SlidyBat,  Flatz, cow, nhk, bollarz, Sleirsgoevy, EchoStretch, EarthOnion.

## Disclaimer
This project is intended for **educational and security research purposes only**. It does not endorse piracy, unauthorized access, or misuse of commercial devices. Use it only on devices you own or are authorized to test, and comply with applicable laws and regulations.

The software is provided as-is, without warranty. You assume the risks of using it, including system instability, data loss, and account bans. The maintainers accept no liability for resulting damage. 

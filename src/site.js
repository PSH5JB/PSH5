import { establishPrimitive } from "./webkit.js";
import { installWindowP } from "./utils/mem.js";

const output = document.getElementById("console");

function setStage(id, state) {
  const el = document.getElementById("stage-" + id);
  if (el) el.dataset.s = state;
}
window.setStage = setStage;

function writeLog(message, type = "log", replace = false) {
  let line = replace ? output.lastElementChild : null;
  if (!line) {
    line = document.createElement("div");
    output.appendChild(line);
  }
  const prefix = type === "error" ? "✕" : type === "info" || type === "success" ? "›" : "·";
  line.className = "l-" + type;
  line.textContent = `${prefix} ${message}`;
  output.scrollTop = output.scrollHeight;
}

function writeEvent(name, detail, type) {
  writeLog(detail == null || detail === "" ? name : `${name}: ${detail}`,
    type || (name === "Failed" ? "error" : "log"));
}

window.writeLog = writeLog;
window.jb = { mark: writeEvent };

async function getPrimitive() {
  setStage("webkit", "active");
  writeLog("Starting WebKit exploit");
  const primitive = installWindowP(await establishPrimitive(writeEvent));
  if (!primitive || typeof primitive.read8 !== "function")
    throw new Error("Memory primitive unavailable");
  writeLog("ARW ready", "success");
  setStage("webkit", "done");
  return primitive;
}

function getWebKitBase() {
  const ctor = globalThis.__ps5NativeCtor;
  if (typeof ctor !== "number" || typeof OFFSET_wk_host_constructor_candidates === "undefined")
    throw new Error("WebKit base inputs are unavailable");
  for (const offset of OFFSET_wk_host_constructor_candidates) {
    const base = ctor - offset;
    if (base >= 0x800000000 && base < 0x900000000 && base % 0x4000 === 0)
      return base;
  }
  throw new Error("WebKit base not found");
}

async function run() {
  const rejection = window.firmware.rejection();
  if (rejection) throw new Error(rejection);

  setStage("init", "active");

  const fwLabel = document.getElementById("fw-label");
  if (fwLabel) fwLabel.textContent = `FW ${window.fw_str}`;

  writeLog(`Firmware: ${window.fw_str}`, "info");
  setStage("init", "done");

  const primitive = await getPrimitive();
  writeLog(`WebKit base: 0x${getWebKitBase().toString(16)}`, "info");

  setStage("kernel", "active");
  await import("./relapse_exploit.js");
  await main(primitive);
}

run().catch((error) => {
  writeLog(error instanceof Error ? error.message : String(error), "error");
  ["init", "webkit", "kernel", "payloads"].forEach(id => {
    const el = document.getElementById("stage-" + id);
    if (el && el.dataset.s === "active") el.dataset.s = "error";
  });
});

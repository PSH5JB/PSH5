"use strict";

const supportedFirmware = [
  "13.60", "13.42", "13.40", "13.20", "13.00",
  "12.70", "12.60", "12.40", "12.20", "12.02", "12.00",
  "11.60", "11.20", "11.00",
  "10.60", "10.40", "10.20", "10.01", "10.00",
  "9.60", "9.40", "9.20", "9.00",
  "8.60", "8.40", "8.20", "8.00",
  "7.61", "7.60", "7.40", "7.20", "7.01", "7.00",
];

function note(message, type) {
  if (typeof window.writeLog === "function") {
    window.writeLog(message, type || "info");
    return;
  }
  window._logQueue = window._logQueue || [];
  window._logQueue.push([message, type || "info"]);
}

function normalizeFw(raw) {
  const match = /^(\d+)\.(\d+)$/.exec(raw || "");
  if (!match) return raw || "";
  const minor = match[2].length === 1 ? match[2] + "0" : match[2];
  return match[1] + "." + minor;
}

function detectFirmware(ua) {
  const text = String(ua || "");
  const patterns = [
    /PlayStation\s*5\/(\d+\.\d+)/i,
    /PlayStation\s*5\s+(\d+\.\d+)/i,
    /PlayStation\s*5[;,\s]+(\d+\.\d+)/i,
    /PS5\/(\d+\.\d+)/i,
    /PS5\s+(\d+\.\d+)/i,
  ];
  for (let i = 0; i < patterns.length; i++) {
    const hit = patterns[i].exec(text);
    if (!hit) continue;
    const fw = normalizeFw(hit[1]);
    if (supportedFirmware.includes(fw)) return fw;
  }
  return "";
}

function queryFirmware() {
  const hit = /[?&]fw=(\d+\.\d+)/i.exec(location.search || "");
  return hit ? normalizeFw(hit[1]) : "";
}

function storedFirmware() {
  try { return normalizeFw(localStorage.getItem("psh5-fw") || ""); } catch (_) { return ""; }
}

function rememberFirmware(fw) {
  try { localStorage.setItem("psh5-fw", fw); } catch (_) {}
}

function applyFirmware(fw) {
  rememberFirmware(fw);
  const base = location.href.split("?")[0].split("#")[0];
  if (location.search || location.hash) {
    location.replace(base);
    return;
  }
  location.reload();
}

const firmwareUserAgent = navigator.userAgent || "";
const firmwareVersion = (function () {
  const fromQuery = queryFirmware();
  if (fromQuery && supportedFirmware.includes(fromQuery)) {
    rememberFirmware(fromQuery);
    return fromQuery;
  }
  const fromUa = detectFirmware(firmwareUserAgent);
  if (fromUa) {
    rememberFirmware(fromUa);
    return fromUa;
  }
  const fromStore = storedFirmware();
  if (fromStore && supportedFirmware.includes(fromStore)) return fromStore;
  return "";
})();

window.fw_str = firmwareVersion;
window.firmware = {
  needsPick: !firmwareVersion,
  rejection() {
    if (!firmwareVersion) return null;
    if (!supportedFirmware.includes(firmwareVersion)) {
      return "FW " + firmwareVersion + " is not supported";
    }
    return null;
  },
};

function paintFwLabel() {
  const el = document.getElementById("fw-label");
  if (!el) return;
  const rejection = window.firmware.rejection();
  if (firmwareVersion && !rejection) {
    el.textContent = "FW " + firmwareVersion;
    el.classList.add("fw-ok");
    el.classList.remove("fw-bad");
    return;
  }
  el.textContent = firmwareVersion ? (rejection || "Detecting firmware…") : "Pick firmware";
  el.classList.toggle("fw-bad", !firmwareVersion || !!rejection);
  el.classList.remove("fw-ok");
}

function showFwPicker() {
  const box = document.getElementById("fw-picker");
  const list = document.getElementById("fw-picker-list");
  if (!box || !list) return;
  list.innerHTML = "";
  for (let i = 0; i < supportedFirmware.length; i++) {
    const fw = supportedFirmware[i];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "fw-btn" + (fw === firmwareVersion ? " fw-btn-on" : "");
    btn.textContent = fw;
    btn.onclick = function () { applyFirmware(fw); };
    list.appendChild(btn);
  }
  box.style.display = "block";
  note("pick your firmware, then the jailbreak starts", "info");
}

paintFwLabel();

(function bindFwPicker() {
  const label = document.getElementById("fw-label");
  if (label) {
    label.style.cursor = "pointer";
    label.onclick = function () { showFwPicker(); };
  }
  if (!firmwareVersion) showFwPicker();
})();

window.offsetsReady = new Promise(function (resolve, reject) {
  if (!firmwareVersion) {
    resolve();
    return;
  }
  const script = document.createElement("script");
  script.onload = function () { resolve(); };
  script.onerror = function () {
    reject(new Error("failed to load offsets/" + firmwareVersion + ".js"));
  };
  script.src = "offsets/" + firmwareVersion + ".js";
  document.body.appendChild(script);
});

window.loadBinary = function (url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      const buf = xhr.response;
      const ok = buf && buf.byteLength &&
        (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300));
      if (ok) {
        resolve(new Uint8Array(buf));
        return;
      }
      reject(new Error(url + " HTTP " + xhr.status));
    };
    xhr.onerror = function () { reject(new Error(url + " network error")); };
    xhr.send();
  });
};

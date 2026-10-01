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

const firmwareUserAgent = navigator.userAgent || "";
const firmwareVersion = detectFirmware(firmwareUserAgent);

window.fw_str = firmwareVersion;
window.firmware = {
  rejection() {
    if (!firmwareVersion) return "could not detect firmware";
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
  el.textContent = rejection || "Could not detect firmware";
  el.classList.add("fw-bad");
  el.classList.remove("fw-ok");
}

paintFwLabel();

window.offsetsReady = new Promise(function (resolve, reject) {
  if (!firmwareVersion) {
    reject(new Error("could not detect firmware"));
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

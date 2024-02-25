  let buildArgsList;

// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

      function stringFromDartString(string) {
        const totalLength = dartInstance.exports.$stringLength(string);
        let result = '';
        let index = 0;
        while (index < totalLength) {
          let chunkLength = Math.min(totalLength - index, 0xFFFF);
          const array = new Array(chunkLength);
          for (let i = 0; i < chunkLength; i++) {
              array[i] = dartInstance.exports.$stringRead(string, index++);
          }
          result += String.fromCharCode(...array);
        }
        return result;
    }

    function stringToDartString(string) {
        const length = string.length;
        let range = 0;
        for (let i = 0; i < length; i++) {
            range |= string.codePointAt(i);
        }
        if (range < 256) {
            const dartString = dartInstance.exports.$stringAllocate1(length);
            for (let i = 0; i < length; i++) {
                dartInstance.exports.$stringWrite1(dartString, i, string.codePointAt(i));
            }
            return dartString;
        } else {
            const dartString = dartInstance.exports.$stringAllocate2(length);
            for (let i = 0; i < length; i++) {
                dartInstance.exports.$stringWrite2(dartString, i, string.charCodeAt(i));
            }
            return dartString;
        }
    }

      // Prints to the console
    function printToConsole(value) {
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
        const length = dartInstance.exports.$listLength(list);
        const array = new constructor(length);
        for (let i = 0; i < length; i++) {
            array[i] = dartInstance.exports.$listRead(list, i);
        }
        return array;
    }

    buildArgsList = function(list) {
        const dartList = dartInstance.exports.$makeStringList();
        for (let i = 0; i < list.length; i++) {
            dartInstance.exports.$listAdd(dartList, stringToDartString(list[i]));
        }
        return dartList;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
        wrapped.dartFunction = dartFunction;
        wrapped[jsWrappedDartFunctionSymbol] = true;
        return wrapped;
    }

    if (WebAssembly.String === undefined) {
        WebAssembly.String = {
            "charCodeAt": (s, i) => s.charCodeAt(i),
            "compare": (s1, s2) => {
                if (s1 < s2) return -1;
                if (s1 > s2) return 1;
                return 0;
            },
            "concat": (s1, s2) => s1 + s2,
            "equals": (s1, s2) => s1 === s2,
            "fromCharCode": (i) => String.fromCharCode(i),
            "length": (s) => s.length,
            "substring": (s, a, b) => s.substring(a, b),
        };
    }

    // Imports
    const dart2wasm = {

  _1603: (x0,x1) => x0.matchMedia(x1),
_19936: () => globalThis.window,
_19957: x0 => x0.matches,
_19961: x0 => x0.platform,
_19966: x0 => x0.navigator,
_1675: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_1676: s => printToConsole(stringFromDartString(s)),
_1813: o => o === undefined,
_1814: o => typeof o === 'boolean',
_1815: o => typeof o === 'number',
_1817: o => typeof o === 'string',
_1820: o => o instanceof Int8Array,
_1821: o => o instanceof Uint8Array,
_1822: o => o instanceof Uint8ClampedArray,
_1823: o => o instanceof Int16Array,
_1824: o => o instanceof Uint16Array,
_1825: o => o instanceof Int32Array,
_1826: o => o instanceof Uint32Array,
_1827: o => o instanceof Float32Array,
_1828: o => o instanceof Float64Array,
_1829: o => o instanceof ArrayBuffer,
_1830: o => o instanceof DataView,
_1831: o => o instanceof Array,
_1832: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_1834: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_1835: o => o instanceof RegExp,
_1836: (l, r) => l === r,
_1837: o => o,
_1838: o => o,
_1839: o => o,
_1840: b => !!b,
_1841: o => o.length,
_1844: (o, i) => o[i],
_1845: f => f.dartFunction,
_1846: l => arrayFromDartList(Int8Array, l),
_1847: l => arrayFromDartList(Uint8Array, l),
_1848: l => arrayFromDartList(Uint8ClampedArray, l),
_1849: l => arrayFromDartList(Int16Array, l),
_1850: l => arrayFromDartList(Uint16Array, l),
_1851: l => arrayFromDartList(Int32Array, l),
_1852: l => arrayFromDartList(Uint32Array, l),
_1853: l => arrayFromDartList(Float32Array, l),
_1854: l => arrayFromDartList(Float64Array, l),
_1855: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_1856: l => arrayFromDartList(Array, l),
_1857: stringFromDartString,
_1858: stringToDartString,
_1859: () => ({}),
_1860: () => [],
_1862: () => globalThis,
_1863: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_1864: (o, p) => p in o,
_1865: (o, p) => o[p],
_1866: (o, p, v) => o[p] = v,
_1867: (o, m, a) => o[m].apply(o, a),
_1870: (p, s, f) => p.then(s, f),
_1871: s => {
      let jsString = stringFromDartString(s);
      if (/[[\]{}()*+?.\\^$|]/.test(jsString)) {
          jsString = jsString.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
      }
      return stringToDartString(jsString);
    },
_1802: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_1803: (x0,x1) => x0.exec(x1),
_1804: (x0,x1) => x0.test(x1),
_1805: (x0,x1) => x0.exec(x1),
_1806: (x0,x1) => x0.exec(x1),
_1807: x0 => x0.pop(),
_1811: (x0,x1,x2) => x0[x1] = x2,
_1861: l => new Array(l),
_1869: o => String(o),
_1874: x0 => x0.index,
_1876: x0 => x0.length,
_1878: (x0,x1) => x0[x1],
_1880: (x0,x1) => x0.exec(x1),
_1882: x0 => x0.flags,
_1883: x0 => x0.multiline,
_1884: x0 => x0.ignoreCase,
_1885: x0 => x0.unicode,
_1886: x0 => x0.dotAll,
_1887: (x0,x1) => x0.lastIndex = x1,
_1762: Object.is,
_1764: WebAssembly.String.concat,
_1770: (t, s) => t.set(s),
_1772: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_1774: o => o.buffer,
_1722: (a, i) => a.push(i),
_1726: a => a.pop(),
_1727: (a, i) => a.splice(i, 1),
_1729: (a, s) => a.join(s),
_1730: (a, s, e) => a.slice(s, e),
_1733: a => a.length,
_1735: (a, i) => a[i],
_1736: (a, i, v) => a[i] = v,
_1738: a => a.join(''),
_1739: (o, a, b) => o.replace(a, b),
_1741: (s, t) => s.split(t),
_1742: s => s.toLowerCase(),
_1743: s => s.toUpperCase(),
_1744: s => s.trim(),
_1745: s => s.trimLeft(),
_1746: s => s.trimRight(),
_1748: (s, p, i) => s.indexOf(p, i),
_1749: (s, p, i) => s.lastIndexOf(p, i),
_1750: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_1751: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_1752: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_1753: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_1754: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_1755: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_1756: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_1757: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_1759: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
_1760: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_1761: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_1763: WebAssembly.String.charCodeAt,
_1765: WebAssembly.String.substring,
_1766: WebAssembly.String.length,
_1767: WebAssembly.String.equals,
_1768: WebAssembly.String.compare,
_1769: WebAssembly.String.fromCharCode,
_1775: o => o.byteOffset,
_1776: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_1777: (b, o) => new DataView(b, o),
_1778: (b, o, l) => new DataView(b, o, l),
_1779: Function.prototype.call.bind(DataView.prototype.getUint8),
_1780: Function.prototype.call.bind(DataView.prototype.setUint8),
_1781: Function.prototype.call.bind(DataView.prototype.getInt8),
_1782: Function.prototype.call.bind(DataView.prototype.setInt8),
_1783: Function.prototype.call.bind(DataView.prototype.getUint16),
_1784: Function.prototype.call.bind(DataView.prototype.setUint16),
_1785: Function.prototype.call.bind(DataView.prototype.getInt16),
_1786: Function.prototype.call.bind(DataView.prototype.setInt16),
_1787: Function.prototype.call.bind(DataView.prototype.getUint32),
_1788: Function.prototype.call.bind(DataView.prototype.setUint32),
_1789: Function.prototype.call.bind(DataView.prototype.getInt32),
_1790: Function.prototype.call.bind(DataView.prototype.setInt32),
_1793: Function.prototype.call.bind(DataView.prototype.getBigInt64),
_1794: Function.prototype.call.bind(DataView.prototype.setBigInt64),
_1795: Function.prototype.call.bind(DataView.prototype.getFloat32),
_1796: Function.prototype.call.bind(DataView.prototype.setFloat32),
_1797: Function.prototype.call.bind(DataView.prototype.getFloat64),
_1798: Function.prototype.call.bind(DataView.prototype.setFloat64),
_1682: (ms, c) =>
              setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
_1683: (handle) => clearTimeout(handle),
_1684: (ms, c) =>
          setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
_1685: (handle) => clearInterval(handle),
_1687: () => Date.now(),
_1686: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_1614: x0 => new Array(x0),
_1677: (o, t) => o instanceof t,
_1679: f => finalizeWrapper(f,x0 => dartInstance.exports._1679(f,x0)),
_1680: f => finalizeWrapper(f,x0 => dartInstance.exports._1680(f,x0)),
_1681: o => Object.keys(o),
_1799: s => stringToDartString(stringFromDartString(s).toUpperCase()),
_1800: s => stringToDartString(stringFromDartString(s).toLowerCase()),
_1651: v => stringToDartString(v.toString()),
_1652: (d, digits) => stringToDartString(d.toFixed(digits)),
_1655: (d, precision) => stringToDartString(d.toPrecision(precision)),
_1656: o => new WeakRef(o),
_1657: r => r.deref(),
_1662: Date.now,
_1664: s => new Date(s * 1000).getTimezoneOffset() * 60 ,
_1665: s => {
      const jsSource = stringFromDartString(s);
      if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(jsSource)) {
        return NaN;
      }
      return parseFloat(jsSource);
    },
_1666: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_1667: () => typeof dartUseDateNowForTicks !== "undefined",
_1668: () => 1000 * performance.now(),
_1669: () => Date.now(),
_1672: () => new WeakMap(),
_1673: (map, o) => map.get(o),
_1674: (map, o, v) => map.set(o, v),
_162: x0 => x0.focus(),
_163: x0 => x0.select(),
_164: (x0,x1) => x0.append(x1),
_165: x0 => x0.remove(),
_168: x0 => x0.unlock(),
_173: x0 => x0.getReader(),
_183: x0 => new MutationObserver(x0),
_202: (x0,x1,x2) => x0.addEventListener(x1,x2),
_203: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_206: x0 => new ResizeObserver(x0),
_209: (x0,x1) => new Intl.Segmenter(x0,x1),
_210: x0 => x0.next(),
_211: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
_287: x0 => x0.close(),
_288: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
_289: x0 => new window.ImageDecoder(x0),
_290: x0 => x0.close(),
_291: x0 => ({frameIndex: x0}),
_292: (x0,x1) => x0.decode(x1),
_295: f => finalizeWrapper(f,x0 => dartInstance.exports._295(f,x0)),
_296: f => finalizeWrapper(f,x0 => dartInstance.exports._296(f,x0)),
_297: (x0,x1) => ({addView: x0,removeView: x1}),
_298: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._298(f,arguments.length,x0) }),
_299: f => finalizeWrapper(f,() => dartInstance.exports._299(f)),
_300: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
_301: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._301(f,arguments.length,x0) }),
_302: x0 => ({runApp: x0}),
_303: x0 => new Uint8Array(x0),
_305: x0 => x0.preventDefault(),
_306: x0 => x0.stopPropagation(),
_307: (x0,x1) => x0.addListener(x1),
_308: (x0,x1) => x0.removeListener(x1),
_309: (x0,x1) => x0.append(x1),
_310: x0 => x0.remove(),
_311: x0 => x0.disconnect(),
_312: (x0,x1) => x0.addListener(x1),
_313: (x0,x1) => x0.removeListener(x1),
_314: (x0,x1) => x0.append(x1),
_315: x0 => x0.remove(),
_316: x0 => x0.stopPropagation(),
_320: x0 => x0.preventDefault(),
_321: (x0,x1) => x0.append(x1),
_322: x0 => x0.remove(),
_327: (x0,x1) => x0.appendChild(x1),
_328: (x0,x1,x2) => x0.insertBefore(x1,x2),
_329: (x0,x1) => x0.removeChild(x1),
_330: (x0,x1) => x0.appendChild(x1),
_331: (x0,x1) => x0.transferFromImageBitmap(x1),
_332: (x0,x1) => x0.append(x1),
_333: (x0,x1) => x0.append(x1),
_334: (x0,x1) => x0.append(x1),
_335: x0 => x0.remove(),
_336: x0 => x0.focus(),
_337: x0 => x0.focus(),
_338: x0 => x0.remove(),
_339: x0 => x0.focus(),
_340: x0 => x0.remove(),
_341: (x0,x1) => x0.append(x1),
_342: x0 => x0.focus(),
_343: (x0,x1) => x0.append(x1),
_344: x0 => x0.remove(),
_345: (x0,x1) => x0.append(x1),
_346: (x0,x1) => x0.append(x1),
_347: (x0,x1,x2) => x0.insertBefore(x1,x2),
_348: (x0,x1) => x0.append(x1),
_349: (x0,x1,x2) => x0.insertBefore(x1,x2),
_350: x0 => x0.remove(),
_351: x0 => x0.remove(),
_352: x0 => x0.remove(),
_353: (x0,x1) => x0.append(x1),
_354: x0 => x0.remove(),
_355: x0 => x0.remove(),
_356: x0 => x0.getBoundingClientRect(),
_357: x0 => x0.remove(),
_358: x0 => x0.blur(),
_360: x0 => x0.focus(),
_361: x0 => x0.focus(),
_362: x0 => x0.remove(),
_363: x0 => x0.focus(),
_364: x0 => x0.focus(),
_365: x0 => x0.blur(),
_366: x0 => x0.remove(),
_379: (x0,x1) => x0.append(x1),
_380: x0 => x0.remove(),
_381: (x0,x1) => x0.append(x1),
_382: (x0,x1,x2) => x0.insertBefore(x1,x2),
_383: (x0,x1) => x0.append(x1),
_384: x0 => x0.focus(),
_385: x0 => x0.focus(),
_386: x0 => x0.focus(),
_387: x0 => x0.focus(),
_388: x0 => x0.focus(),
_389: (x0,x1) => x0.append(x1),
_390: x0 => x0.focus(),
_391: x0 => x0.blur(),
_392: x0 => x0.remove(),
_394: x0 => x0.preventDefault(),
_395: x0 => x0.focus(),
_396: x0 => x0.preventDefault(),
_397: x0 => x0.preventDefault(),
_398: x0 => x0.preventDefault(),
_399: x0 => x0.focus(),
_400: x0 => x0.focus(),
_401: (x0,x1) => x0.append(x1),
_402: x0 => x0.focus(),
_403: x0 => x0.focus(),
_404: x0 => x0.focus(),
_405: x0 => x0.focus(),
_406: (x0,x1) => x0.observe(x1),
_407: x0 => x0.disconnect(),
_408: (x0,x1) => x0.appendChild(x1),
_409: (x0,x1) => x0.appendChild(x1),
_410: (x0,x1) => x0.appendChild(x1),
_411: (x0,x1) => x0.append(x1),
_412: (x0,x1) => x0.append(x1),
_413: x0 => x0.remove(),
_414: (x0,x1) => x0.append(x1),
_416: (x0,x1) => x0.appendChild(x1),
_417: (x0,x1) => x0.append(x1),
_418: x0 => x0.remove(),
_419: (x0,x1) => x0.append(x1),
_423: (x0,x1) => x0.appendChild(x1),
_424: x0 => x0.remove(),
_980: () => globalThis.window.flutterConfiguration,
_981: x0 => x0.assetBase,
_985: x0 => x0.debugShowSemanticsNodes,
_986: x0 => x0.hostElement,
_987: x0 => x0.multiViewEnabled,
_988: x0 => x0.nonce,
_990: x0 => x0.useColorEmoji,
_994: x0 => x0.console,
_995: x0 => x0.devicePixelRatio,
_996: x0 => x0.document,
_997: x0 => x0.history,
_998: x0 => x0.innerHeight,
_999: x0 => x0.innerWidth,
_1000: x0 => x0.location,
_1001: x0 => x0.navigator,
_1002: x0 => x0.visualViewport,
_1003: x0 => x0.performance,
_1004: (x0,x1) => x0.fetch(x1),
_1009: (x0,x1) => x0.dispatchEvent(x1),
_1010: (x0,x1) => x0.matchMedia(x1),
_1011: (x0,x1) => x0.getComputedStyle(x1),
_1013: x0 => x0.screen,
_1014: (x0,x1) => x0.requestAnimationFrame(x1),
_1015: f => finalizeWrapper(f,x0 => dartInstance.exports._1015(f,x0)),
_1019: (x0,x1) => x0.warn(x1),
_1022: (x0,x1) => x0.debug(x1),
_1023: () => globalThis.window,
_1024: () => globalThis.Intl,
_1025: () => globalThis.Symbol,
_1028: x0 => x0.clipboard,
_1029: x0 => x0.maxTouchPoints,
_1030: x0 => x0.vendor,
_1031: x0 => x0.language,
_1032: x0 => x0.platform,
_1033: x0 => x0.userAgent,
_1034: x0 => x0.languages,
_1035: x0 => x0.documentElement,
_1036: (x0,x1) => x0.querySelector(x1),
_1039: (x0,x1) => x0.createElement(x1),
_1041: (x0,x1) => x0.execCommand(x1),
_1045: (x0,x1) => x0.createTextNode(x1),
_1046: (x0,x1) => x0.createEvent(x1),
_1050: x0 => x0.head,
_1051: x0 => x0.body,
_1052: (x0,x1) => x0.title = x1,
_1055: x0 => x0.activeElement,
_1057: x0 => x0.visibilityState,
_1058: () => globalThis.document,
_1059: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1060: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1061: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1062: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1065: f => finalizeWrapper(f,x0 => dartInstance.exports._1065(f,x0)),
_1066: x0 => x0.target,
_1068: x0 => x0.timeStamp,
_1069: x0 => x0.type,
_1070: x0 => x0.preventDefault(),
_1074: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
_1079: x0 => x0.firstChild,
_1084: x0 => x0.parentElement,
_1090: (x0,x1) => x0.removeChild(x1),
_1092: (x0,x1) => x0.textContent = x1,
_1096: (x0,x1) => x0.contains(x1),
_1102: x0 => x0.firstElementChild,
_1104: x0 => x0.nextElementSibling,
_1105: x0 => x0.clientHeight,
_1106: x0 => x0.clientWidth,
_1107: x0 => x0.id,
_1108: (x0,x1) => x0.id = x1,
_1111: (x0,x1) => x0.spellcheck = x1,
_1112: x0 => x0.tagName,
_1113: x0 => x0.style,
_1115: (x0,x1) => x0.append(x1),
_1116: (x0,x1) => x0.getAttribute(x1),
_1117: x0 => x0.getBoundingClientRect(),
_1123: (x0,x1) => x0.closest(x1),
_1126: (x0,x1) => x0.querySelectorAll(x1),
_1128: x0 => x0.remove(),
_1129: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1130: (x0,x1) => x0.removeAttribute(x1),
_1131: (x0,x1) => x0.tabIndex = x1,
_1134: x0 => x0.scrollTop,
_1135: (x0,x1) => x0.scrollTop = x1,
_1136: x0 => x0.scrollLeft,
_1137: (x0,x1) => x0.scrollLeft = x1,
_1138: x0 => x0.classList,
_1139: (x0,x1) => x0.className = x1,
_1145: (x0,x1) => x0.getElementsByClassName(x1),
_1146: x0 => x0.click(),
_1147: (x0,x1) => x0.hasAttribute(x1),
_1150: (x0,x1) => x0.attachShadow(x1),
_1152: (x0,x1) => x0.getPropertyValue(x1),
_1154: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
_1156: (x0,x1) => x0.removeProperty(x1),
_1158: x0 => x0.offsetLeft,
_1159: x0 => x0.offsetTop,
_1160: x0 => x0.offsetParent,
_1162: (x0,x1) => x0.name = x1,
_1163: x0 => x0.content,
_1164: (x0,x1) => x0.content = x1,
_1178: (x0,x1) => x0.nonce = x1,
_1184: x0 => x0.now(),
_1186: (x0,x1) => x0.width = x1,
_1188: (x0,x1) => x0.height = x1,
_1191: (x0,x1) => x0.getContext(x1),
_1269: x0 => x0.status,
_1271: x0 => x0.body,
_1272: x0 => x0.arrayBuffer(),
_1278: x0 => x0.read(),
_1279: x0 => x0.value,
_1280: x0 => x0.done,
_1282: x0 => x0.name,
_1283: x0 => x0.x,
_1284: x0 => x0.y,
_1287: x0 => x0.top,
_1288: x0 => x0.right,
_1289: x0 => x0.bottom,
_1290: x0 => x0.left,
_1301: x0 => x0.height,
_1302: x0 => x0.width,
_1303: (x0,x1) => x0.value = x1,
_1306: (x0,x1) => x0.placeholder = x1,
_1307: (x0,x1) => x0.name = x1,
_1308: x0 => x0.selectionDirection,
_1309: x0 => x0.selectionStart,
_1310: x0 => x0.selectionEnd,
_1313: x0 => x0.value,
_1314: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1319: x0 => x0.readText(),
_1320: (x0,x1) => x0.writeText(x1),
_1321: x0 => x0.altKey,
_1322: x0 => x0.code,
_1323: x0 => x0.ctrlKey,
_1324: x0 => x0.key,
_1325: x0 => x0.keyCode,
_1326: x0 => x0.location,
_1327: x0 => x0.metaKey,
_1328: x0 => x0.repeat,
_1329: x0 => x0.shiftKey,
_1330: x0 => x0.isComposing,
_1331: (x0,x1) => x0.getModifierState(x1),
_1332: x0 => x0.state,
_1334: (x0,x1) => x0.go(x1),
_1335: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
_1336: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
_1337: x0 => x0.pathname,
_1338: x0 => x0.search,
_1339: x0 => x0.hash,
_1342: x0 => x0.state,
_1346: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._1346(f,x0,x1)),
_1348: (x0,x1,x2) => x0.observe(x1,x2),
_1351: x0 => x0.attributeName,
_1352: x0 => x0.type,
_1353: x0 => x0.matches,
_1356: x0 => x0.matches,
_1357: x0 => x0.relatedTarget,
_1358: x0 => x0.clientX,
_1359: x0 => x0.clientY,
_1360: x0 => x0.offsetX,
_1361: x0 => x0.offsetY,
_1364: x0 => x0.button,
_1365: x0 => x0.buttons,
_1366: x0 => x0.ctrlKey,
_1367: (x0,x1) => x0.getModifierState(x1),
_1368: x0 => x0.pointerId,
_1369: x0 => x0.pointerType,
_1370: x0 => x0.pressure,
_1371: x0 => x0.tiltX,
_1372: x0 => x0.tiltY,
_1373: x0 => x0.getCoalescedEvents(),
_1374: x0 => x0.deltaX,
_1375: x0 => x0.deltaY,
_1376: x0 => x0.wheelDeltaX,
_1377: x0 => x0.wheelDeltaY,
_1378: x0 => x0.deltaMode,
_1383: x0 => x0.changedTouches,
_1385: x0 => x0.clientX,
_1386: x0 => x0.clientY,
_1387: x0 => x0.data,
_1388: (x0,x1) => x0.type = x1,
_1389: (x0,x1) => x0.max = x1,
_1390: (x0,x1) => x0.min = x1,
_1391: (x0,x1) => x0.value = x1,
_1392: x0 => x0.value,
_1393: x0 => x0.disabled,
_1394: (x0,x1) => x0.disabled = x1,
_1395: (x0,x1) => x0.placeholder = x1,
_1396: (x0,x1) => x0.name = x1,
_1397: (x0,x1) => x0.autocomplete = x1,
_1398: x0 => x0.selectionDirection,
_1399: x0 => x0.selectionStart,
_1400: x0 => x0.selectionEnd,
_1403: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1409: (x0,x1) => x0.add(x1),
_1412: (x0,x1) => x0.noValidate = x1,
_1413: (x0,x1) => x0.method = x1,
_1414: (x0,x1) => x0.action = x1,
_1442: x0 => x0.orientation,
_1443: x0 => x0.width,
_1444: x0 => x0.height,
_1445: (x0,x1) => x0.lock(x1),
_1462: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._1462(f,x0,x1)),
_1472: x0 => x0.length,
_1473: (x0,x1) => x0.item(x1),
_1474: x0 => x0.length,
_1475: (x0,x1) => x0.item(x1),
_1476: x0 => x0.iterator,
_1477: x0 => x0.Segmenter,
_1478: x0 => x0.v8BreakIterator,
_1481: x0 => x0.done,
_1482: x0 => x0.value,
_1483: x0 => x0.index,
_1488: (x0,x1) => x0.adoptText(x1),
_1489: x0 => x0.first(),
_1490: x0 => x0.next(),
_1491: x0 => x0.current(),
_1495: () => globalThis.window.FinalizationRegistry,
_1498: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_1499: (x0,x1) => x0.unregister(x1),
_1504: x0 => x0.hostElement,
_1505: x0 => x0.viewConstraints,
_1507: x0 => x0.maxHeight,
_1508: x0 => x0.maxWidth,
_1509: x0 => x0.minHeight,
_1510: x0 => x0.minWidth,
_1511: x0 => x0.loader,
_1512: () => globalThis._flutter,
_1513: (x0,x1) => x0.didCreateEngineInitializer(x1),
_1514: (x0,x1,x2) => x0.call(x1,x2),
_1515: () => globalThis.Promise,
_1516: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._1516(f,x0,x1)),
_1519: x0 => x0.length,
_1522: x0 => x0.tracks,
_1526: x0 => x0.image,
_1531: x0 => x0.codedWidth,
_1532: x0 => x0.codedHeight,
_1535: x0 => x0.duration,
_1538: x0 => x0.ready,
_1539: x0 => x0.selectedTrack,
_1540: x0 => x0.repetitionCount,
_1541: x0 => x0.frameCount,
_1: (x0,x1,x2) => x0.set(x1,x2),
_2: (x0,x1,x2) => x0.set(x1,x2),
_5: f => finalizeWrapper(f,x0 => dartInstance.exports._5(f,x0)),
_6: (x0,x1,x2) => x0.slice(x1,x2),
_7: (x0,x1) => x0.decode(x1),
_8: (x0,x1) => x0.segment(x1),
_9: () => new TextDecoder(),
_10: x0 => x0.buffer,
_11: x0 => x0.wasmMemory,
_12: () => globalThis.window._flutter_skwasmInstance,
_1648: (decoder, codeUnits) => decoder.decode(codeUnits),
_1649: () => new TextDecoder("utf-8", {fatal: true}),
_1650: () => new TextDecoder("utf-8", {fatal: false})
      };

    const baseImports = {
        dart2wasm: dart2wasm,

  
          Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };
    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
    const dartMain = moduleInstance.exports.$getMain();
    const dartArgs = buildArgsList(args);
    moduleInstance.exports.$invokeMain(dartMain, dartArgs);
}


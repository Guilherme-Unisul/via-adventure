import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../opt/npm-tools/node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/constants.js"(exports, module) {
    "use strict";
    var BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"];
    var hasBlob = typeof Blob !== "undefined";
    if (hasBlob) BINARY_TYPES.push("blob");
    module.exports = {
      BINARY_TYPES,
      CLOSE_TIMEOUT: 3e4,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob,
      kForOnEventAttribute: /* @__PURE__ */ Symbol("kIsForOnEventAttribute"),
      kListener: /* @__PURE__ */ Symbol("kListener"),
      kStatusCode: /* @__PURE__ */ Symbol("status-code"),
      kWebSocket: /* @__PURE__ */ Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/buffer-util.js"(exports, module) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    function concat(list, totalLength) {
      if (list.length === 0) return EMPTY_BUFFER;
      if (list.length === 1) return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset2 = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset2);
        offset2 += buf.length;
      }
      if (offset2 < totalLength) {
        return new FastBuffer(target.buffer, target.byteOffset, offset2);
      }
      return target;
    }
    function _mask(source, mask, output, offset2, length) {
      for (let i = 0; i < length; i++) {
        output[offset2 + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data)) return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = new FastBuffer(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = __require("bufferutil");
        module.exports.mask = function(source, mask, output, offset2, length) {
          if (length < 48) _mask(source, mask, output, offset2, length);
          else bufferUtil.mask(source, mask, output, offset2, length);
        };
        module.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32) _unmask(buffer, mask);
          else bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/limiter.js"(exports, module) {
    "use strict";
    var kDone = /* @__PURE__ */ Symbol("kDone");
    var kRun = /* @__PURE__ */ Symbol("kRun");
    var Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency) return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module.exports = Limiter;
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/permessage-deflate.js"(exports, module) {
    "use strict";
    var zlib = __require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = /* @__PURE__ */ Symbol("permessage-deflate");
    var kTotalLength = /* @__PURE__ */ Symbol("total-length");
    var kCallback = /* @__PURE__ */ Symbol("callback");
    var kBuffers = /* @__PURE__ */ Symbol("buffers");
    var kError = /* @__PURE__ */ Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate2 = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {Boolean} [options.isServer=false] Create the instance in either
       *     server or client mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       */
      constructor(options) {
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._maxPayload = this._options.maxPayload | 0;
        this._isServer = !!this._options.isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && (typeof params.client_max_window_bits === "number" ? opts.clientMaxWindowBits > params.client_max_window_bits : !params.client_max_window_bits)) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin) this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module.exports = PerMessageDeflate2;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      if (this[kError]) {
        this[kCallback](this[kError]);
        return;
      }
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/validation.js"(exports, module) {
    "use strict";
    var { isUtf8 } = __require("buffer");
    var { hasBlob } = require_constants();
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    function isBlob(value) {
      return hasBlob && typeof value === "object" && typeof value.arrayBuffer === "function" && typeof value.type === "string" && typeof value.stream === "function" && (value[Symbol.toStringTag] === "Blob" || value[Symbol.toStringTag] === "File");
    }
    module.exports = {
      isBlob,
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8) {
      module.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = __require("utf-8-validate");
        module.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/receiver.js"(exports, module) {
    "use strict";
    var { Writable } = __require("stream");
    var PerMessageDeflate2 = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var FastBuffer = Buffer[Symbol.species];
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var DEFER_EVENT = 6;
    var Receiver2 = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxBufferedChunks=0] The maximum number of
       *     buffered data chunks
       * @param {Number} [options.maxFragments=0] The maximum number of message
       *     fragments
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super();
        this._allowSynchronousEvents = options.allowSynchronousEvents !== void 0 ? options.allowSynchronousEvents : true;
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxBufferedChunks = options.maxBufferedChunks | 0;
        this._maxFragments = options.maxFragments | 0;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._numFragments = 0;
        this._fragments = [];
        this._errored = false;
        this._loop = false;
        this._state = GET_INFO;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO) return cb();
        if (this._maxBufferedChunks > 0 && this._buffers.length >= this._maxBufferedChunks) {
          cb(
            this.createError(
              RangeError,
              "Too many buffered chunks",
              false,
              1008,
              "WS_ERR_TOO_MANY_BUFFERED_PARTS"
            )
          );
          return;
        }
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length) return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset2 = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset2);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset2);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              this.getInfo(cb);
              break;
            case GET_PAYLOAD_LENGTH_16:
              this.getPayloadLength16(cb);
              break;
            case GET_PAYLOAD_LENGTH_64:
              this.getPayloadLength64(cb);
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              this.getData(cb);
              break;
            case INFLATING:
            case DEFER_EVENT:
              this._loop = false;
              return;
          }
        } while (this._loop);
        if (!this._errored) cb();
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @param {Function} cb Callback
       * @private
       */
      getInfo(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          const error = this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
          cb(error);
          return;
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate2.extensionName]) {
          const error = this.createError(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          cb(error);
          return;
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (!this._fragmented) {
            const error = this.createError(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            const error = this.createError(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            const error = this.createError(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
            cb(error);
            return;
          }
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            const error = this.createError(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
            cb(error);
            return;
          }
        } else {
          const error = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          cb(error);
          return;
        }
        if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            const error = this.createError(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
            cb(error);
            return;
          }
        } else if (this._masked) {
          const error = this.createError(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
          cb(error);
          return;
        }
        if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
        else this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength16(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength64(cb) {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          const error = this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
          cb(error);
          return;
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        this.haveLength(cb);
      }
      /**
       * Payload length has been read.
       *
       * @param {Function} cb Callback
       * @private
       */
      haveLength(cb) {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            const error = this.createError(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            cb(error);
            return;
          }
        }
        if (this._masked) this._state = GET_MASK;
        else this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7) {
          this.controlMessage(data, cb);
          return;
        }
        if (this._maxFragments > 0 && ++this._numFragments > this._maxFragments) {
          const error = this.createError(
            RangeError,
            "Too many message fragments",
            false,
            1008,
            "WS_ERR_TOO_MANY_BUFFERED_PARTS"
          );
          cb(error);
          return;
        }
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        this.dataMessage(cb);
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err) return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              const error = this.createError(
                RangeError,
                "Max payload size exceeded",
                false,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
              cb(error);
              return;
            }
            this._fragments.push(buf);
          }
          this.dataMessage(cb);
          if (this._state === GET_INFO) this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @param {Function} cb Callback
       * @private
       */
      dataMessage(cb) {
        if (!this._fin) {
          this._state = GET_INFO;
          return;
        }
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._numFragments = 0;
        this._fragments = [];
        if (this._opcode === 2) {
          let data;
          if (this._binaryType === "nodebuffer") {
            data = concat(fragments, messageLength);
          } else if (this._binaryType === "arraybuffer") {
            data = toArrayBuffer(concat(fragments, messageLength));
          } else if (this._binaryType === "blob") {
            data = new Blob(fragments);
          } else {
            data = fragments;
          }
          if (this._allowSynchronousEvents) {
            this.emit("message", data, true);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", data, true);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        } else {
          const buf = concat(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            const error = this.createError(
              Error,
              "invalid UTF-8 sequence",
              true,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            cb(error);
            return;
          }
          if (this._state === INFLATING || this._allowSynchronousEvents) {
            this.emit("message", buf, false);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", buf, false);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        }
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data, cb) {
        if (this._opcode === 8) {
          if (data.length === 0) {
            this._loop = false;
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              const error = this.createError(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
              cb(error);
              return;
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              const error = this.createError(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
              cb(error);
              return;
            }
            this._loop = false;
            this.emit("conclude", code, buf);
            this.end();
          }
          this._state = GET_INFO;
          return;
        }
        if (this._allowSynchronousEvents) {
          this.emit(this._opcode === 9 ? "ping" : "pong", data);
          this._state = GET_INFO;
        } else {
          this._state = DEFER_EVENT;
          setImmediate(() => {
            this.emit(this._opcode === 9 ? "ping" : "pong", data);
            this._state = GET_INFO;
            this.startLoop(cb);
          });
        }
      }
      /**
       * Builds an error object.
       *
       * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
       * @param {String} message The error message
       * @param {Boolean} prefix Specifies whether or not to add a default prefix to
       *     `message`
       * @param {Number} statusCode The status code
       * @param {String} errorCode The exposed error code
       * @return {(Error|RangeError)} The error
       * @private
       */
      createError(ErrorCtor, message, prefix, statusCode, errorCode) {
        this._loop = false;
        this._errored = true;
        const err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        Error.captureStackTrace(err, this.createError);
        err.code = errorCode;
        err[kStatusCode] = statusCode;
        return err;
      }
    };
    module.exports = Receiver2;
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/sender.js"(exports, module) {
    "use strict";
    var { Duplex } = __require("stream");
    var { randomFillSync } = __require("crypto");
    var {
      types: { isUint8Array }
    } = __require("util");
    var PerMessageDeflate2 = require_permessage_deflate();
    var { EMPTY_BUFFER, kWebSocket, NOOP } = require_constants();
    var { isBlob, isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = /* @__PURE__ */ Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var RANDOM_POOL_SIZE = 8 * 1024;
    var randomPool;
    var randomPoolPointer = RANDOM_POOL_SIZE;
    var DEFAULT = 0;
    var DEFLATING = 1;
    var GET_BLOB_DATA = 2;
    var Sender2 = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {Duplex} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._queue = [];
        this._state = DEFAULT;
        this.onerror = NOOP;
        this[kWebSocket] = void 0;
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset2 = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            if (randomPoolPointer === RANDOM_POOL_SIZE) {
              if (randomPool === void 0) {
                randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
              }
              randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
              randomPoolPointer = 0;
            }
            mask[0] = randomPool[randomPoolPointer++];
            mask[1] = randomPool[randomPoolPointer++];
            mask[2] = randomPool[randomPoolPointer++];
            mask[3] = randomPool[randomPoolPointer++];
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset2 = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset2 += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset2 += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset2 : offset2);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1) target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask) return [target, data];
        target[1] |= 128;
        target[offset2 - 4] = mask[0];
        target[offset2 - 3] = mask[1];
        target[offset2 - 2] = mask[2];
        target[offset2 - 1] = mask[3];
        if (skipMasking) return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset2, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else if (isUint8Array(data)) {
            buf.set(data, 2);
          } else {
            throw new TypeError("Second argument must be a string or a Uint8Array");
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(buf, options), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin) this._firstFragment = true;
        const opts = {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
          } else {
            this.getBlobData(data, this._compress, opts, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      }
      /**
       * Gets the contents of a blob as binary data.
       *
       * @param {Blob} blob The blob
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     the data
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      getBlobData(blob, compress, options, cb) {
        this._bufferedBytes += options[kByteLength];
        this._state = GET_BLOB_DATA;
        blob.arrayBuffer().then((arrayBuffer) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while the blob was being read"
            );
            process.nextTick(callCallbacks, this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          const data = toBuffer(arrayBuffer);
          if (!compress) {
            this._state = DEFAULT;
            this.sendFrame(_Sender.frame(data, options), cb);
            this.dequeue();
          } else {
            this.dispatch(data, compress, options, cb);
          }
        }).catch((err) => {
          process.nextTick(onError, this, err, cb);
        });
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._state = DEFLATING;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            callCallbacks(this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._state = DEFAULT;
          options.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (this._state === DEFAULT && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {(Buffer | String)[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module.exports = Sender2;
    function callCallbacks(sender, err, cb) {
      if (typeof cb === "function") cb(err);
      for (let i = 0; i < sender._queue.length; i++) {
        const params = sender._queue[i];
        const callback = params[params.length - 1];
        if (typeof callback === "function") callback(err);
      }
    }
    function onError(sender, err, cb) {
      callCallbacks(sender, err, cb);
      sender.onerror(err);
    }
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/event-target.js"(exports, module) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = /* @__PURE__ */ Symbol("kCode");
    var kData = /* @__PURE__ */ Symbol("kData");
    var kError = /* @__PURE__ */ Symbol("kError");
    var kMessage = /* @__PURE__ */ Symbol("kMessage");
    var kReason = /* @__PURE__ */ Symbol("kReason");
    var kTarget = /* @__PURE__ */ Symbol("kTarget");
    var kType = /* @__PURE__ */ Symbol("kType");
    var kWasClean = /* @__PURE__ */ Symbol("kWasClean");
    var Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = handler;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/extension.js"(exports, module) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0) dest[name] = [elem];
      else dest[name].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1) start = i;
            else if (!mustUnescape) mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1) start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1) end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension2) => {
        let configurations = extensions[extension2];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations.map((params) => {
          return [extension2].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values)) values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module.exports = { format, parse };
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/websocket.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var https = __require("https");
    var http2 = __require("http");
    var net = __require("net");
    var tls = __require("tls");
    var { randomBytes, createHash } = __require("crypto");
    var { Duplex, Readable } = __require("stream");
    var { URL: URL2 } = __require("url");
    var PerMessageDeflate2 = require_permessage_deflate();
    var Receiver2 = require_receiver();
    var Sender2 = require_sender();
    var { isBlob } = require_validation();
    var {
      BINARY_TYPES,
      CLOSE_TIMEOUT,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var kAborted = /* @__PURE__ */ Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket2 = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._errorEmitted = false;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._autoPong = options.autoPong;
          this._closeTimeout = options.closeTimeout;
          this._isServer = true;
        }
      }
      /**
       * For historical reasons, the custom "nodebuffer" type is used by the default
       * instead of "blob".
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type)) return;
        this._binaryType = type;
        if (this._receiver) this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket) return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxBufferedChunks=0] The maximum number of
       *     buffered data chunks
       * @param {Number} [options.maxFragments=0] The maximum number of message
       *     fragments
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options) {
        const receiver = new Receiver2({
          allowSynchronousEvents: options.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxBufferedChunks: options.maxBufferedChunks,
          maxFragments: options.maxFragments,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        const sender = new Sender2(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._sender = sender;
        this._socket = socket;
        receiver[kWebSocket] = this;
        sender[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        sender.onerror = senderOnError;
        if (socket.setTimeout) socket.setTimeout(0);
        if (socket.setNoDelay) socket.setNoDelay();
        if (head.length > 0) socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate2.extensionName]) {
          this._extensions[PerMessageDeflate2.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = _WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err) return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        setCloseTimer(this);
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain) this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate2.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket2, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket2.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket2.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function") return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket2.prototype.addEventListener = addEventListener;
    WebSocket2.prototype.removeEventListener = removeEventListener;
    module.exports = WebSocket2;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        allowSynchronousEvents: true,
        autoPong: true,
        closeTimeout: CLOSE_TIMEOUT,
        protocolVersion: protocolVersions[1],
        maxBufferedChunks: 256 * 1024,
        maxFragments: 16 * 1024,
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      websocket._autoPong = opts.autoPong;
      websocket._closeTimeout = opts.closeTimeout;
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL2) {
        parsedUrl = address;
      } else {
        try {
          parsedUrl = new URL2(address);
        } catch {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      }
      if (parsedUrl.protocol === "http:") {
        parsedUrl.protocol = "ws:";
      } else if (parsedUrl.protocol === "https:") {
        parsedUrl.protocol = "wss:";
      }
      websocket._url = parsedUrl.href;
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http2.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = opts.createConnection || (isSecure ? tlsConnect : netConnect);
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate2({
          ...opts.perMessageDeflate,
          isServer: false,
          maxPayload: opts.maxPayload
        });
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate2.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost) delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted]) return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL2(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket2.CONNECTING) return;
        req = websocket._req = null;
        const upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt) websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate2.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate2.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          allowSynchronousEvents: opts.allowSynchronousEvents,
          generateMask: opts.generateMask,
          maxBufferedChunks: opts.maxBufferedChunks,
          maxFragments: opts.maxFragments,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      if (opts.finishRequest) {
        opts.finishRequest(req, websocket);
      } else {
        req.end();
      }
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket2.CLOSING;
      websocket._errorEmitted = true;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket2.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = isBlob(data) ? data.size : toBuffer(data).length;
        if (websocket._socket) websocket._sender._bufferedBytes += length;
        else websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0) return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005) websocket.close();
      else websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused) websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function senderOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket.readyState === WebSocket2.CLOSED) return;
      if (websocket.readyState === WebSocket2.OPEN) {
        websocket._readyState = WebSocket2.CLOSING;
        setCloseTimer(websocket);
      }
      this._socket.end();
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function setCloseTimer(websocket) {
      websocket._closeTimer = setTimeout(
        websocket._socket.destroy.bind(websocket._socket),
        websocket._closeTimeout
      );
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket2.CLOSING;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && this._readableState.length !== 0) {
        const chunk = this.read(this._readableState.length);
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket2.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket2.CLOSING;
        this.destroy();
      }
    }
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/stream.js"(exports, module) {
    "use strict";
    var WebSocket2 = require_websocket();
    var { Duplex } = __require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream2(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data)) ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed) return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed) return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called) callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy) ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null) return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted) duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused) ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module.exports = createWebSocketStream2;
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/subprotocol.js"(exports, module) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1) end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module.exports = { parse };
  }
});

// ../../../opt/npm-tools/node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "../../../opt/npm-tools/node_modules/ws/lib/websocket-server.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var http2 = __require("http");
    var { Duplex } = __require("stream");
    var { createHash } = __require("crypto");
    var extension2 = require_extension();
    var PerMessageDeflate2 = require_permessage_deflate();
    var subprotocol2 = require_subprotocol();
    var WebSocket2 = require_websocket();
    var { CLOSE_TIMEOUT, GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer2 = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Boolean} [options.autoPong=true] Specifies whether or not to
       *     automatically send a pong in response to a ping
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to
       *     wait for the closing handshake to finish after `websocket.close()` is
       *     called
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxBufferedChunks=262144] The maximum number of
       *     buffered data chunks
       * @param {Number} [options.maxFragments=16384] The maximum number of message
       *     fragments
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          allowSynchronousEvents: true,
          autoPong: true,
          maxBufferedChunks: 256 * 1024,
          maxFragments: 16 * 1024,
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          closeTimeout: CLOSE_TIMEOUT,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket2,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http2.createServer((req, res) => {
            const body = http2.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true) options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server) return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb) this.once("close", cb);
        if (this._state === CLOSING) return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path) return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const upgrade = req.headers.upgrade;
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (key === void 0 || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 13 && version !== 8) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
            "Sec-WebSocket-Version": "13, 8"
          });
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol2.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate2({
            ...this.options.perMessageDeflate,
            isServer: true,
            maxPayload: this.options.maxPayload
          });
          try {
            const offers = extension2.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate2.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate2.extensionName]);
              extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable) return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING) return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null, void 0, this.options);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate2.extensionName]) {
          const params = extensions[PerMessageDeflate2.extensionName].params;
          const value = extension2.format({
            [PerMessageDeflate2.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxBufferedChunks: this.options.maxBufferedChunks,
          maxFragments: this.options.maxFragments,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module.exports = WebSocketServer2;
    function addListeners(server, map) {
      for (const event of Object.keys(map)) server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http2.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http2.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message, headers) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message, headers);
      }
    }
  }
});

// shared/constants.ts
var MAP_W, MAP_H, STEP_MS, PROXIMITY_RADIUS, MIN_STEP_INTERVAL_MS;
var init_constants = __esm({
  "shared/constants.ts"() {
    "use strict";
    MAP_W = 56;
    MAP_H = 38;
    STEP_MS = 160;
    PROXIMITY_RADIUS = 2;
    MIN_STEP_INTERVAL_MS = STEP_MS * 0.6;
  }
});

// shared/map/decor/food_nature.ts
var tall, tree, FOOD_NATURE_DECOR;
var init_food_nature = __esm({
  "shared/map/decor/food_nature.ts"() {
    "use strict";
    tall = [".", "#"];
    tree = ["..", "..", "##"];
    FOOD_NATURE_DECOR = {
      /* ----------------------------- Comidas e bebidas ----------------------------- */
      pizza_box: { name: "Pizza", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida" },
      food_cookies: { name: "Prato de biscoitos", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida cookies bolachas lanche" },
      food_donuts: { name: "Caixa de donuts", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida rosquinhas doce" },
      food_cake_slice: { name: "Fatia de bolo", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida doce sobremesa" },
      food_cake: { name: "Bolo de anivers\xE1rio", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida festa velas parab\xE9ns doce" },
      food_sushi: { name: "T\xE1bua de sushi", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida japonesa" },
      food_burger: { name: "Hamb\xFArguer com fritas", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida lanche batata" },
      food_fruit_bowl: { name: "Fruteira", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida frutas ma\xE7\xE3 banana uva" },
      food_popcorn: { name: "Balde de pipoca", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida cinema filme" },
      food_wine: { name: "Vinho e ta\xE7as", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "bebida garrafa brinde festa" },
      food_juice: { name: "Jarra de suco", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "bebida laranja copos" },
      food_coffee_pot: { name: "Jarra de caf\xE9", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "bebida cafeteira caneca", interact: { kind: "coffee", verb: "Servir caf\xE9" } },
      food_tea_set: { name: "Jogo de ch\xE1", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "bebida bule x\xEDcara" },
      food_cupcakes: { name: "Bandeja de cupcakes", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida doce bolinhos festa" },
      food_sandwich: { name: "Prato de sandu\xEDches", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida lanche misto" },
      food_ice_cream: { name: "Ta\xE7as de sorvete", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida doce sobremesa gelado" },
      food_roast_chicken: { name: "Frango assado", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida festa ceia travessa" },
      food_soda_cans: { name: "Latas de refrigerante", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "bebida lata" },
      food_bread_basket: { name: "Cesta de p\xE3es", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida padaria caf\xE9 da manh\xE3" },
      food_watermelon: { name: "Fatias de melancia", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "comida fruta ver\xE3o" },
      food_coconut: { name: "\xC1gua de coco", w: 1, h: 1, solid: false, layer: "top", cat: "food", tags: "bebida praia ver\xE3o canudo" },
      food_cart: { name: "Carrinho de lanches", w: 2, h: 2, solid: ["..", "##"], layer: "object", cat: "food", tags: "comida guarda-sol food truck pipoca", interact: { kind: "snack", verb: "Pegar um lanche" } },
      food_cooler: { name: "Caixa t\xE9rmica", w: 1, h: 1, solid: true, layer: "object", cat: "food", tags: "bebida gelo cooler", interact: { kind: "snack", verb: "Pegar bebida" } },
      /* ------------------------------ Luzes e objetos ------------------------------ */
      lt_arc_lamp: { name: "Lumin\xE1ria de arco", w: 1, h: 2, solid: tall, layer: "object", cat: "light", tags: "luz abajur poste" },
      lt_tripod_lamp: { name: "Lumin\xE1ria trip\xE9", w: 1, h: 2, solid: tall, layer: "object", cat: "light", tags: "luz abajur madeira" },
      lt_paper_lantern: { name: "Lumin\xE1ria de papel", w: 1, h: 2, solid: tall, layer: "object", cat: "light", tags: "luz lanterna japonesa" },
      lt_old_lantern: { name: "Poste de lampi\xE3o", w: 1, h: 2, solid: tall, layer: "object", cat: "light", tags: "luz rua antigo poste" },
      lt_neon_tube: { name: "Lumin\xE1ria neon", w: 1, h: 2, solid: tall, layer: "object", cat: "light", tags: "luz led tubo colorido" },
      lt_string_lights: { name: "Varal de luzes", w: 2, h: 2, solid: false, layer: "object", cat: "light", tags: "luz festa l\xE2mpadas gambiarra" },
      lt_candles: { name: "Velas", w: 1, h: 1, solid: false, layer: "top", cat: "light", tags: "luz chama rom\xE2ntico" },
      lt_lava_lamp: { name: "L\xE2mpada de lava", w: 1, h: 1, solid: false, layer: "top", cat: "light", tags: "luz retr\xF4 abajur" },
      lt_bike_rack: { name: "Biciclet\xE1rio", w: 2, h: 2, solid: ["..", "##"], layer: "object", cat: "light", tags: "bicicleta bike" },
      lt_umbrella_stand: { name: "Porta-guarda-chuvas", w: 1, h: 1, solid: true, layer: "object", cat: "light", tags: "chuva guarda-chuva" },
      lt_coat_rack: { name: "Cabideiro", w: 1, h: 2, solid: tall, layer: "object", cat: "light", tags: "casaco chap\xE9u cabide" },
      lt_globe: { name: "Globo terrestre", w: 1, h: 2, solid: tall, layer: "object", cat: "light", tags: "mapa mundo geografia" },
      lt_guitar: { name: "Viol\xE3o no suporte", w: 1, h: 2, solid: tall, layer: "object", cat: "light", tags: "m\xFAsica instrumento" },
      lt_skateboard: { name: "Skate encostado", w: 1, h: 1, solid: false, layer: "object", cat: "light", tags: "esporte prancha" },
      lt_bins: { name: "Lixo e reciclagem", w: 2, h: 1, solid: true, layer: "object", cat: "light", tags: "lixeira coleta seletiva" },
      lt_extinguisher: { name: "Extintor", w: 1, h: 1, solid: true, layer: "object", cat: "light", tags: "inc\xEAndio seguran\xE7a fogo" },
      lt_wet_sign: { name: "Placa de piso molhado", w: 1, h: 1, solid: true, layer: "object", cat: "light", tags: "cuidado aviso limpeza" },
      /* ---------------------------- Plantas e ar livre ----------------------------- */
      nat_oak: { name: "\xC1rvore grande", w: 2, h: 3, solid: tree, layer: "object", cat: "nature", tags: "\xE1rvore carvalho" },
      nat_pine: { name: "Pinheiro", w: 2, h: 3, solid: tree, layer: "object", cat: "nature", tags: "\xE1rvore natal" },
      nat_cherry: { name: "Cerejeira", w: 2, h: 3, solid: tree, layer: "object", cat: "nature", tags: "\xE1rvore flor rosa sakura" },
      nat_willow: { name: "Salgueiro", w: 2, h: 3, solid: tree, layer: "object", cat: "nature", tags: "\xE1rvore chor\xE3o" },
      nat_birch: { name: "B\xE9tula", w: 2, h: 3, solid: tree, layer: "object", cat: "nature", tags: "\xE1rvore tronco branco" },
      nat_bush: { name: "Arbusto", w: 1, h: 1, solid: true, layer: "object", cat: "nature", tags: "planta moita" },
      nat_flower_bed: { name: "Canteiro de flores", w: 2, h: 1, solid: true, layer: "object", cat: "nature", tags: "planta jardim flores" },
      nat_sunflower: { name: "Vaso de girass\xF3is", w: 1, h: 2, solid: tall, layer: "object", cat: "nature", tags: "planta flor amarela" },
      nat_monstera: { name: "Costela-de-ad\xE3o", w: 1, h: 2, solid: tall, layer: "object", cat: "nature", tags: "planta monstera vaso" },
      nat_snake_plant: { name: "Espada-de-s\xE3o-jorge", w: 1, h: 2, solid: tall, layer: "object", cat: "nature", tags: "planta vaso" },
      nat_cactus: { name: "Cacto alto", w: 1, h: 2, solid: tall, layer: "object", cat: "nature", tags: "planta deserto suculenta" },
      nat_bamboo: { name: "Vaso de bambu", w: 1, h: 2, solid: tall, layer: "object", cat: "nature", tags: "planta zen" },
      nat_zen_garden: { name: "Jardim zen", w: 2, h: 2, solid: false, layer: "floor", cat: "nature", tags: "areia pedras japon\xEAs" },
      nat_pond: { name: "Laguinho", w: 2, h: 2, solid: true, layer: "floor", cat: "nature", tags: "\xE1gua lago peixe jardim" },
      nat_bbq: { name: "Churrasqueira", w: 1, h: 1, solid: true, layer: "object", cat: "nature", tags: "churrasco grelha festa" },
      nat_tiki_torch: { name: "Tocha de jardim", w: 1, h: 2, solid: tall, layer: "object", cat: "nature", tags: "luz fogo praia luau" },
      nat_pumpkin: { name: "Ab\xF3bora", w: 1, h: 1, solid: false, layer: "object", cat: "nature", tags: "outono halloween" },
      nat_snowman: { name: "Boneco de neve", w: 1, h: 2, solid: tall, layer: "object", cat: "nature", tags: "inverno natal neve" }
    };
  }
});

// shared/map/decor/tables_fun.ts
var GAME, down, up, right, TABLES_FUN_DECOR;
var init_tables_fun = __esm({
  "shared/map/decor/tables_fun.ts"() {
    "use strict";
    GAME = { kind: "game", verb: "Jogar uma partida" };
    down = (dy) => ({ cells: [[0, 0, "down"]], dy });
    up = (dy) => ({ cells: [[0, 0, "up"]], dy });
    right = (dy) => ({ cells: [[0, 0, "right"]], dy });
    TABLES_FUN_DECOR = {
      chair_red_down: { name: "Cadeira vermelha", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira", seat: { cells: [[0, 0, "down"]], dy: -6 } },
      /* ---------------------------------- Mesas --------------------------------- */
      tb_long_wood: { name: "Mesa comprida de madeira", w: 4, h: 2, solid: true, layer: "object", cat: "tables", tags: "mesa jantar refeit\xF3rio carvalho" },
      tb_round: { name: "Mesa redonda", w: 2, h: 2, solid: true, layer: "object", cat: "tables", tags: "mesa caf\xE9 redonda" },
      tb_glass_coffee: { name: "Mesa de centro de vidro", w: 2, h: 1, solid: true, layer: "object", cat: "tables", tags: "mesa centro vidro sala" },
      tb_live_edge: { name: "Mesa de madeira bruta", w: 3, h: 2, solid: true, layer: "object", cat: "tables", tags: "mesa tronco r\xFAstica live edge resina" },
      tb_bar_high: { name: "Mesa alta de bar", w: 1, h: 1, solid: true, layer: "object", cat: "tables", tags: "mesa bistr\xF4 bar alta" },
      tb_picnic: { name: "Mesa de piquenique", w: 3, h: 2, solid: true, layer: "object", cat: "tables", tags: "mesa piquenique jardim externo" },
      tb_side_round: { name: "Mesinha lateral redonda", w: 1, h: 1, solid: true, layer: "object", cat: "tables", tags: "mesa apoio lateral" },
      tb_side_square: { name: "Mesinha lateral com abajur", w: 1, h: 1, solid: true, layer: "object", cat: "tables", tags: "mesa apoio lateral abajur lumin\xE1ria" },
      tb_standing_desk: { name: "Mesa para trabalhar em p\xE9", w: 2, h: 2, solid: ["##", "##"], layer: "object", desk: true, cat: "tables", tags: "standing desk mesa alta ergon\xF4mica" },
      tb_l_desk: { name: "Mesa em L", w: 3, h: 2, solid: ["###", "#.."], layer: "object", desk: true, cat: "tables", tags: "mesa escrit\xF3rio canto l" },
      tb_reception_small: { name: "Balc\xE3o pequeno", w: 2, h: 2, solid: true, layer: "object", cat: "tables", tags: "balc\xE3o recep\xE7\xE3o atendimento" },
      tb_workbench: { name: "Bancada de trabalho", w: 3, h: 2, solid: true, layer: "object", cat: "tables", tags: "bancada oficina ferramentas maker" },
      /* -------------------------------- Assentos -------------------------------- */
      se_office_blue_down: { name: "Cadeira de escrit\xF3rio azul", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria", seat: down(-6) },
      se_office_blue_up: { name: "Cadeira de escrit\xF3rio azul (costas)", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria", seat: up(-2) },
      se_office_blue_side: { name: "Cadeira de escrit\xF3rio azul (lado)", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria", seat: right(-5) },
      se_office_green_down: { name: "Cadeira de escrit\xF3rio verde", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria", seat: down(-6) },
      se_office_green_up: { name: "Cadeira de escrit\xF3rio verde (costas)", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria", seat: up(-2) },
      se_office_green_side: { name: "Cadeira de escrit\xF3rio verde (lado)", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria", seat: right(-5) },
      se_office_black_down: { name: "Cadeira de escrit\xF3rio preta", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria executiva", seat: down(-6) },
      se_office_black_up: { name: "Cadeira de escrit\xF3rio preta (costas)", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria executiva", seat: up(-2) },
      se_office_black_side: { name: "Cadeira de escrit\xF3rio preta (lado)", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria executiva", seat: right(-5) },
      se_office_yellow_down: { name: "Cadeira de escrit\xF3rio amarela", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria", seat: down(-6) },
      se_office_yellow_up: { name: "Cadeira de escrit\xF3rio amarela (costas)", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira girat\xF3ria", seat: up(-2) },
      se_gaming_down: { name: "Cadeira gamer", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira gamer jogos", seat: down(-6) },
      se_gaming_up: { name: "Cadeira gamer (costas)", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "cadeira gamer jogos", seat: up(-2) },
      se_bench: { name: "Banco de madeira", w: 2, h: 1, solid: false, layer: "low", cat: "seating", tags: "banco banqueta madeira", seat: { cells: [[0, 0, "down"], [1, 0, "down"]], dy: -7 } },
      se_beanbag_pink: { name: "Pufe rosa", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "pufe beanbag almofad\xE3o", seat: down(-4) },
      se_beanbag_purple: { name: "Pufe roxo", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "pufe beanbag almofad\xE3o", seat: down(-4) },
      se_sofa_grey_down: { name: "Sof\xE1 moderno cinza", w: 3, h: 2, solid: ["###", "..."], layer: "object", cat: "seating", tags: "sof\xE1 estofado sala", seat: { cells: [[0, 1, "down"], [1, 1, "down"], [2, 1, "down"]], dy: -14 } },
      se_sofa_grey_up: { name: "Sof\xE1 moderno cinza (costas)", w: 3, h: 2, solid: ["...", "###"], layer: "object", cat: "seating", tags: "sof\xE1 estofado sala", seat: { cells: [[0, 0, "up"], [1, 0, "up"], [2, 0, "up"]], dy: -6 } },
      se_loveseat: { name: "Sof\xE1 de dois lugares", w: 2, h: 2, solid: ["##", ".."], layer: "object", cat: "seating", tags: "sof\xE1 namoradeira loveseat", seat: { cells: [[0, 1, "down"], [1, 1, "down"]], dy: -14 } },
      se_armchair_velvet: { name: "Poltrona de veludo verde", w: 1, h: 1, solid: false, layer: "object", cat: "seating", tags: "poltrona veludo", seat: down(-6) },
      se_bar_stool: { name: "Banqueta alta", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "banqueta bar alta balc\xE3o", seat: down(-9) },
      se_ottoman_coral: { name: "Puff redondo coral", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "puff pufe otomano", seat: down(-8) },
      se_ottoman_teal: { name: "Puff redondo verde-\xE1gua", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "puff pufe otomano", seat: down(-8) },
      se_ottoman_mustard: { name: "Puff redondo mostarda", w: 1, h: 1, solid: false, layer: "low", cat: "seating", tags: "puff pufe otomano", seat: down(-8) },
      /* ----------------------------- Sala de reunião ----------------------------- */
      mt_oval_table: { name: "Mesa de confer\xEAncia oval", w: 6, h: 3, solid: true, layer: "object", cat: "meeting", tags: "mesa reuni\xE3o confer\xEAncia oval" },
      mt_round_table: { name: "Mesa redonda de reuni\xE3o", w: 3, h: 3, solid: true, layer: "object", cat: "meeting", tags: "mesa reuni\xE3o redonda" },
      mt_chair_down: { name: "Cadeira de reuni\xE3o", w: 1, h: 1, solid: false, layer: "low", cat: "meeting", tags: "cadeira reuni\xE3o confer\xEAncia", seat: down(-6) },
      mt_chair_up: { name: "Cadeira de reuni\xE3o (costas)", w: 1, h: 1, solid: false, layer: "low", cat: "meeting", tags: "cadeira reuni\xE3o confer\xEAncia", seat: up(-2) },
      mt_chair_side: { name: "Cadeira de reuni\xE3o (lado)", w: 1, h: 1, solid: false, layer: "low", cat: "meeting", tags: "cadeira reuni\xE3o confer\xEAncia", seat: right(-5) },
      mt_tv_cart: { name: "TV com suporte de rodinhas", w: 2, h: 2, solid: ["..", "##"], layer: "object", cat: "meeting", tags: "tv tela apresenta\xE7\xE3o monitor", interact: { kind: "screen", verb: "Abrir TV" } },
      mt_projector_cart: { name: "Projetor no carrinho", w: 1, h: 1, solid: true, layer: "object", cat: "meeting", tags: "projetor apresenta\xE7\xE3o carrinho" },
      mt_speakerphone: { name: "Telefone de confer\xEAncia", w: 1, h: 1, solid: false, layer: "top", cat: "meeting", tags: "viva-voz telefone confer\xEAncia" },
      mt_podium: { name: "P\xFAlpito", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "meeting", tags: "p\xFAlpito palestra apresenta\xE7\xE3o tribuna" },
      mt_camera_bar: { name: "C\xE2mera de videochamada", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "meeting", tags: "c\xE2mera webcam videochamada reuni\xE3o" },
      mt_name_cards: { name: "Plaquinhas de nome", w: 1, h: 1, solid: false, layer: "top", cat: "meeting", tags: "plaquinha nome crach\xE1 mesa" },
      mt_water_tray: { name: "Bandeja com \xE1gua", w: 1, h: 1, solid: false, layer: "top", cat: "meeting", tags: "\xE1gua jarra copos bandeja" },
      /* --------------------------------- Lazer ---------------------------------- */
      fn_pingpong: { name: "Mesa de pingue-pongue", w: 3, h: 2, solid: true, layer: "object", cat: "fun", tags: "t\xEAnis de mesa ping pong jogo", interact: GAME },
      fn_foosball: { name: "Pebolim", w: 2, h: 2, solid: true, layer: "object", cat: "fun", tags: "pebolim tot\xF3 futebol jogo", interact: GAME },
      fn_pool: { name: "Mesa de sinuca", w: 3, h: 2, solid: true, layer: "object", cat: "fun", tags: "sinuca bilhar jogo", interact: GAME },
      fn_arcade: { name: "Fliperama", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "fun", tags: "arcade fliperama videogame jogo", interact: GAME },
      fn_arcade_b: { name: "Fliperama roxo", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "fun", tags: "arcade fliperama videogame jogo", interact: GAME },
      fn_pinball: { name: "M\xE1quina de pinball", w: 1, h: 2, solid: true, layer: "object", cat: "fun", tags: "pinball fliperama jogo", interact: GAME },
      fn_dartboard: { name: "Alvo de dardos", w: 1, h: 1, solid: false, layer: "wall", cat: "fun", tags: "dardos alvo jogo parede", interact: GAME },
      fn_piano: { name: "Piano de arm\xE1rio", w: 2, h: 2, solid: ["..", "##"], layer: "object", cat: "fun", tags: "piano m\xFAsica instrumento" },
      fn_drums: { name: "Bateria", w: 2, h: 2, solid: true, layer: "object", cat: "fun", tags: "bateria m\xFAsica instrumento" },
      fn_guitar_stand: { name: "Viol\xE3o no suporte", w: 1, h: 1, solid: true, layer: "object", cat: "fun", tags: "viol\xE3o guitarra m\xFAsica instrumento" },
      fn_treadmill: { name: "Esteira", w: 1, h: 2, solid: true, layer: "object", cat: "fun", tags: "esteira academia exerc\xEDcio" },
      fn_bike: { name: "Bicicleta ergom\xE9trica", w: 2, h: 1, solid: true, layer: "object", cat: "fun", tags: "bicicleta bike academia exerc\xEDcio" },
      fn_aquarium: { name: "Aqu\xE1rio", w: 2, h: 2, solid: ["..", "##"], layer: "object", cat: "fun", tags: "aqu\xE1rio peixes" },
      fn_trophy: { name: "Estante de trof\xE9us", w: 2, h: 2, solid: ["..", "##"], layer: "object", cat: "fun", tags: "trof\xE9u pr\xEAmio medalha estante" },
      fn_punching_bag: { name: "Saco de pancada", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "fun", tags: "saco boxe academia exerc\xEDcio" },
      fn_board_games: { name: "Mesa de jogos de tabuleiro", w: 2, h: 2, solid: true, layer: "object", cat: "fun", tags: "xadrez tabuleiro jogo damas", interact: GAME }
    };
  }
});

// shared/map/decor/tech.ts
var PC, TECH_DECOR, DESK_DEFAULT_DECOR;
var init_tech = __esm({
  "shared/map/decor/tech.ts"() {
    "use strict";
    PC = { kind: "computer", verb: "Usar computador" };
    TECH_DECOR = {
      /* ------------------------------ Tecnologia ------------------------------ */
      tech_dual_desk: { name: "Mesa com dois monitores", w: 2, h: 2, solid: true, layer: "object", desk: true, cat: "tech", tags: "computador setup trabalho programador", interact: PC },
      tech_gamer_desk: { name: "Setup gamer", w: 2, h: 2, solid: true, layer: "object", desk: true, cat: "tech", tags: "computador pc rgb jogo headset", interact: PC },
      tech_music_desk: { name: "Est\xFAdio de m\xFAsica", w: 2, h: 2, solid: true, layer: "object", desk: true, cat: "tech", tags: "teclado piano caixas som produtor", interact: PC },
      tech_retro_pc: { name: "Computador retr\xF4", w: 2, h: 2, solid: true, layer: "object", desk: true, cat: "tech", tags: "antigo crt tubo anos 90 vintage", interact: PC },
      tech_standing_desk: { name: "Mesa em p\xE9 com notebook", w: 2, h: 2, solid: ["..", "##"], layer: "object", desk: true, cat: "tech", tags: "standing desk ergonomia computador", interact: PC },
      tech_drawing_desk: { name: "Mesa de desenho digital", w: 2, h: 2, solid: true, layer: "object", desk: true, cat: "tech", tags: "mesa digitalizadora designer arte caneta", interact: PC },
      tech_vr_station: { name: "Esta\xE7\xE3o de realidade virtual", w: 2, h: 2, solid: ["..", "##"], layer: "object", desk: true, cat: "tech", tags: "vr \xF3culos rv jogo", interact: PC },
      tech_3d_printer: { name: "Impressora 3D", w: 1, h: 2, solid: [".", "#"], layer: "object", desk: true, cat: "tech", tags: "maker filamento prot\xF3tipo", interact: { kind: "printer", verb: "Imprimir" } },
      tech_server_rack: { name: "Rack de servidores", w: 1, h: 2, solid: [".", "#"], layer: "object", desk: true, cat: "tech", tags: "servidor datacenter ti luzes" },
      tech_network: { name: "Arm\xE1rio de rede", w: 1, h: 2, solid: [".", "#"], layer: "object", desk: true, cat: "tech", tags: "roteador wifi internet switch cabos" },
      tech_smart_speaker: { name: "Caixa inteligente", w: 1, h: 2, solid: [".", "#"], layer: "object", desk: true, cat: "tech", tags: "assistente som pedestal" },
      tech_big_tv: { name: "TV grande", w: 2, h: 2, solid: ["..", "##"], layer: "object", desk: true, cat: "tech", tags: "televis\xE3o tela rack", interact: { kind: "screen", verb: "Abrir TV" } },
      tech_copier: { name: "Copiadora grande", w: 2, h: 2, solid: ["..", "##"], layer: "object", desk: true, cat: "tech", tags: "impressora xerox scanner", interact: { kind: "printer", verb: "Imprimir" } },
      /* ---------------------------- Em cima da mesa ---------------------------- */
      laptop: { name: "Notebook", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "computador prata" },
      top_laptop_gamer: { name: "Notebook gamer", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "computador rgb jogo" },
      top_monitor: { name: "Monitor pequeno", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "tela computador" },
      top_keyboard_rgb: { name: "Teclado mec\xE2nico RGB", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "teclado gamer" },
      top_mouse_pad: { name: "Mouse e mousepad", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "mouse" },
      top_headphones: { name: "Fone no suporte", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "headphone headset m\xFAsica" },
      top_desk_lamp: { name: "Lumin\xE1ria de mesa", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "luz abajur" },
      top_mug_blue: { name: "Caneca azul", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "caf\xE9 x\xEDcara" },
      top_mug_red: { name: "Caneca vermelha", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "caf\xE9 x\xEDcara" },
      top_mug_yellow: { name: "Caneca amarela", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "caf\xE9 x\xEDcara" },
      top_mug_green: { name: "Caneca verde", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "caf\xE9 ch\xE1 x\xEDcara" },
      top_mug_white: { name: "Caneca branca", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "caf\xE9 x\xEDcara cora\xE7\xE3o" },
      top_water_bottle: { name: "Garrafa de \xE1gua", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "squeeze hidrata\xE7\xE3o" },
      top_energy_can: { name: "Lata de energ\xE9tico", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "bebida refrigerante" },
      top_cactus: { name: "Mini cacto", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "planta vaso" },
      top_succulent: { name: "Mini suculenta", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "planta vaso" },
      top_photo_frame: { name: "Porta-retrato", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "foto quadro fam\xEDlia" },
      top_books: { name: "Pilha de livros", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "livro leitura" },
      top_notebook_pen: { name: "Caderno e caneta", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "anota\xE7\xF5es agenda" },
      top_sticky_notes: { name: "Bloco de post-its", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "lembretes papel" },
      top_pen_holder: { name: "Porta-canetas", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "l\xE1pis canetas" },
      top_globe: { name: "Mini globo", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "mapa mundo geografia" },
      top_trophy: { name: "Trof\xE9u pequeno", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "pr\xEAmio ta\xE7a campe\xE3o" },
      top_rubber_duck: { name: "Patinho de borracha", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "pato debug brinquedo" },
      top_speaker: { name: "Caixinha de som", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "m\xFAsica som" },
      top_phone: { name: "Celular", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "smartphone telefone" },
      top_tablet: { name: "Tablet", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "ipad tela" },
      top_clock: { name: "Rel\xF3gio despertador", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "hora alarme" },
      top_snack_bag: { name: "Pacote de salgadinho", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "lanche batata chips" },
      top_cat: { name: "Gatinho dormindo", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "gato pet bichinho" },
      top_action_figure: { name: "Bonequinho rob\xF4", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "action figure brinquedo colecion\xE1vel" }
    };
    DESK_DEFAULT_DECOR = {
      top_pc_monitor: { name: "Monitor", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "tela computador pc" },
      top_pc_monitor_b: { name: "Monitor com gr\xE1ficos", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "tela computador pc" },
      top_keyboard: { name: "Teclado", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "teclado computador" },
      top_mouse: { name: "Mouse", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "mouse computador" },
      top_papers: { name: "Folhas de papel", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "papel documento" },
      top_postits: { name: "Post-its soltos", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "lembretes papel" },
      top_plant_pot: { name: "Vasinho de planta", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "planta vaso" },
      top_books_flat: { name: "Livros deitados", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "livro leitura" },
      top_cup_white: { name: "X\xEDcara branca", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "caf\xE9 caneca" },
      top_cup_blue: { name: "X\xEDcara azul", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "caf\xE9 caneca" },
      top_cup_orange: { name: "X\xEDcara laranja", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "caf\xE9 caneca" },
      top_laptop_open: { name: "Notebook aberto (de cima)", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "computador notebook" },
      top_lamp_brass: { name: "Lumin\xE1ria dourada", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "luz abajur" },
      top_nameplate: { name: "Plaquinha de nome", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "nome chefe placa" }
    };
  }
});

// shared/map/decor/wall_storage.ts
var WB, WALL_STORAGE_DECOR;
var init_wall_storage = __esm({
  "shared/map/decor/wall_storage.ts"() {
    "use strict";
    WB = { kind: "whiteboard", verb: "Abrir quadro" };
    WALL_STORAGE_DECOR = {
      /* ------------------------------- Parede ------------------------------- */
      flag_brazil: { name: "Bandeira do Brasil", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "brasil bandeira" },
      wl_certificate: { name: "Certificado emoldurado", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "diploma quadro moldura" },
      wl_world_map: { name: "Mapa-m\xFAndi", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "mapa mundo viagem" },
      wl_skyline: { name: "P\xF4ster de cidade", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "cidade pr\xE9dios p\xF4r do sol poster" },
      wl_abstract_circles: { name: "Quadro abstrato (c\xEDrculos)", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "arte tela pintura" },
      wl_abstract_waves: { name: "Quadro abstrato (ondas)", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "arte tela pintura" },
      wl_abstract_shapes: { name: "Quadro abstrato (formas)", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "arte tela pintura geom\xE9trico" },
      wl_photo_collage: { name: "Varal de fotos", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "fotos polaroid mural" },
      wl_motivational: { name: "P\xF4ster motivacional", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "foco poster frase" },
      wl_corkboard: { name: "Mural de corti\xE7a", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "recados post-it avisos" },
      wl_shelf_plants: { name: "Prateleira com plantas", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "plantas vasos nicho" },
      wl_clock_modern: { name: "Rel\xF3gio moderno", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "rel\xF3gio horas" },
      wl_neon_via: { name: "Neon VIA", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "neon letreiro luz" },
      wl_neon_heart: { name: "Neon cora\xE7\xE3o", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "neon luz amor" },
      wl_neon_bolt: { name: "Neon raio", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "neon luz energia" },
      wl_bunting: { name: "Bandeirinhas", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "festa junina varal" },
      wl_guitar: { name: "Viol\xE3o na parede", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "m\xFAsica instrumento" },
      wl_mirror: { name: "Espelho", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "espelho oval" },
      wl_tv: { name: "TV de parede", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "televis\xE3o tela" },
      wl_window_large: { name: "Janel\xE3o", w: 3, h: 1, solid: false, layer: "wall", cat: "wall", tags: "janela cortina vista" },
      wl_window_round: { name: "Janela redonda", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "janela escotilha" },
      wl_scarf_hoops: { name: "Cachecol rubro-negro", w: 2, h: 1, solid: false, layer: "wall", cat: "wall", tags: "futebol torcida listrado vermelho preto" },
      wl_pennant_rn: { name: "Fl\xE2mula rubro-negra", w: 1, h: 1, solid: false, layer: "wall", cat: "wall", tags: "futebol torcida vermelho preto" },
      /* ------------------------- Estantes e armários ------------------------- */
      st_bookcase_oak: { name: "Estante alta de carvalho", w: 2, h: 2, solid: true, layer: "object", cat: "storage", tags: "livros estante", interact: { kind: "books", verb: "Ver livros" } },
      st_bookcase_cubes: { name: "Estante de nichos", w: 2, h: 2, solid: true, layer: "object", cat: "storage", tags: "livros nichos branca", interact: { kind: "books", verb: "Ver livros" } },
      st_sideboard: { name: "Aparador", w: 2, h: 1, solid: true, layer: "object", cat: "storage", tags: "buffet balc\xE3o baixo" },
      st_file_drawers: { name: "Gaveteiro de arquivos", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "storage", tags: "arquivo pastas gavetas" },
      st_display_cabinet: { name: "Cristaleira", w: 2, h: 2, solid: true, layer: "object", cat: "storage", tags: "vitrine trof\xE9us vidro" },
      st_lockers: { name: "Arm\xE1rios de metal", w: 2, h: 2, solid: true, layer: "object", cat: "storage", tags: "lockers escaninho vesti\xE1rio" },
      st_plant_shelf: { name: "Estante de plantas", w: 2, h: 2, solid: true, layer: "object", cat: "storage", tags: "plantas vasos jardim" },
      st_cubes: { name: "Nichos organizadores", w: 2, h: 1, solid: true, layer: "object", cat: "storage", tags: "sapateira caixas cestos" },
      st_vinyl_shelf: { name: "Estante de vinis", w: 2, h: 1, solid: true, layer: "object", cat: "storage", tags: "discos toca-discos m\xFAsica" },
      st_wine_rack: { name: "Adega", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "storage", tags: "vinho garrafas" },
      st_toolbox: { name: "Arm\xE1rio de ferramentas", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "storage", tags: "ferramentas oficina gavetas" },
      st_pantry: { name: "Despensa", w: 2, h: 2, solid: true, layer: "object", cat: "storage", tags: "potes cozinha mantimentos" },
      /* -------------------------- Quadros interativos -------------------------- */
      bd_wall_wide: { name: "Quadro branco largo", w: 4, h: 1, solid: false, layer: "wall", cat: "boards", tags: "quadro desenhar", interact: WB, board: { x: 7, y: 8, w: 114, h: 17 } },
      bd_glass: { name: "Quadro de vidro", w: 3, h: 1, solid: false, layer: "wall", cat: "boards", tags: "vidro quadro desenhar", interact: WB, board: { x: 7, y: 8, w: 82, h: 18 } },
      bd_chalk: { name: "Lousa", w: 3, h: 1, solid: false, layer: "wall", cat: "boards", tags: "giz quadro negro escola", interact: WB, board: { x: 8, y: 8, w: 80, h: 16 } },
      bd_mobile: { name: "Quadro com rodinhas", w: 2, h: 2, solid: ["..", "##"], layer: "object", cat: "boards", tags: "quadro m\xF3vel desenhar", interact: WB, board: { x: 5, y: 4, w: 54, h: 31 } },
      bd_flipchart: { name: "Flipchart", w: 1, h: 2, solid: [".", "#"], layer: "object", cat: "boards", tags: "cavalete papel apresenta\xE7\xE3o", interact: WB, board: { x: 5, y: 9, w: 22, h: 26 } },
      bd_kanban: { name: "Quadro kanban", w: 3, h: 1, solid: false, layer: "wall", cat: "boards", tags: "tarefas post-it \xE1gil", interact: WB, board: { x: 7, y: 8, w: 82, h: 18 } },
      bd_projector: { name: "Tela de proje\xE7\xE3o", w: 3, h: 1, solid: false, layer: "wall", cat: "boards", tags: "projetor apresenta\xE7\xE3o", interact: WB, board: { x: 10, y: 9, w: 76, h: 15 } }
    };
  }
});

// shared/map/decor/styles.ts
var STYLE_COLORS, CHAIR_FAMILIES, CHAIR_DIRS, DESK_FINISHES, DESK_STYLES, SIT_DY, defs, back, STYLE_DECOR;
var init_styles = __esm({
  "shared/map/decor/styles.ts"() {
    "use strict";
    STYLE_COLORS = [
      { id: "preta", hex: "#2b2f36", name: "Preta" },
      { id: "cinza", hex: "#7b8494", name: "Cinza" },
      { id: "branca", hex: "#e9ebee", name: "Branca" },
      { id: "azul", hex: "#3f6fb5", name: "Azul" },
      { id: "vermelha", hex: "#c0392b", name: "Vermelha" },
      { id: "verde", hex: "#3f8f5a", name: "Verde" },
      { id: "amarela", hex: "#e0b028", name: "Amarela" },
      { id: "rosa", hex: "#e07aa8", name: "Rosa" },
      { id: "roxa", hex: "#7a5aa8", name: "Roxa" },
      { id: "laranja", hex: "#e07a3a", name: "Laranja" }
    ];
    CHAIR_FAMILIES = [
      { id: "office", name: "Cadeira de escrit\xF3rio" },
      { id: "gaming", name: "Cadeira gamer" },
      { id: "mesh", name: "Cadeira ergon\xF4mica" },
      { id: "exec", name: "Cadeira presidente" },
      { id: "simple", name: "Cadeira simples" }
    ];
    CHAIR_DIRS = [
      { id: "up", name: "de costas", seat: "up" },
      { id: "down", name: "de frente", seat: "down" },
      { id: "side", name: "de lado", seat: "right" }
    ];
    DESK_FINISHES = [
      { id: "carvalho", hex: "#d2a877", name: "Carvalho" },
      { id: "nogueira", hex: "#7d5236", name: "Nogueira" },
      { id: "branca", hex: "#ece8e1", name: "Branca" },
      { id: "preta", hex: "#2f3237", name: "Preta" },
      { id: "cinza", hex: "#9a9a96", name: "Cinza" }
    ];
    DESK_STYLES = [
      { id: "simples", name: "Mesa simples" },
      { id: "metal", name: "Mesa com p\xE9s de metal" },
      { id: "escandinava", name: "Mesa escandinava" },
      { id: "pequena", name: "Mesa pequena" },
      { id: "l", name: "Mesa em L" },
      { id: "bancada", name: "Bancada comprida" },
      { id: "gamer", name: "Mesa gamer" },
      { id: "vidro", name: "Mesa de vidro" },
      { id: "empe", name: "Mesa para trabalhar em p\xE9" }
    ];
    SIT_DY = {
      office: { up: -2, down: -6, side: -5 },
      gaming: { up: -3, down: -7, side: -6 },
      mesh: { up: -2, down: -6, side: -5 },
      exec: { up: -3, down: -7, side: -6 },
      simple: { up: -1, down: -5, side: -4 }
    };
    defs = {};
    for (const f of CHAIR_FAMILIES)
      for (const d of CHAIR_DIRS)
        for (const c of STYLE_COLORS) {
          defs[`cs_${f.id}_${c.id}_${d.id}`] = {
            name: `${f.name} ${c.name.toLowerCase()} (${d.name})`,
            w: 1,
            h: 1,
            solid: false,
            layer: "low",
            cat: "seating",
            tags: `cadeira ${f.name} ${c.name}`,
            seat: { cells: [[0, 0, d.seat]], dy: SIT_DY[f.id][d.id] },
            variant: { family: `cs_${f.id}_${d.id}`, name: `${f.name} (${d.name})`, color: c.hex, colorName: c.name }
          };
        }
    for (const size of [2, 3])
      for (const s of DESK_STYLES)
        for (const fin of DESK_FINISHES) {
          defs[`ds${size}_${s.id}_${fin.id}`] = {
            name: `${s.name}${size === 3 ? " grande" : ""} (${fin.name.toLowerCase()})`,
            w: size,
            h: 2,
            solid: true,
            layer: "object",
            cat: "tables",
            tags: `mesa escrivaninha ${s.name} ${fin.name}`,
            desk: true,
            variant: { family: `ds${size}_${s.id}`, name: `${s.name}${size === 3 ? " grande" : ""}`, color: fin.hex, colorName: fin.name }
          };
        }
    back = {
      top_monitor_back: { name: "Monitor (de costas)", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "monitor tela computador costas" },
      top_dual_back: { name: "Dois monitores (de costas)", w: 2, h: 1, solid: false, layer: "top", cat: "desk", tags: "monitor tela computador costas" },
      top_laptop_back: { name: "Notebook (de costas)", w: 1, h: 1, solid: false, layer: "top", cat: "desk", tags: "notebook computador costas" },
      top_dual_front: { name: "Dois monitores", w: 2, h: 1, solid: false, layer: "top", cat: "desk", tags: "monitor tela computador" }
    };
    STYLE_DECOR = { ...defs, ...back };
  }
});

// shared/map/decor/types.ts
var init_types = __esm({
  "shared/map/decor/types.ts"() {
    "use strict";
  }
});

// shared/map/decor/index.ts
var DECOR;
var init_decor = __esm({
  "shared/map/decor/index.ts"() {
    "use strict";
    init_food_nature();
    init_tables_fun();
    init_tech();
    init_wall_storage();
    init_styles();
    init_types();
    DECOR = { ...TECH_DECOR, ...FOOD_NATURE_DECOR, ...WALL_STORAGE_DECOR, ...TABLES_FUN_DECOR, ...STYLE_DECOR, ...DESK_DEFAULT_DECOR };
  }
});

// shared/map/furniture.ts
function furnitureDef(key) {
  return FURNITURE[key];
}
function isSolidCell(def, lx, ly) {
  if (def.solid === true) return true;
  if (def.solid === false) return false;
  return def.solid[ly]?.[lx] === "#";
}
var all, BASE_FURNITURE, FURNITURE;
var init_furniture = __esm({
  "shared/map/furniture.ts"() {
    "use strict";
    init_decor();
    all = true;
    BASE_FURNITURE = {
      // Estações de trabalho
      desk_a: { name: "Mesa de trabalho", w: 2, h: 2, solid: all, layer: "object", interact: { kind: "computer", verb: "Usar computador" } },
      desk_b: { name: "Mesa de trabalho", w: 2, h: 2, solid: all, layer: "object", interact: { kind: "computer", verb: "Usar computador" } },
      desk_back: { name: "Mesa de trabalho", w: 2, h: 2, solid: all, layer: "object", interact: { kind: "computer", verb: "Usar computador" } },
      exec_desk: { name: "Mesa executiva", w: 3, h: 2, solid: all, layer: "object", interact: { kind: "computer", verb: "Usar computador" } },
      study_table: { name: "Mesa de estudos", w: 3, h: 2, solid: all, layer: "object", interact: { kind: "books", verb: "Estudar" } },
      chair_up: { name: "Cadeira", w: 1, h: 1, solid: false, layer: "low" },
      chair_down: { name: "Cadeira", w: 1, h: 1, solid: false, layer: "low" },
      chair_side: { name: "Cadeira", w: 1, h: 1, solid: false, layer: "low" },
      mchair_up: { name: "Cadeira", w: 1, h: 1, solid: false, layer: "low" },
      mchair_down: { name: "Cadeira", w: 1, h: 1, solid: false, layer: "low" },
      mchair_side: { name: "Cadeira", w: 1, h: 1, solid: false, layer: "low" },
      stool: { name: "Banqueta", w: 1, h: 1, solid: false, layer: "low" },
      beanbag_a: { name: "Pufe", w: 1, h: 1, solid: false, layer: "low" },
      beanbag_b: { name: "Pufe", w: 1, h: 1, solid: false, layer: "low" },
      beanbag_c: { name: "Pufe", w: 1, h: 1, solid: false, layer: "low" },
      // Reuniões
      meeting_table: { name: "Mesa de reuni\xE3o", w: 6, h: 3, solid: all, layer: "object" },
      tv_wall: { name: "Televisor", w: 3, h: 1, solid: false, layer: "wall", interact: { kind: "screen", verb: "Abrir TV" } },
      whiteboard: { name: "Quadro branco", w: 3, h: 1, solid: false, layer: "wall", interact: { kind: "whiteboard", verb: "Abrir quadro" }, board: { x: 9, y: 10, w: 78, h: 14 } },
      whiteboard_stand: { name: "Quadro m\xF3vel", w: 2, h: 2, solid: ["..", "##"], layer: "object", interact: { kind: "whiteboard", verb: "Abrir quadro" }, board: { x: 4, y: 4, w: 56, h: 32 } },
      occ_light: { name: "Indicador de ocupa\xE7\xE3o", w: 1, h: 1, solid: false, layer: "wall" },
      // Parede
      window: { name: "Janela", w: 2, h: 1, solid: false, layer: "wall" },
      painting: { name: "Quadro", w: 1, h: 1, solid: false, layer: "wall" },
      painting_wide: { name: "Quadro", w: 2, h: 1, solid: false, layer: "wall" },
      clock: { name: "Rel\xF3gio", w: 1, h: 1, solid: false, layer: "wall" },
      logo_sign: { name: "Logo", w: 4, h: 1, solid: false, layer: "wall" },
      entrance_door: { name: "Entrada", w: 2, h: 1, solid: false, layer: "wall" },
      // Sala de estar / recepção
      sofa_down: { name: "Sof\xE1", w: 3, h: 2, solid: ["###", "..."], layer: "object" },
      sofa_up: { name: "Sof\xE1", w: 3, h: 2, solid: ["...", "###"], layer: "object" },
      sofa_side: { name: "Sof\xE1", w: 2, h: 3, solid: ["#.", "#.", "#."], layer: "object" },
      sofa_leather_side: { name: "Sof\xE1", w: 2, h: 3, solid: ["#.", "#.", "#."], layer: "object" },
      armchair_down: { name: "Poltrona", w: 1, h: 1, solid: false, layer: "object" },
      armchair_up: { name: "Poltrona", w: 1, h: 1, solid: false, layer: "object" },
      armchair_side: { name: "Poltrona", w: 1, h: 1, solid: false, layer: "object" },
      coffee_table: { name: "Mesa de centro", w: 2, h: 1, solid: all, layer: "object" },
      side_table: { name: "Mesinha", w: 1, h: 1, solid: all, layer: "object" },
      reception_counter: { name: "Balc\xE3o da recep\xE7\xE3o", w: 6, h: 2, solid: all, layer: "object", interact: { kind: "reception", verb: "Fazer check-in" } },
      tv_stand: { name: "Videogame", w: 3, h: 2, solid: all, layer: "object", interact: { kind: "game", verb: "Jogar uma partida" } },
      // Decoração
      plant_tall: { name: "Planta", w: 1, h: 2, solid: [".", "#"], layer: "object" },
      plant_palm: { name: "Palmeira", w: 1, h: 2, solid: [".", "#"], layer: "object" },
      plant_small: { name: "Vaso", w: 1, h: 1, solid: all, layer: "object" },
      planter_long: { name: "Floreira", w: 3, h: 1, solid: all, layer: "object" },
      floor_lamp: { name: "Lumin\xE1ria", w: 1, h: 2, solid: [".", "#"], layer: "object" },
      bookshelf: { name: "Estante", w: 2, h: 2, solid: all, layer: "object", interact: { kind: "books", verb: "Ver livros" } },
      rug_a: { name: "Tapete", w: 6, h: 4, solid: false, layer: "floor" },
      rug_b: { name: "Tapete", w: 4, h: 3, solid: false, layer: "floor" },
      rug_c: { name: "Tapete", w: 3, h: 3, solid: false, layer: "floor" },
      rug_entry: { name: "Capacho", w: 4, h: 2, solid: false, layer: "floor" },
      trash_bin: { name: "Lixeira", w: 1, h: 1, solid: all, layer: "object" },
      // Utilidades
      water_cooler: { name: "Bebedouro", w: 1, h: 2, solid: [".", "#"], layer: "object", interact: { kind: "water", verb: "Beber \xE1gua" } },
      printer: { name: "Impressora", w: 1, h: 2, solid: [".", "#"], layer: "object", interact: { kind: "printer", verb: "Imprimir" } },
      filing_cabinet: { name: "Arquivo", w: 1, h: 2, solid: [".", "#"], layer: "object" },
      // Cafeteria
      counter_plain: { name: "Bancada", w: 1, h: 2, solid: all, layer: "object" },
      counter_sink: { name: "Pia", w: 1, h: 2, solid: all, layer: "object" },
      counter_coffee: { name: "M\xE1quina de caf\xE9", w: 1, h: 2, solid: all, layer: "object", interact: { kind: "coffee", verb: "Pegar um caf\xE9" } },
      counter_fruit: { name: "Bancada", w: 1, h: 2, solid: all, layer: "object" },
      counter_kettle: { name: "Chaleira", w: 1, h: 2, solid: all, layer: "object", interact: { kind: "coffee", verb: "Preparar um ch\xE1" } },
      fridge: { name: "Geladeira", w: 1, h: 2, solid: all, layer: "object", interact: { kind: "fridge", verb: "Abrir geladeira" } },
      vending: { name: "M\xE1quina de lanches", w: 1, h: 2, solid: [".", "#"], layer: "object", interact: { kind: "snack", verb: "Comprar lanche" } },
      cafe_table: { name: "Mesa", w: 2, h: 2, solid: all, layer: "object" },
      // Estúdio de gravação
      softbox: { name: "Softbox", w: 1, h: 2, solid: [".", "#"], layer: "object" },
      camera_tripod: { name: "C\xE2mera no trip\xE9", w: 1, h: 2, solid: [".", "#"], layer: "object", interact: { kind: "record", verb: "Gravar" } },
      sofa_red: { name: "Sof\xE1 vermelho", w: 3, h: 2, solid: ["###", "..."], layer: "object" },
      pouf_grey: { name: "Puff cinza", w: 1, h: 1, solid: false, layer: "low" },
      acoustic_panel: { name: "Painel ac\xFAstico", w: 2, h: 1, solid: false, layer: "wall" },
      on_air_sign: { name: "Placa ON AIR", w: 2, h: 1, solid: false, layer: "wall" },
      rug_studio: { name: "Tapete do est\xFAdio", w: 4, h: 3, solid: false, layer: "floor" }
    };
    FURNITURE = { ...BASE_FURNITURE, ...DECOR };
  }
});

// shared/map/footprint.ts
function turnStyle(key) {
  let s = styleCache.get(key);
  if (!s) {
    const d = furnitureDef(key);
    if (d.layer === "floor" || FLAT.test(key) || d.desk && d.w >= 2 && d.solid === true) s = "flat";
    else if (ROUND.test(key)) s = "round";
    else s = "upright";
    styleCache.set(key, s);
  }
  return s;
}
function sizeOf(p) {
  const d = furnitureDef(p.key);
  return geoRot(p) % 2 ? { w: d.h, h: d.w } : { w: d.w, h: d.h };
}
function toOriginal(p, lx, ly) {
  const d = furnitureDef(p.key);
  const { w: W } = sizeOf(p);
  const x = p.flip ? W - 1 - lx : lx;
  const y = ly;
  switch (geoRot(p)) {
    case 1:
      return { x: y, y: d.h - 1 - x };
    case 2:
      return { x: d.w - 1 - x, y: d.h - 1 - y };
    case 3:
      return { x: d.w - 1 - y, y: x };
    default:
      return { x, y };
  }
}
function fromOriginal(p, sx, sy) {
  const d = furnitureDef(p.key);
  let x;
  let y;
  switch (geoRot(p)) {
    case 1:
      x = d.h - 1 - sy, y = sx;
      break;
    case 2:
      x = d.w - 1 - sx, y = d.h - 1 - sy;
      break;
    case 3:
      x = sy, y = d.w - 1 - sx;
      break;
    default:
      x = sx, y = sy;
  }
  if (p.flip) x = sizeOf(p).w - 1 - x;
  return { x, y };
}
function turnDir(dir, rot, flip = false) {
  let d = dir;
  for (let i = 0; i < (rot % 4 + 4) % 4; i++) d = CW[d];
  return flip ? MIRROR[d] : d;
}
function solidAt(p, lx, ly) {
  const o = toOriginal(p, lx, ly);
  return isSolidCell(furnitureDef(p.key), o.x, o.y);
}
var rotOf, FLAT, ROUND, styleCache, geoRot, CW, MIRROR, canRotate;
var init_footprint = __esm({
  "shared/map/footprint.ts"() {
    "use strict";
    init_furniture();
    rotOf = (p) => ((p.rot ?? 0) % 4 + 4) % 4;
    FLAT = /^(desk_|exec_desk|study_table|meeting_table|coffee_table|cafe_table|reception_counter|ds[23]_|tb_(?!side|bar_high|standing_desk)|mt_oval_table|fn_(pingpong|pool|foosball|board_games|treadmill|bike)|se_bench|pizza_box|mt_name_cards|top_(keyboard|mouse|papers|postits|books_flat|laptop_open|notebook_pen|sticky_notes|books)$|top_mouse_pad|top_keyboard_rgb|top_phone|top_snack_bag|food_(cookies|donuts|sushi|sandwich|cake|watermelon|roast_chicken))/;
    ROUND = /(plant|palm|^nat_(?!bbq|snowman)|bush|cactus|succulent|^lt_(arc_lamp|tripod_lamp|paper_lantern|old_lantern|candles|lava_lamp|umbrella_stand|globe|coat_rack|bins|extinguisher)|floor_lamp|trash_bin|beanbag|pouf|ottoman|stool|mug|cup_|bottle|energy_can|soda_cans|^food_|top_cat|trophy|pen_holder|rubber_duck|top_globe|tb_side|tb_bar_high|mt_round_table|side_table|water_tray|top_lamp|top_desk_lamp|lava|candle)/;
    styleCache = /* @__PURE__ */ new Map();
    geoRot = (p) => turnStyle(p.key) === "flat" ? rotOf(p) : 0;
    CW = { up: "right", right: "down", down: "left", left: "up" };
    MIRROR = { left: "right", right: "left", up: "up", down: "down" };
    canRotate = (key) => furnitureDef(key).layer !== "wall";
  }
});

// shared/map/deskItems.ts
function deskRectPx(d) {
  const { w, h } = sizeOf(d);
  return { x: d.x * 32 + (d.ox ?? 0), y: d.y * 32 + (d.oy ?? 0), w: w * 32, h: h * 32 };
}
function itemCenter(p) {
  const z = sizeOf(p);
  return { x: p.x * 32 + (p.ox ?? 0) + z.w * 16, y: p.y * 32 + (p.oy ?? 0) + z.h * 16 + 4 };
}
function itemsOnDesk(placements, desk) {
  const r = deskRectPx(desk);
  return placements.filter((p) => {
    if (p.id === desk.id || !isTop(p)) return false;
    const c = itemCenter(p);
    return c.x >= r.x && c.x < r.x + r.w && c.y >= r.y && c.y < r.y + r.h;
  });
}
function carryItem(item, from, to) {
  const a = deskRectPx(from);
  const b = deskRectPx(to);
  const k = ((rotOf(to) - rotOf(from)) % 4 + 4) % 4;
  if (!k) {
    const px2 = item.x * 32 + (item.ox ?? 0) + b.x - a.x;
    const py2 = item.y * 32 + (item.oy ?? 0) + b.y - a.y;
    const x2 = Math.floor(px2 / 32);
    const y2 = Math.floor(py2 / 32);
    return { ...item, x: x2, y: y2, ox: px2 - x2 * 32 || void 0, oy: py2 - y2 * 32 || void 0 };
  }
  const c = itemCenter(item);
  const clamp01 = (v2) => Math.max(0, Math.min(1, v2));
  let u = clamp01((c.x - a.x) / a.w);
  let v = clamp01(((c.y - a.y) / a.h - TOP0) / (TOP1 - TOP0));
  for (let i = 0; i < k; i++) [u, v] = [1 - v, u];
  const rot = (rotOf(item) + k) % 4;
  const moved = { ...item, rot: rot || void 0 };
  const z = sizeOf(moved);
  const cx = Math.round(b.x + u * b.w);
  const cy = Math.round(b.y + (TOP0 + v * (TOP1 - TOP0)) * b.h);
  const px = Math.round((cx - z.w * 16) / 2) * 2;
  const py = Math.round((cy - 4 - z.h * 16) / 2) * 2;
  const x = Math.floor(px / 32);
  const y = Math.floor(py / 32);
  return { ...moved, x, y, ox: px - x * 32 || void 0, oy: py - y * 32 || void 0 };
}
function carryDeskItems(placements, from, to) {
  const on = new Set(itemsOnDesk(placements, from).map((p) => p.id));
  if (!on.size) return placements;
  return placements.map((p) => on.has(p.id) ? carryItem(p, from, to) : p);
}
function defaultDeskItems(desk) {
  const list = DEFAULT_ITEMS[desk.key];
  if (!list) return [];
  const flat = { ...desk, rot: void 0 };
  const x0 = desk.x * 32 + (desk.ox ?? 0);
  const y0 = desk.y * 32 + (desk.oy ?? 0);
  return list.map(([key, dx, dy, rot], i) => {
    const px = x0 + dx;
    const py = y0 + dy;
    const x = Math.floor(px / 32);
    const y = Math.floor(py / 32);
    const item = { id: `${desk.id}~${i}`, key, x, y, ox: px - x * 32 || void 0, oy: py - y * 32 || void 0, rot: rot || void 0 };
    return rotOf(desk) ? carryItem(item, flat, desk) : item;
  });
}
function deskSpeakerSource(placements, desk) {
  if (BUILTIN_SPEAKER.has(desk.key)) return desk;
  return itemsOnDesk(placements, desk).find((p) => DESK_SPEAKER_ITEMS.has(p.key)) ?? null;
}
var isTop, TOP0, TOP1, DEFAULT_ITEMS, DESK_SPEAKER_ITEMS, BUILTIN_SPEAKER;
var init_deskItems = __esm({
  "shared/map/deskItems.ts"() {
    "use strict";
    init_furniture();
    init_footprint();
    isTop = (p) => furnitureDef(p.key).layer === "top";
    TOP0 = 0.18;
    TOP1 = 0.7;
    DEFAULT_ITEMS = {
      desk_a: [
        ["top_pc_monitor", 16, -2],
        ["top_keyboard", 16, 19],
        ["top_mouse", 33, 20],
        ["top_cup_white", -5, 14],
        ["top_papers", 39, 8],
        ["top_postits", -2, 3]
      ],
      desk_b: [
        ["top_pc_monitor_b", 16, -2],
        ["top_keyboard", 16, 19],
        ["top_mouse", 33, 20],
        ["top_plant_pot", -6, 8],
        ["top_cup_blue", 39, 13],
        ["top_books_flat", 37, 1]
      ],
      desk_back: [
        ["top_pc_monitor", 16, 14, 2],
        ["top_keyboard", 16, -5],
        ["top_papers", -7, -1],
        ["top_cup_orange", 39, -2]
      ],
      exec_desk: [
        ["top_pc_monitor", 33, 8, 2],
        ["top_laptop_open", 1, 2],
        ["top_lamp_brass", 64, 2],
        ["top_nameplate", 33, 20],
        ["top_papers", 53, 12]
      ]
    };
    DESK_SPEAKER_ITEMS = /* @__PURE__ */ new Set(["top_speaker"]);
    BUILTIN_SPEAKER = /* @__PURE__ */ new Set(["tech_music_desk", "tech_smart_speaker"]);
  }
});

// shared/map/officeLayout.ts
function buildOfficeLayout() {
  const floor = Array.from({ length: MAP_H }, () => Array(MAP_W).fill("void"));
  const doors = [];
  const fill = (x0, y0, x1, y1, k) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) floor[y][x] = k;
  };
  const hwall = (y, x0, x1, k = "wall") => fill(x0, y, x1, y, k);
  const vwall = (x, y0, y1, k = "wall") => fill(x, y0, x, y1, k);
  const door = (x0, y0, x1, y1, k) => {
    fill(x0, y0, x1, y1, k);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) doors.push({ x, y });
  };
  fill(1, 1, MAP_W - 2, MAP_H - 2, "wood");
  hwall(0, 0, MAP_W - 1);
  hwall(MAP_H - 1, 0, MAP_W - 1);
  vwall(0, 0, MAP_H - 1);
  vwall(MAP_W - 1, 0, MAP_H - 1);
  fill(1, 1, 13, 9, "carpetBlue");
  vwall(14, 1, 10);
  fill(15, 1, 27, 9, "carpetBlue");
  vwall(28, 1, 10);
  hwall(10, 1, 27, "glass");
  door(6, 10, 7, 10, "carpetBlue");
  door(20, 10, 21, 10, "carpetBlue");
  fill(29, 1, 54, 9, "parquet");
  vwall(37, 1, 10);
  vwall(46, 1, 10);
  hwall(10, 29, 54);
  door(32, 10, 32, 10, "parquet");
  door(41, 10, 41, 10, "parquet");
  door(50, 10, 50, 10, "parquet");
  vwall(33, 14, 25);
  door(33, 18, 33, 20, "wood");
  fill(34, 13, 54, 25, "carpetGreen");
  hwall(26, 1, 54);
  fill(1, 27, 16, 36, "carpetRed");
  vwall(17, 27, 36);
  fill(18, 27, 37, 36, "stone");
  vwall(38, 27, 36);
  fill(39, 27, 54, 36, "checker");
  door(8, 26, 9, 26, "carpetRed");
  door(24, 26, 31, 26, "stone");
  door(52, 26, 53, 26, "checker");
  door(17, 29, 17, 30, "carpetRed");
  door(38, 29, 38, 30, "checker");
  const placements = [];
  let n = 0;
  const put = (key, x, y, opts = {}) => {
    placements.push({ id: `${key}-${n++}`, key, x, y, ...opts });
  };
  const meetingRoom = (ox) => {
    put("window", ox, 0);
    put("tv_wall", ox + 4, 0);
    put("whiteboard", ox + 10, 0);
    put("plant_tall", ox, 1);
    put("plant_tall", ox + 12, 1);
    put("meeting_table", ox + 3, 4);
    for (let i = 0; i < 4; i++) {
      put("mchair_down", ox + 4 + i, 3);
      put("mchair_up", ox + 4 + i, 7);
    }
    put("mchair_side", ox + 2, 5);
    put("mchair_side", ox + 9, 5, { flip: true });
    put("occ_light", ox + 3, 10);
    put("side_table", ox + 12, 8);
    put("floor_lamp", ox, 7);
  };
  meetingRoom(1);
  meetingRoom(15);
  const skip = () => void n++;
  const office = (ox, owner, variant) => {
    const studio2 = variant === 1;
    const opt = (fn) => studio2 ? skip() : fn();
    opt(() => put("window", ox + 2, 0));
    opt(() => put("painting", ox + 5, 0));
    opt(() => put("plant_palm", ox, 1));
    opt(() => put("bookshelf", ox + 6, 1));
    put("chair_down", studio2 ? ox + 6 : ox + 3, studio2 ? 6 : 2);
    put("exec_desk", studio2 ? ox + 5 : ox + 2, studio2 ? 7 : 3, { label: `Mesa de ${owner.split(" ")[0]}` });
    opt(() => put("rug_b", ox + 1, 5));
    opt(() => put("armchair_up", ox + 2, 6));
    opt(() => put("armchair_up", ox + 4, 6));
    opt(() => put("side_table", ox + 3, 6));
    opt(() => put(variant === 1 ? "floor_lamp" : "filing_cabinet", ox, 7));
    opt(() => put("plant_small", ox + 7, 8));
  };
  office(29, "Gregorio", 0);
  office(38, "Dani", 1);
  office(47, "Mau", 2);
  put("clock", 29, 10);
  put("painting_wide", 34, 10);
  put("painting", 39, 10);
  put("painting_wide", 43, 10);
  put("painting", 48, 10);
  put("painting_wide", 52, 10);
  const pod = (ox, oy) => {
    for (let i = 0; i < 2; i++) {
      const x = ox + i * 2;
      put("chair_down", x, oy, { ox: 16 });
      put("desk_back", x, oy + 1);
      put(i % 2 === 0 ? "desk_a" : "desk_b", x, oy + 3);
      put("chair_up", x, oy + 5, { ox: 16 });
    }
  };
  for (const px of [2, 8, 14, 20]) pod(px, 13);
  for (const px of [2, 8, 14]) pod(px, 20);
  put("plant_tall", 1, 13);
  put("plant_tall", 7, 14);
  put("plant_tall", 13, 14);
  put("plant_tall", 19, 14);
  put("planter_long", 26, 13);
  put("printer", 30, 13);
  put("filing_cabinet", 31, 13);
  put("water_cooler", 32, 13);
  put("whiteboard_stand", 26, 16);
  put("stool", 28, 18);
  put("stool", 28, 19);
  put("rug_c", 21, 21);
  put("beanbag_a", 21, 22);
  put("beanbag_b", 23, 22);
  put("side_table", 22, 22);
  put("cafe_table", 27, 21);
  put("stool", 26, 21);
  put("stool", 29, 22);
  put("stool", 27, 23);
  put("plant_palm", 32, 23);
  put("bookshelf", 25, 24);
  put("trash_bin", 1, 24);
  put("rug_a", 38, 15);
  put("sofa_down", 39, 14);
  put("coffee_table", 40, 17);
  put("sofa_up", 39, 18);
  put("armchair_side", 37, 17);
  put("armchair_side", 44, 17, { flip: true });
  put("floor_lamp", 37, 14);
  put("floor_lamp", 44, 14);
  put("rug_c", 48, 15);
  put("beanbag_a", 48, 15);
  put("beanbag_c", 50, 15);
  put("beanbag_b", 48, 17);
  put("side_table", 49, 16);
  put("sofa_side", 53, 15, { flip: true });
  put("tv_stand", 46, 21);
  put("beanbag_b", 46, 24);
  put("beanbag_c", 48, 24);
  put("plant_palm", 34, 13);
  put("plant_tall", 54, 13);
  put("plant_tall", 54, 22);
  put("plant_palm", 34, 23);
  put("planter_long", 38, 23);
  put("plant_small", 51, 24);
  put("bookshelf", 52, 20);
  for (const bx of [1, 3, 5, 10, 12, 14]) put("bookshelf", bx, 27);
  put("study_table", 3, 30, { label: "Mesa de estudos" });
  put("chair_up", 4, 32);
  put("chair_up", 3, 32);
  put("chair_down", 4, 29);
  put("study_table", 10, 30, { label: "Mesa de estudos" });
  put("chair_up", 11, 32);
  put("chair_down", 10, 29);
  put("chair_down", 12, 29);
  put("rug_b", 6, 33);
  put("armchair_up", 7, 34);
  put("armchair_up", 9, 34);
  put("side_table", 8, 34);
  put("floor_lamp", 1, 33);
  put("floor_lamp", 15, 33);
  put("plant_palm", 1, 35);
  put("plant_tall", 15, 35);
  put("plant_small", 8, 29);
  put("logo_sign", 19, 26);
  put("painting_wide", 33, 26);
  put("chair_down", 26, 28);
  put("reception_counter", 24, 29, { label: "Recep\xE7\xE3o" });
  put("plant_palm", 18, 27);
  put("plant_palm", 37, 27);
  put("sofa_leather_side", 18, 31);
  put("side_table", 20, 30);
  put("rug_b", 20, 32);
  put("armchair_side", 23, 33, { flip: true });
  put("sofa_leather_side", 36, 31, { flip: true });
  put("side_table", 35, 30);
  put("armchair_side", 32, 33);
  put("plant_tall", 18, 35);
  put("plant_tall", 37, 35);
  put("water_cooler", 33, 27);
  put("rug_entry", 26, 35);
  put("entrance_door", 27, 37);
  put("fridge", 39, 27);
  put("counter_plain", 40, 27);
  put("counter_sink", 41, 27);
  put("counter_plain", 42, 27);
  put("counter_coffee", 43, 27);
  put("counter_kettle", 44, 27);
  put("counter_fruit", 45, 27);
  put("counter_plain", 46, 27);
  put("vending", 48, 27);
  put("plant_tall", 50, 27);
  put("plant_palm", 54, 27);
  for (const [tx, ty] of [[41, 31], [45, 31], [49, 31], [41, 34], [45, 34], [49, 34]]) {
    put("cafe_table", tx, ty);
    put("stool", tx - 1, ty);
    put("stool", tx + 2, ty + 1);
  }
  put("plant_small", 54, 35);
  put("trash_bin", 39, 35);
  put("painting", 49, 26);
  const studio = (key, x, y, name, opts = {}) => placements.push({ id: `studio-${name}`, key, x, y, ...opts });
  const sx = 38;
  studio("acoustic_panel", sx, 0, "panel-1");
  studio("on_air_sign", sx + 2, 0, "onair");
  studio("acoustic_panel", sx + 4, 0, "panel-2");
  studio("acoustic_panel", sx + 6, 0, "panel-3");
  studio("rug_studio", sx + 1, 1, "rug");
  studio("sofa_red", sx + 1, 1, "sofa");
  studio("pouf_grey", sx + 4, 2, "pouf");
  studio("softbox", sx, 3, "softbox-1");
  studio("softbox", sx + 4, 4, "softbox-2", { flip: true });
  studio("camera_tripod", sx + 2, 5, "camera");
  studio("plant_tall", sx + 7, 1, "plant");
  studio("floor_lamp", sx, 7, "lamp");
  placements.push({ id: "flag-brasil", key: "flag_brazil", x: 35, y: 26 });
  const zones = [
    { id: "aurora", name: "Reuni\xE3o Geral", kind: "meeting", x: 1, y: 1, w: 13, h: 9, entry: { x: 6, y: 11 }, capacity: 10 },
    { id: "horizonte", name: "Sala Edi\xE7\xE3o", kind: "meeting", x: 15, y: 1, w: 13, h: 9, entry: { x: 20, y: 11 }, capacity: 10 },
    { id: "office-ana", name: "Diretoria", owner: "Gregorio", kind: "office", x: 29, y: 1, w: 8, h: 9, entry: { x: 32, y: 11 } },
    { id: "office-bruno", name: "Est\xFAdio de grava\xE7\xE3o", owner: "Dani", kind: "office", x: 38, y: 1, w: 8, h: 9, entry: { x: 41, y: 11 } },
    { id: "office-carla", name: "Engenharia", owner: "Mau", kind: "office", x: 47, y: 1, w: 8, h: 9, entry: { x: 50, y: 11 } },
    { id: "workspace", name: "\xC1rea de trabalho", kind: "workspace", x: 1, y: 13, w: 32, h: 13, entry: { x: 17, y: 19 } },
    { id: "lounge", name: "Conviv\xEAncia", kind: "lounge", x: 34, y: 13, w: 21, h: 13, entry: { x: 42, y: 21 } },
    { id: "library", name: "Biblioteca", kind: "library", x: 1, y: 27, w: 16, h: 10, entry: { x: 8, y: 28 } },
    { id: "reception", name: "Recep\xE7\xE3o", kind: "reception", x: 18, y: 27, w: 20, h: 10, entry: { x: 27, y: 33 } },
    { id: "cafe", name: "Cafeteria", kind: "cafe", x: 39, y: 27, w: 16, h: 10, entry: { x: 47, y: 33 } },
    { id: "corridor", name: "Corredor", kind: "corridor", x: 1, y: 11, w: 54, h: 2, entry: { x: 27, y: 12 } }
  ];
  const lights = [
    { x: 7, y: 5.5, r: 5 },
    { x: 21, y: 5.5, r: 5 },
    { x: 33, y: 4, r: 3.5, warm: true },
    { x: 42, y: 4, r: 3.5, warm: true },
    { x: 51, y: 4, r: 3.5, warm: true },
    { x: 6, y: 17, r: 5 },
    { x: 17, y: 17, r: 5 },
    { x: 28, y: 17, r: 4.5 },
    { x: 6, y: 23, r: 4.5 },
    { x: 17, y: 23, r: 4.5 },
    { x: 41, y: 17.5, r: 5.5, warm: true },
    { x: 50, y: 17, r: 4.5, warm: true },
    { x: 47.5, y: 23, r: 3.5, warm: true },
    { x: 8, y: 32, r: 5, warm: true },
    { x: 27.5, y: 31.5, r: 6 },
    { x: 46.5, y: 32.5, r: 6, warm: true },
    { x: 14, y: 11.5, r: 3.5 },
    { x: 41, y: 11.5, r: 3.5 }
  ];
  for (const d of [...placements]) placements.push(...defaultDeskItems(d));
  return { width: MAP_W, height: MAP_H, floor, placements, zones, doors, lights, spawn: { x: 27, y: 34 } };
}
function getOfficeLayout() {
  return current ??= getBaseLayout();
}
function getBaseLayout() {
  return base ??= buildOfficeLayout();
}
function setOfficeLayout(layout) {
  base = layout;
  current = layout;
}
function getMapState() {
  const L2 = getOfficeLayout();
  return { placements: L2.placements, floor: L2.floor, zones: L2.zones, doors: L2.doors, lights: L2.lights };
}
function setMapState(state) {
  const b = getBaseLayout();
  const ok = (f) => Array.isArray(f) && f.length === b.height && f.every((r) => Array.isArray(r) && r.length === b.width);
  current = {
    ...b,
    placements: state.placements ?? b.placements,
    floor: ok(state.floor) ? state.floor : b.floor,
    zones: state.zones ?? b.zones,
    doors: state.doors ?? b.doors,
    lights: state.lights ?? b.lights
  };
}
var WALL_KINDS, base, current;
var init_officeLayout = __esm({
  "shared/map/officeLayout.ts"() {
    "use strict";
    init_constants();
    init_deskItems();
    WALL_KINDS = /* @__PURE__ */ new Set(["wall", "glass", "void"]);
    base = null;
    current = null;
  }
});

// shared/map/seats.ts
function specOf(key) {
  const fixed = SPECS[key];
  if (fixed) return fixed;
  const def = furnitureDef(key);
  if (!def.seat) return void 0;
  const { cells, dy } = def.seat;
  return { dy, cells: () => cells };
}
function seatsOf(p) {
  const spec = specOf(p.key);
  if (!spec) return [];
  const def = furnitureDef(p.key);
  return spec.cells(false).map(([lx, ly, dir]) => {
    const t = fromOriginal(p, lx, ly);
    return { lx: t.x, ly: t.y, dir: turnDir(dir, rotOf(p), !!p.flip) };
  }).map(({ lx, ly, dir }) => ({
    x: p.x + lx,
    y: p.y + ly,
    dir,
    dy: spec.dy + (p.oy ?? 0),
    dx: p.ox ?? 0,
    placementId: p.id,
    key: p.key,
    name: p.label ?? def.name,
    bottom: p.y + sizeOf(p).h
  }));
}
var one, side, SPECS, isSeatKey;
var init_seats = __esm({
  "shared/map/seats.ts"() {
    "use strict";
    init_furniture();
    init_footprint();
    one = (dir) => () => [[0, 0, dir]];
    side = (flip) => [[0, 0, flip ? "left" : "right"]];
    SPECS = {
      chair_up: { cells: one("up"), dy: -2 },
      chair_down: { cells: one("down"), dy: -6 },
      chair_side: { cells: side, dy: -5 },
      mchair_up: { cells: one("up"), dy: -2 },
      mchair_down: { cells: one("down"), dy: -6 },
      mchair_side: { cells: side, dy: -5 },
      stool: { cells: one("down"), dy: -9 },
      beanbag_a: { cells: one("down"), dy: -4 },
      beanbag_b: { cells: one("down"), dy: -4 },
      beanbag_c: { cells: one("down"), dy: -4 },
      pouf_grey: { cells: one("down"), dy: -8 },
      armchair_down: { cells: one("down"), dy: -6 },
      armchair_up: { cells: one("up"), dy: -3 },
      armchair_side: { cells: side, dy: -6 },
      sofa_down: { cells: () => [[0, 1, "down"], [1, 1, "down"], [2, 1, "down"]], dy: -14 },
      sofa_red: { cells: () => [[0, 1, "down"], [1, 1, "down"], [2, 1, "down"]], dy: -14 },
      sofa_up: { cells: () => [[0, 0, "up"], [1, 0, "up"], [2, 0, "up"]], dy: -6 },
      sofa_side: { cells: (f) => [0, 1, 2].map((ly) => [f ? 0 : 1, ly, f ? "left" : "right"]), dy: -6 },
      sofa_leather_side: { cells: (f) => [0, 1, 2].map((ly) => [f ? 0 : 1, ly, f ? "left" : "right"]), dy: -6 }
    };
    isSeatKey = (key) => !!specOf(key);
  }
});

// shared/map/desks.ts
function buildDeskSpots(layout) {
  const chairs = layout.placements.filter((p) => isChair(p.key));
  const W = layout.width;
  const blocked = new Uint8Array(W * layout.height);
  for (let y = 0; y < layout.height; y++) for (let x = 0; x < W; x++) if (WALL_KINDS.has(layout.floor[y][x])) blocked[y * W + x] = 1;
  for (const q of layout.placements) {
    const z = sizeOf(q);
    for (let ly = 0; ly < z.h; ly++) for (let lx = 0; lx < z.w; lx++) if (solidAt(q, lx, ly) && q.x + lx < W && q.y + ly < layout.height) blocked[(q.y + ly) * W + q.x + lx] = 1;
  }
  const taken = new Set(chairs.map((c) => c.y * W + c.x));
  const zoneOf = (x, y) => layout.zones.find((z) => x >= z.x && x < z.x + z.w && y >= z.y && y < z.y + z.h && z.kind !== "corridor") ?? null;
  const spots = [];
  let n = 0;
  for (const p of layout.placements) {
    if (!isClaimableDesk(p.key)) continue;
    const def = sizeOf(p);
    const touching = (c, side2) => side2 === "up" || side2 === "down" ? c.x >= p.x && c.x < p.x + def.w && c.y === (side2 === "up" ? p.y - 1 : p.y + def.h) : c.y >= p.y && c.y < p.y + def.h && c.x === (side2 === "left" ? p.x - 1 : p.x + def.w);
    const base2 = p.key === "desk_back" || p.key === "exec_desk" ? ["up"] : CLAIMABLE.has(p.key) ? ["down"] : ["down", "up", "left", "right"];
    let seatChair;
    for (const side2 of base2) seatChair ??= chairs.find((c) => touching(c, turnDir(side2, rotOf(p), !!p.flip)));
    if (!seatChair && !CLAIMABLE.has(p.key)) {
      for (const side2 of ["down", "up", "left", "right"]) {
        if (seatChair) break;
        const d = turnDir(side2, rotOf(p), !!p.flip);
        const along = d === "up" || d === "down" ? def.w : def.h;
        const order = [...Array(along).keys()].sort((a, b) => Math.abs(a - (along - 1) / 2) - Math.abs(b - (along - 1) / 2));
        for (const i of order) {
          const x = d === "up" || d === "down" ? p.x + i : d === "left" ? p.x - 1 : p.x + def.w;
          const y = d === "left" || d === "right" ? p.y + i : d === "up" ? p.y - 1 : p.y + def.h;
          if (x < 0 || y < 0 || x >= W || y >= layout.height || blocked[y * W + x] || taken.has(y * W + x)) continue;
          seatChair = { x, y };
          taken.add(y * W + x);
          break;
        }
      }
    }
    if (!seatChair) continue;
    const zone = zoneOf(p.x, p.y);
    if (p.key === "exec_desk" && zone) {
      const doors = layout.doors.filter((d) => d.y === zone.y + zone.h && d.x >= zone.x && d.x < zone.x + zone.w);
      spots.push({
        id: p.id,
        kind: "office",
        name: zone.name,
        desk: { x: p.x, y: p.y, w: def.w, h: def.h },
        seat: { x: seatChair.x, y: seatChair.y },
        lockTiles: doors.map((d) => ({ x: d.x, y: d.y })),
        inside: { x: zone.x, y: zone.y, w: zone.w, h: zone.h },
        zoneId: zone.id
      });
    } else {
      n++;
      spots.push({
        id: p.id,
        kind: "desk",
        name: `Mesa ${n}`,
        desk: { x: p.x, y: p.y, w: def.w, h: def.h },
        seat: { x: seatChair.x, y: seatChair.y },
        lockTiles: [{ x: seatChair.x, y: seatChair.y }],
        inside: { x: seatChair.x, y: seatChair.y, w: 1, h: 1 },
        zoneId: zone?.id ?? null
      });
    }
  }
  return spots;
}
function blockedByDesk(spots, claims, profileId, fx, fy, tx, ty) {
  for (const s of spots) {
    const c = claims[s.id];
    if (!c || !c.locked || c.ownerId === profileId) continue;
    if (!s.lockTiles.some((t) => t.x === tx && t.y === ty)) continue;
    if (inRect2(s.inside, fx, fy)) continue;
    return c;
  }
  return null;
}
function sanitizeDeskPatch(p) {
  const x = p ?? {};
  const out2 = {};
  if (typeof x.label === "string") out2.label = x.label.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 22);
  if (typeof x.color === "string" && DESK_COLORS.includes(x.color)) out2.color = x.color;
  if (typeof x.emoji === "string" && DESK_EMOJIS.includes(x.emoji)) out2.emoji = x.emoji;
  if (typeof x.locked === "boolean") out2.locked = x.locked;
  return out2;
}
function applyDeskAction(claims, spots, owner, action) {
  const next = { ...claims };
  const mine = Object.values(next).find((c) => c.ownerId === owner.profileId);
  if (action.type === "claim") {
    const spot = spots.find((s) => s.id === action.spotId);
    if (!spot) return { claims, error: "Mesa inexistente." };
    const cur = next[spot.id];
    if (cur && cur.ownerId !== owner.profileId) return { claims, error: `Esta mesa j\xE1 \xE9 de ${cur.ownerName}.` };
    if (mine && mine.spotId !== spot.id) delete next[mine.spotId];
    next[spot.id] = cur ?? {
      spotId: spot.id,
      ownerId: owner.profileId,
      ownerName: owner.name,
      label: spot.kind === "office" ? `Sala de ${owner.name.split(" ")[0]}` : owner.name,
      color: DESK_COLORS[0],
      emoji: "",
      locked: false,
      since: Date.now()
    };
    return { claims: next };
  }
  if (!mine) return { claims, error: "Voc\xEA ainda n\xE3o tem uma mesa." };
  if (action.type === "release") {
    delete next[mine.spotId];
    return { claims: next };
  }
  next[mine.spotId] = { ...mine, ...sanitizeDeskPatch(action.patch), ownerName: owner.name };
  return { claims: next };
}
var DESK_COLORS, DESK_EMOJIS, CLAIMABLE, isClaimableDesk, isChair, inRect2;
var init_desks = __esm({
  "shared/map/desks.ts"() {
    "use strict";
    init_furniture();
    init_officeLayout();
    init_seats();
    init_footprint();
    DESK_COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#8b5cf6", "#ef4444", "#14b8a6", "#a3a3a3"];
    DESK_EMOJIS = ["", "\u{1F3A7}", "\u{1F4BB}", "\u{1F331}", "\u2615", "\u{1F3A8}", "\u{1F4CA}", "\u{1F680}", "\u{1F431}", "\u{1F3B5}", "\u{1F4DA}", "\u{1F525}"];
    CLAIMABLE = /* @__PURE__ */ new Set(["desk_a", "desk_b", "desk_back", "exec_desk"]);
    isClaimableDesk = (key) => CLAIMABLE.has(key) || !!furnitureDef(key).desk;
    isChair = (key) => {
      const d = furnitureDef(key);
      return d.w === 1 && d.h === 1 && d.layer === "low" && isSeatKey(key) && !/beanbag|ottoman|pouf|stool|bench|armchair/.test(key);
    };
    inRect2 = (r, x, y) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h;
  }
});

// shared/map/world.ts
function stepIsAdjacent(ax, ay, bx, by) {
  return Math.abs(ax - bx) + Math.abs(ay - by) === 1;
}
function chebyshev(ax, ay, bx, by) {
  return Math.max(Math.abs(ax - bx), Math.abs(ay - by));
}
var OfficeWorld, NEIGHBORS;
var init_world = __esm({
  "shared/map/world.ts"() {
    "use strict";
    init_furniture();
    init_footprint();
    init_officeLayout();
    init_seats();
    OfficeWorld = class {
      constructor(layout) {
        this.layout = layout;
        this.width = layout.width;
        this.height = layout.height;
        this.blocked = new Uint8Array(this.width * this.height);
        this.zoneGrid = new Array(this.width * this.height).fill(null);
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            if (WALL_KINDS.has(layout.floor[y][x])) this.blocked[y * this.width + x] = 1;
          }
        }
        for (const p of layout.placements) {
          const { w, h } = sizeOf(p);
          for (let ly = 0; ly < h; ly++) {
            for (let lx = 0; lx < w; lx++) {
              if (solidAt(p, lx, ly)) this.setBlocked(p.x + lx, p.y + ly);
            }
          }
        }
        for (const p of layout.placements) {
          for (const seat of seatsOf(p)) if (this.inBounds(seat.x, seat.y) && !this.blocked[seat.y * this.width + seat.x]) this.seatGrid.set(seat.y * this.width + seat.x, seat);
        }
        for (const z of [...layout.zones].reverse()) {
          for (let y = z.y; y < z.y + z.h; y++) {
            for (let x = z.x; x < z.x + z.w; x++) {
              if (this.inBounds(x, y)) this.zoneGrid[y * this.width + x] = z;
            }
          }
        }
        this.interactables = layout.placements.filter((p) => furnitureDef(p.key).interact || furnitureDef(p.key).desk).map((p) => {
          const def = furnitureDef(p.key);
          const it = def.interact ?? { kind: "computer", verb: "Abrir mesa" };
          return {
            id: p.id,
            placement: p,
            name: p.label ?? def.name,
            kind: it.kind,
            verb: it.verb,
            def
          };
        });
      }
      layout;
      width;
      height;
      blocked;
      zoneGrid;
      interactables;
      /** Assentos indexados por tile (y * largura + x). */
      seatGrid = /* @__PURE__ */ new Map();
      inBounds(x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
      }
      setBlocked(x, y) {
        if (this.inBounds(x, y)) this.blocked[y * this.width + x] = 1;
      }
      isWalkable(x, y) {
        return this.inBounds(x, y) && this.blocked[y * this.width + x] === 0;
      }
      /** Assento no tile (x, y), se houver. */
      seatAt(x, y) {
        return this.inBounds(x, y) ? this.seatGrid.get(y * this.width + x) ?? null : null;
      }
      zoneAt(x, y) {
        if (!this.inBounds(x, y)) return null;
        return this.zoneGrid[y * this.width + x];
      }
      /** Objeto interativo mais adequado a partir do tile (x, y) olhando para `dir`. */
      findInteractable(x, y, dir) {
        let best = null;
        let bestScore = Infinity;
        const fx = x + (dir === "left" ? -1 : dir === "right" ? 1 : 0);
        const fy = y + (dir === "up" ? -1 : dir === "down" ? 1 : 0);
        for (const it of this.interactables) {
          const { placement: p, def } = it;
          const rx0 = p.x;
          const ry0 = p.y;
          const size = sizeOf(p);
          const rx1 = p.x + size.w - 1;
          const ry1 = p.y + size.h - 1 + (def.layer === "wall" ? 1 : 0);
          const dx = x < rx0 ? rx0 - x : x > rx1 ? x - rx1 : 0;
          const dy = y < ry0 ? ry0 - y : y > ry1 ? y - ry1 : 0;
          const dist = Math.max(dx, dy);
          if (dist > 1) continue;
          const facing = fx >= rx0 && fx <= rx1 && fy >= ry0 && fy <= ry1;
          const score = dist + (facing ? 0 : 0.5) + (dx && dy ? 0.25 : 0);
          if (score < bestScore) {
            bestScore = score;
            best = it;
          }
        }
        return best;
      }
      /** BFS em grade 4-vizinhos. Retorna a lista de tiles (sem incluir a origem). */
      findPath(sx, sy, tx, ty, maxNodes = 4e3, canStep = () => true) {
        if (!this.isWalkable(tx, ty)) {
          const alt = this.nearestWalkable(tx, ty, sx, sy);
          if (!alt) return null;
          tx = alt.x;
          ty = alt.y;
        }
        if (sx === tx && sy === ty) return [];
        return this.bfs(sx, sy, tx, ty, maxNodes, canStep, true) ?? this.bfs(sx, sy, tx, ty, maxNodes, canStep, false);
      }
      bfs(sx, sy, tx, ty, maxNodes, canStep, avoidSeats) {
        const W = this.width;
        const prev = new Int32Array(W * this.height).fill(-1);
        const start = sy * W + sx;
        const goal = ty * W + tx;
        prev[start] = start;
        const queue = new Int32Array(W * this.height);
        let head = 0;
        let tail = 0;
        queue[tail++] = start;
        let visited = 0;
        while (head < tail) {
          const cur = queue[head++];
          if (cur === goal) break;
          if (++visited > maxNodes) return null;
          const cx = cur % W;
          const cy = cur / W | 0;
          for (const [dx, dy] of NEIGHBORS) {
            const nx = cx + dx;
            const ny = cy + dy;
            if (!this.isWalkable(nx, ny) || !canStep(cx, cy, nx, ny)) continue;
            const ni = ny * W + nx;
            if (prev[ni] !== -1) continue;
            if (avoidSeats && ni !== goal && this.seatGrid.has(ni)) continue;
            prev[ni] = cur;
            queue[tail++] = ni;
          }
        }
        if (prev[goal] === -1) return null;
        const path = [];
        for (let c = goal; c !== start; c = prev[c]) path.push({ x: c % W, y: c / W | 0 });
        return path.reverse();
      }
      /** Tile caminhável mais próximo de (x, y), preferindo os mais perto de (fromX, fromY). */
      nearestWalkable(x, y, fromX = x, fromY = y) {
        for (let r = 1; r < 6; r++) {
          let best = null;
          let bestD = Infinity;
          for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
              if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
              const nx = x + dx;
              const ny = y + dy;
              if (!this.isWalkable(nx, ny)) continue;
              const d = Math.abs(dx) + Math.abs(dy) + 0.01 * (Math.abs(nx - fromX) + Math.abs(ny - fromY));
              if (d < bestD) {
                bestD = d;
                best = { x: nx, y: ny };
              }
            }
          }
          if (best) return best;
        }
        return null;
      }
      /** Assentos — destinos naturais para os colegas simulados. */
      seats() {
        return [...this.seatGrid.values()].map((st) => ({ x: st.x, y: st.y, facing: st.dir, zone: this.zoneAt(st.x, st.y) }));
      }
    };
    NEIGHBORS = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0]
    ];
  }
});

// shared/appearance.ts
function layer(cat, v, fallback) {
  const x = v ?? {};
  const style = typeof x.style === "string" && CATALOG[cat].some((o) => o.id === x.style) ? x.style : fallback.style;
  const color = typeof x.color === "string" && HEX.test(x.color) ? x.color : fallback.color;
  return { style, color };
}
function normalizeAppearance(raw, fallback = DEFAULT_APPEARANCE) {
  const a = raw ?? {};
  if (a.v !== 2 && ("hairStyle" in a || "shirt" in a)) {
    const color = (k, f) => typeof a[k] === "string" && HEX.test(a[k]) ? a[k] : f;
    return {
      ...fallback,
      skin: color("skin", fallback.skin),
      hair: { style: LEGACY_HAIR[Number(a.hairStyle)] ?? "short", color: color("hairColor", fallback.hair.color) },
      top: { style: "tee", color: color("shirt", fallback.top.color) },
      bottom: { style: "pants", color: color("pants", fallback.bottom.color) },
      shoes: { style: "sneakers", color: color("shoes", fallback.shoes.color) },
      eyewear: { style: a.glasses ? "glasses" : "none", color: "#2b2f36" },
      accessory: { style: "none", color: "#2b2f36" }
    };
  }
  const oldAcc = a.accessory ?? {};
  const eyeIds = CATALOG.eyewear.map((o) => o.id);
  const movedEye = !a.eyewear && typeof oldAcc.style === "string" && oldAcc.style !== "none" && eyeIds.includes(oldAcc.style);
  return {
    v: 2,
    skin: typeof a.skin === "string" && HEX.test(a.skin) ? a.skin : fallback.skin,
    hair: layer("hair", a.hair, fallback.hair),
    facialHair: layer("facialHair", a.facialHair, fallback.facialHair),
    top: layer("top", a.top, fallback.top),
    jacket: layer("jacket", a.jacket, fallback.jacket),
    bottom: layer("bottom", a.bottom, fallback.bottom),
    shoes: layer("shoes", a.shoes, fallback.shoes),
    eyewear: movedEye ? layer("eyewear", oldAcc, fallback.eyewear) : layer("eyewear", a.eyewear, fallback.eyewear),
    accessory: movedEye ? { style: "none", color: fallback.accessory.color } : layer("accessory", a.accessory, fallback.accessory)
  };
}
var CATALOG, SKIN_TONES, HAIR_COLORS, CLOTH_COLORS, LENS_COLORS, COLOR_SETS, DEFAULT_APPEARANCE, HEX, LEGACY_HAIR, sanitizeAppearance;
var init_appearance = __esm({
  "shared/appearance.ts"() {
    "use strict";
    CATALOG = {
      hair: [
        { id: "bald", label: "Careca" },
        { id: "buzz", label: "Raspado" },
        { id: "short", label: "Curto" },
        { id: "side", label: "Repartido" },
        { id: "spiky", label: "Espetado" },
        { id: "mohawk", label: "Moicano" },
        { id: "curly", label: "Cacheado" },
        { id: "afro", label: "Black power" },
        { id: "puffs", label: "Puffs" },
        { id: "bob", label: "Chanel" },
        { id: "long", label: "Longo" },
        { id: "wavy", label: "Ondulado" },
        { id: "ponytail", label: "Rabo de cavalo" },
        { id: "bun", label: "Coque" },
        { id: "braids", label: "Tran\xE7as" },
        { id: "locs", label: "Dreads m\xE9dios" },
        { id: "dreads", label: "Dreads longos" },
        { id: "dreads_short", label: "Dreads curtos" },
        { id: "dread_bun", label: "Dreads presos" },
        { id: "cornrows", label: "Tran\xE7a nag\xF4" },
        { id: "fade", label: "Degrad\xEA" },
        { id: "mullet", label: "Mullet" }
      ],
      facialHair: [
        { id: "none", label: "Nenhuma" },
        { id: "stubble", label: "Por fazer" },
        { id: "mustache", label: "Bigode" },
        { id: "goatee", label: "Cavanhaque" },
        { id: "beard", label: "Barba cheia" },
        { id: "long", label: "Barba longa" }
      ],
      top: [
        { id: "tee", label: "Camiseta" },
        { id: "stripes", label: "Listrada" },
        { id: "polo", label: "Polo" },
        { id: "shirt", label: "Camisa social" },
        { id: "tie", label: "Camisa e gravata" },
        { id: "hoodie", label: "Moletom" },
        { id: "sweater", label: "Su\xE9ter" },
        { id: "tank", label: "Regata" },
        { id: "dress", label: "Vestido" },
        { id: "jersey", label: "Camisa de time" },
        { id: "jersey_hoops", label: "Camisa de time listrada" },
        { id: "jersey_stripes", label: "Camisa de time listras em p\xE9" },
        { id: "jersey_sash", label: "Camisa de time com faixa" },
        { id: "basketball", label: "Regata de basquete" },
        { id: "raglan", label: "Camiseta esportiva" },
        { id: "box_tee", label: "Camiseta com estampa" },
        { id: "graphic_tee", label: "Camiseta com desenho" },
        { id: "longsleeve", label: "Manga longa" }
      ],
      jacket: [
        { id: "none", label: "Nenhuma" },
        { id: "blazer", label: "Blazer" },
        { id: "flannel", label: "Xadrez aberta" },
        { id: "bomber", label: "Jaqueta" },
        { id: "coat", label: "Sobretudo" },
        { id: "vest", label: "Colete" },
        { id: "track", label: "Jaqueta esportiva" },
        { id: "windbreaker", label: "Corta-vento" },
        { id: "puffer", label: "Puffer" },
        { id: "varsity", label: "Jaqueta college" },
        { id: "denim", label: "Jaqueta jeans" }
      ],
      bottom: [
        { id: "pants", label: "Cal\xE7a" },
        { id: "jeans", label: "Jeans" },
        { id: "joggers", label: "Moletom" },
        { id: "shorts", label: "Bermuda" },
        { id: "skirt", label: "Saia" },
        { id: "track_pants", label: "Cal\xE7a esportiva" },
        { id: "cargo", label: "Cargo" },
        { id: "sport_shorts", label: "Short esportivo" }
      ],
      shoes: [
        { id: "sneakers", label: "T\xEAnis" },
        { id: "boots", label: "Botas" },
        { id: "dress", label: "Sapato social" },
        { id: "sandals", label: "Sand\xE1lias" },
        { id: "high_tops", label: "T\xEAnis cano alto" },
        { id: "runners", label: "T\xEAnis de corrida" },
        { id: "slides", label: "Chinelo slide" },
        { id: "cleats", label: "Chuteira" }
      ],
      eyewear: [
        { id: "none", label: "Nenhum" },
        { id: "glasses", label: "\xD3culos" },
        { id: "round", label: "\xD3culos redondos" },
        { id: "sunglasses", label: "\xD3culos escuros" },
        { id: "juliet", label: "Juliet (Oakley)" },
        { id: "sport", label: "Esportivo espelhado" },
        { id: "sport_shield", label: "Esportivo meia-arma\xE7\xE3o" }
      ],
      accessory: [
        { id: "none", label: "Nenhum" },
        { id: "cap", label: "Bon\xE9" },
        { id: "beanie", label: "Gorro" },
        { id: "headphones", label: "Fone" },
        { id: "bucket", label: "Bucket" },
        { id: "snapback", label: "Bon\xE9 aba reta" },
        { id: "cap_back", label: "Bon\xE9 para tr\xE1s" },
        { id: "headband", label: "Faixa de cabe\xE7a" }
      ]
    };
    SKIN_TONES = ["#f8dcc2", "#f1c9a5", "#e2ad84", "#c98e62", "#a8714a", "#87563a", "#663f29", "#4a2d1e"];
    HAIR_COLORS = ["#1f1a17", "#3b2a20", "#5a3a26", "#8a5a33", "#b07a45", "#d4a24c", "#ead39a", "#b5483f", "#e07a3a", "#8d949c", "#e9e6e1", "#4a5fa8", "#d77aa8", "#5aa469"];
    CLOTH_COLORS = [
      "#f4f1ea",
      "#c9c4bb",
      "#6b7280",
      "#2b2f36",
      "#1c1917",
      "#3f6fb5",
      "#2f4f6f",
      "#7fb3d5",
      "#4f8c88",
      "#5aa469",
      "#40594a",
      "#d6a33f",
      "#e07a3a",
      "#b8603f",
      "#d9534f",
      "#a3324a",
      "#f08aa6",
      "#7a5aa8",
      "#8a5a3c",
      "#c9a27a"
    ];
    LENS_COLORS = ["#ff6a13", "#ffb020", "#f5d90a", "#22c55e", "#14b8a6", "#38bdf8", "#2563eb", "#8b5cf6", "#e11d48", "#ec4899", "#cbd5e1", "#111827"];
    COLOR_SETS = {
      hair: HAIR_COLORS,
      facialHair: HAIR_COLORS,
      top: CLOTH_COLORS,
      jacket: CLOTH_COLORS,
      bottom: CLOTH_COLORS,
      shoes: CLOTH_COLORS,
      eyewear: [...LENS_COLORS, ...CLOTH_COLORS.filter((c) => !LENS_COLORS.includes(c))],
      accessory: CLOTH_COLORS
    };
    DEFAULT_APPEARANCE = {
      v: 2,
      skin: SKIN_TONES[1],
      hair: { style: "short", color: HAIR_COLORS[2] },
      facialHair: { style: "none", color: HAIR_COLORS[2] },
      top: { style: "tee", color: "#3f6fb5" },
      jacket: { style: "none", color: "#2b2f36" },
      bottom: { style: "jeans", color: "#2f4f6f" },
      shoes: { style: "sneakers", color: "#f4f1ea" },
      eyewear: { style: "none", color: "#2b2f36" },
      accessory: { style: "none", color: "#2b2f36" }
    };
    HEX = /^#[0-9a-f]{6}$/i;
    LEGACY_HAIR = ["short", "long", "bun", "curly", "buzz", "ponytail"];
    sanitizeAppearance = normalizeAppearance;
  }
});

// server/logic.ts
var logic_exports = {};
__export(logic_exports, {
  DEFAULT_APPEARANCE: () => DEFAULT_APPEARANCE,
  commitStep: () => commitStep,
  createPlayer: () => createPlayer,
  deskSpots: () => deskSpots,
  nearbyRecipients: () => nearbyRecipients,
  publicState: () => publicState,
  rebuildWorld: () => rebuildWorld,
  sanitizeAppearance: () => sanitizeAppearance,
  sanitizeDir: () => sanitizeDir,
  sanitizeName: () => sanitizeName,
  sanitizeStatus: () => sanitizeStatus,
  validateMove: () => validateMove,
  world: () => world
});
function rebuildWorld() {
  world = new OfficeWorld(getOfficeLayout());
  deskSpots = buildDeskSpots(world.layout);
}
function sanitizeName(name) {
  const s = typeof name === "string" ? name : "";
  return s.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 24) || "Visitante";
}
function sanitizeStatus(s, fallback = "available") {
  return STATUSES.includes(s) ? s : fallback;
}
function sanitizeDir(d) {
  return DIRS.includes(d) ? d : null;
}
function createPlayer(id, profile, saved) {
  const spawn = world.layout.spawn;
  const appearance = normalizeAppearance(profile.appearance);
  const x = saved?.x ?? spawn.x;
  const y = saved?.y ?? spawn.y;
  const ok = world.isWalkable(x, y);
  return {
    id,
    profileId: typeof profile.profileId === "string" ? profile.profileId.slice(0, 64) : id,
    name: sanitizeName(profile.name),
    appearance,
    status: sanitizeStatus(profile.status),
    x: ok ? x : spawn.x,
    y: ok ? y : spawn.y,
    dir: "up",
    lastStepAt: 0,
    stepTokens: STEP_BURST
  };
}
function validateMove(p, x, y, now, claims = {}, isAdmin = false) {
  if (!Number.isInteger(x) || !Number.isInteger(y)) return { ok: false, reason: "bad-input" };
  const nx = x;
  const ny = y;
  if (!stepIsAdjacent(p.x, p.y, nx, ny)) return { ok: false, reason: "not-adjacent" };
  if (!world.isWalkable(nx, ny)) return { ok: false, reason: "blocked" };
  if (!isAdmin && blockedByDesk(deskSpots, claims, p.profileId, p.x, p.y, nx, ny)) return { ok: false, reason: "locked" };
  const tokens = Math.min(STEP_BURST, p.stepTokens + (now - p.lastStepAt) / MIN_STEP_INTERVAL_MS);
  if (tokens < 1) return { ok: false, reason: "too-fast" };
  return { ok: true };
}
function commitStep(p, now) {
  p.stepTokens = Math.min(STEP_BURST, p.stepTokens + (now - p.lastStepAt) / MIN_STEP_INTERVAL_MS) - 1;
  p.lastStepAt = now;
}
function nearbyRecipients(from, all2) {
  const fz = world.zoneAt(from.x, from.y);
  const out2 = [];
  for (const p of all2) {
    if (p.id === from.id) continue;
    const pz = world.zoneAt(p.x, p.y);
    const sameRoom = !!fz && !!pz && fz.id === pz.id && (fz.kind === "meeting" || fz.kind === "office");
    if (sameRoom || chebyshev(p.x, p.y, from.x, from.y) <= PROXIMITY_RADIUS + 1) out2.push(p);
  }
  return out2;
}
function publicState(p) {
  const { lastStepAt: _a, stepTokens: _b, ...rest } = p;
  return rest;
}
var world, deskSpots, DIRS, STATUSES, STEP_BURST;
var init_logic = __esm({
  "server/logic.ts"() {
    "use strict";
    init_constants();
    init_officeLayout();
    init_world();
    init_desks();
    init_appearance();
    world = new OfficeWorld(getOfficeLayout());
    deskSpots = buildDeskSpots(world.layout);
    DIRS = ["up", "down", "left", "right"];
    STATUSES = ["available", "busy", "away"];
    STEP_BURST = 6;
  }
});

// server/index.ts
import { createServer as createHttp } from "node:http";
import { createServer as createHttps } from "node:https";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { networkInterfaces } from "node:os";
import { extname, join, normalize, resolve } from "node:path";

// ../../../opt/npm-tools/node_modules/ws/wrapper.mjs
var import_stream = __toESM(require_stream(), 1);
var import_extension = __toESM(require_extension(), 1);
var import_permessage_deflate = __toESM(require_permessage_deflate(), 1);
var import_receiver = __toESM(require_receiver(), 1);
var import_sender = __toESM(require_sender(), 1);
var import_subprotocol = __toESM(require_subprotocol(), 1);
var import_websocket = __toESM(require_websocket(), 1);
var import_websocket_server = __toESM(require_websocket_server(), 1);

// server/index.ts
init_officeLayout();

// shared/admin.ts
init_furniture();
init_officeLayout();

// shared/map/mapEdit.ts
init_furniture();
init_footprint();
init_officeLayout();
var ZONE_KINDS = ["meeting", "office", "workspace", "lounge", "cafe", "reception", "library", "corridor"];
var FLOORS = /* @__PURE__ */ new Set(["void", "wall", "glass", "wood", "parquet", "carpetBlue", "carpetGreen", "carpetRed", "stone", "checker", "marble", "concrete", "grass", "carpetPurple", "darkwood"]);
var int = (v) => typeof v === "number" && Number.isFinite(v) ? Math.round(v) : NaN;
function normRect(r, W, H) {
  const o = r ?? {};
  const xs = [int(o.x0), int(o.x1)];
  const ys = [int(o.y0), int(o.y1)];
  if ([...xs, ...ys].some(Number.isNaN)) return null;
  const x0 = Math.max(0, Math.min(...xs));
  const x1 = Math.min(W - 1, Math.max(...xs));
  const y0 = Math.max(0, Math.min(...ys));
  const y1 = Math.min(H - 1, Math.max(...ys));
  if (x0 > x1 || y0 > y1) return null;
  return { x0, y0, x1, y1 };
}
var inRect = (r, x, y) => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1;
var zoneRect = (z) => ({ x0: z.x, y0: z.y, x1: z.x + z.w - 1, y1: z.y + z.h - 1 });
var grow = (r, n) => ({ x0: r.x0 - n, y0: r.y0 - n, x1: r.x1 + n, y1: r.y1 + n });
var overlap = (a, b) => a.x0 <= b.x1 && b.x0 <= a.x1 && a.y0 <= b.y1 && b.y0 <= a.y1;
var isWall = (k) => !k || WALL_KINDS.has(k);
function floorFitError(layer2, size, at) {
  for (let ly = 0; ly < size.h; ly++) {
    for (let lx = 0; lx < size.w; lx++) {
      const k = at(lx, ly);
      if (k === void 0) return "Fora do mapa.";
      if (layer2 === "wall") {
        if (!WALL_KINDS.has(k) || k === "void") return "Este item s\xF3 pode ficar em uma parede.";
        continue;
      }
      if (!WALL_KINDS.has(k)) continue;
      const base2 = ly === size.h - 1;
      if (layer2 === "floor" || base2 || k === "void") return "N\xE3o d\xE1 para colocar em cima de parede.";
    }
  }
  return null;
}
function placementRect(p) {
  const d = sizeOf(p);
  return { x0: p.x, y0: p.y, x1: p.x + d.w - 1, y1: p.y + d.h - 1 };
}
function commonFloor(floor, tiles, fallback = "wood") {
  const count = /* @__PURE__ */ new Map();
  for (const [x, y] of tiles) {
    const k = floor[y]?.[x];
    if (k && !isWall(k)) count.set(k, (count.get(k) ?? 0) + 1);
  }
  let best = fallback;
  let n = 0;
  for (const [k, c] of count) if (c > n) best = k, n = c;
  return best;
}
function ring(r) {
  const out2 = [];
  for (let x = r.x0; x <= r.x1; x++) out2.push([x, r.y0], [x, r.y1]);
  for (let y = r.y0 + 1; y < r.y1; y++) out2.push([r.x0, y], [r.x1, y]);
  return out2;
}
function tilesOf(r) {
  const out2 = [];
  for (let y = r.y0; y <= r.y1; y++) for (let x = r.x0; x <= r.x1; x++) out2.push([x, y]);
  return out2;
}
var clone = (s) => ({
  placements: s.placements.map((p) => ({ ...p })),
  floor: s.floor.map((row) => [...row]),
  zones: s.zones.map((z) => ({ ...z, entry: { ...z.entry } })),
  doors: s.doors.map((d) => ({ ...d })),
  lights: s.lights.map((l) => ({ ...l }))
});
function entryFor(s, z) {
  const outer = grow(z, 1);
  for (const d of s.doors) {
    if (!ring(outer).some(([x, y]) => x === d.x && y === d.y)) continue;
    if (d.y === outer.y1) return { x: d.x, y: d.y + 1 };
    if (d.y === outer.y0) return { x: d.x, y: d.y - 1 };
    if (d.x === outer.x0) return { x: d.x - 1, y: d.y };
    return { x: d.x + 1, y: d.y };
  }
  return { x: z.x0 + z.x1 >> 1, y: z.y0 + z.y1 >> 1 };
}
function dropInvalid(s) {
  const before = s.placements.length;
  s.placements = s.placements.filter((p) => {
    const def = furnitureDef(p.key);
    return !floorFitError(def.layer, sizeOf(p), (lx, ly) => s.floor[p.y + ly]?.[p.x + lx]);
  });
  return before - s.placements.length;
}
var seq = 0;
var newId = (p) => `${p}-${Date.now().toString(36)}${(seq++).toString(36)}`;
function applyMapOp(layout, raw) {
  const W = layout.width;
  const H = layout.height;
  const s0 = { placements: layout.placements, floor: layout.floor, zones: layout.zones, doors: layout.doors, lights: layout.lights };
  const op = raw ?? {};
  const fail = (error) => ({ state: s0, error });
  const s = clone(s0);
  switch (op.op) {
    case "paint": {
      const r = normRect(op.rect, W, H);
      if (!r) return fail("\xC1rea inv\xE1lida.");
      if (op.brush !== "door" && !FLOORS.has(op.brush)) return fail("Piso desconhecido.");
      const tiles = op.outline ? ring(r) : tilesOf(r);
      if (tiles.length > W * H) return fail("\xC1rea grande demais.");
      for (const [x, y] of tiles) {
        if (op.brush === "door") {
          const around = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
          s.floor[y][x] = commonFloor(s.floor, around, "wood");
          if (!s.doors.some((d) => d.x === x && d.y === y)) s.doors.push({ x, y });
        } else {
          s.floor[y][x] = op.brush;
          s.doors = s.doors.filter((d) => d.x !== x || d.y !== y);
        }
      }
      const dropped = dropInvalid(s);
      return { state: s, note: dropped ? `${dropped} m\xF3vel(is) em lugar imposs\xEDvel foram removidos.` : void 0 };
    }
    case "region": {
      const r = normRect(op.rect, W, H);
      const dx = int(op.dx);
      const dy = int(op.dy);
      if (!r || Number.isNaN(dx) || Number.isNaN(dy)) return fail("\xC1rea inv\xE1lida.");
      if (!dx && !dy) return { state: s0 };
      const dst = { x0: r.x0 + dx, y0: r.y0 + dy, x1: r.x1 + dx, y1: r.y1 + dy };
      if (dst.x0 < 0 || dst.y0 < 0 || dst.x1 >= W || dst.y1 >= H) return fail("Chegou na borda do mapa.");
      const outside = ring(grow(r, 1)).filter(([x, y]) => x >= 0 && y >= 0 && x < W && y < H);
      const fill = commonFloor(s0.floor, outside, "wood");
      const copy = tilesOf(r).map(([x, y]) => [x, y, s0.floor[y][x]]);
      for (const [x, y] of tilesOf(r)) s.floor[y][x] = fill;
      for (const [x, y, k] of copy) s.floor[y + dy][x + dx] = k;
      const movedDoors = /* @__PURE__ */ new Set();
      s.doors = s.doors.filter((d) => !inRect(dst, d.x, d.y) || inRect(r, d.x, d.y)).map((d) => {
        if (!inRect(r, d.x, d.y)) return d;
        movedDoors.add(`${d.x + dx},${d.y + dy}`);
        return { x: d.x + dx, y: d.y + dy };
      });
      const inside = (q) => q.x0 >= r.x0 && q.x1 <= r.x1 && q.y0 >= r.y0 && q.y1 <= r.y1;
      s.placements = s.placements.map((p) => inside(placementRect(p)) ? { ...p, x: p.x + dx, y: p.y + dy } : p);
      s.zones = s.zones.map((z) => inside(zoneRect(z)) ? { ...z, x: z.x + dx, y: z.y + dy, entry: { x: z.entry.x + dx, y: z.entry.y + dy } } : z);
      s.lights = s.lights.map((l) => inRect(r, Math.floor(l.x), Math.floor(l.y)) ? { ...l, x: l.x + dx, y: l.y + dy } : l);
      const dropped = dropInvalid(s);
      return { state: s, note: dropped ? `${dropped} m\xF3vel(is) que ficaram em cima de parede foram removidos.` : void 0 };
    }
    case "room":
    case "resizeRoom": {
      const outer = normRect(op.rect, W, H);
      if (!outer) return fail("\xC1rea inv\xE1lida.");
      if (outer.x1 - outer.x0 < 3 || outer.y1 - outer.y0 < 3) return fail("A sala precisa ter pelo menos 2\xD72 por dentro.");
      const inner = grow(outer, -1);
      const target = op.op === "resizeRoom" ? s.zones.find((z) => z.id === op.id) : void 0;
      if (op.op === "resizeRoom" && !target) return fail("Sala n\xE3o encontrada.");
      const blocking = s.zones.filter((z) => z !== target && (z.kind === "meeting" || z.kind === "office") && overlap(zoneRect(z), grow(inner, 1)) && overlap(zoneRect(z), inner));
      if (blocking.length) return fail(`Encostaria em "${blocking[0].name}". Escolha outro lugar.`);
      let floorKind = op.op === "room" && FLOORS.has(op.floor) && !isWall(op.floor) ? op.floor : "wood";
      let doorSide = "bottom";
      let doorWidth = 1;
      if (target) {
        const oldInner = zoneRect(target);
        const oldOuter = grow(oldInner, 1);
        floorKind = commonFloor(s.floor, tilesOf(oldInner), "wood");
        const oldDoors = s.doors.filter((d) => ring(oldOuter).some(([x, y]) => x === d.x && y === d.y));
        if (oldDoors.length) {
          const d = oldDoors[0];
          doorSide = d.y === oldOuter.y1 ? "bottom" : d.y === oldOuter.y0 ? "top" : d.x === oldOuter.x0 ? "left" : "right";
          doorWidth = Math.min(3, oldDoors.filter((q) => doorSide === "bottom" || doorSide === "top" ? q.y === d.y : q.x === d.x).length);
        }
        const outsideFloor = commonFloor(s.floor, ring(grow(oldOuter, 1)).filter(([x, y]) => x >= 0 && y >= 0 && x < W && y < H), "wood");
        const otherInteriors = s.zones.filter((z) => z !== target && z.kind !== "corridor").map(zoneRect);
        for (const [x, y] of ring(oldOuter)) {
          if (x <= 0 || y <= 0 || x >= W - 1 || y >= H - 1) continue;
          const touchesOther = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].some(([nx, ny]) => otherInteriors.some((o) => inRect(o, nx, ny)));
          if (!touchesOther) s.floor[y][x] = outsideFloor;
        }
        for (const [x, y] of tilesOf(oldInner)) s.floor[y][x] = outsideFloor;
        s.doors = s.doors.filter((d) => !inRect(oldOuter, d.x, d.y));
        s.lights = s.lights.filter((l) => !inRect(oldOuter, Math.floor(l.x), Math.floor(l.y)));
      }
      for (const [x, y] of tilesOf(inner)) s.floor[y][x] = floorKind;
      for (const [x, y] of ring(outer)) s.floor[y][x] = "wall";
      s.doors = s.doors.filter((d) => !inRect(outer, d.x, d.y));
      const horiz = doorSide === "bottom" || doorSide === "top";
      const span = horiz ? inner.x1 - inner.x0 + 1 : inner.y1 - inner.y0 + 1;
      const n = Math.min(doorWidth, span);
      const start = (horiz ? inner.x0 : inner.y0) + Math.floor((span - n) / 2);
      for (let i = 0; i < n; i++) {
        const x = horiz ? start + i : doorSide === "left" ? outer.x0 : outer.x1;
        const y = horiz ? doorSide === "top" ? outer.y0 : outer.y1 : start + i;
        s.floor[y][x] = floorKind;
        s.doors.push({ x, y });
      }
      const rect = { x: inner.x0, y: inner.y0, w: inner.x1 - inner.x0 + 1, h: inner.y1 - inner.y0 + 1 };
      const light = { x: inner.x0 + rect.w / 2, y: inner.y0 + rect.h / 2, r: Math.max(3, Math.min(6, Math.max(rect.w, rect.h) / 2)), warm: target?.kind === "office" || op.op === "room" && op.kind === "office" };
      s.lights.push(light);
      if (target) {
        Object.assign(s.zones.find((z2) => z2.id === target.id), rect);
        const z = s.zones.find((q) => q.id === target.id);
        z.entry = entryFor(s, inner);
      } else {
        const kind = ZONE_KINDS.includes(op.kind) ? op.kind : "meeting";
        const name = String(op.name ?? "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 32) || "Nova sala";
        const z = { id: newId("sala"), name, kind, ...rect, entry: { x: 0, y: 0 }, capacity: kind === "meeting" ? 10 : void 0 };
        z.entry = entryFor(s, inner);
        s.zones.unshift(z);
      }
      const dropped = dropInvalid(s);
      return { state: s, note: dropped ? `${dropped} m\xF3vel(is) que ficaram em cima de parede foram removidos.` : void 0 };
    }
    case "deleteRoom": {
      const z = s.zones.find((q) => q.id === op.id);
      if (!z) return fail("Sala n\xE3o encontrada.");
      const inner = zoneRect(z);
      const outer = grow(inner, 1);
      if (z.kind !== "corridor" && z.kind !== "workspace" && z.kind !== "lounge") {
        const fill = commonFloor(s.floor, tilesOf(inner), "wood");
        const others = s.zones.filter((q) => q !== z && q.kind !== "corridor").map(zoneRect);
        for (const [x, y] of ring(outer)) {
          if (x <= 0 || y <= 0 || x >= W - 1 || y >= H - 1) continue;
          const touchesOther = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].some(([nx, ny]) => others.some((o) => inRect(o, nx, ny)));
          if (!touchesOther) s.floor[y][x] = fill;
        }
        s.doors = s.doors.filter((d) => !ring(outer).some(([x, y]) => x === d.x && y === d.y) || false);
      }
      s.zones = s.zones.filter((q) => q !== z);
      const dropped = dropInvalid(s);
      return { state: s, note: dropped ? `${dropped} m\xF3vel(is) de parede foram removidos.` : void 0 };
    }
    default:
      return fail("Opera\xE7\xE3o inv\xE1lida.");
  }
}

// shared/admin.ts
init_footprint();
init_deskItems();
init_seats();
var DEFAULT_CONFIG = { appName: "Via Adventure", zones: {} };
var clean = (s, max) => typeof s === "string" ? s.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max) : void 0;
function applyConfigPatch(cfg, patch, zoneIds) {
  const p = patch ?? {};
  const next = { appName: cfg.appName, zones: { ...cfg.zones } };
  const name = clean(p.appName, 32);
  if (name) next.appName = name;
  if (p.zones && typeof p.zones === "object") {
    for (const [id, z] of Object.entries(p.zones)) {
      if (!zoneIds.includes(id) || !z) continue;
      const cur = { ...next.zones[id] };
      const n = clean(z.name, 32);
      const o = clean(z.owner, 32);
      if (n !== void 0) cur.name = n || void 0;
      if (o !== void 0) cur.owner = o || void 0;
      next.zones[id] = cur;
    }
  }
  return next;
}
var offset = (v) => Number.isInteger(v) && Math.abs(v) < 32 ? v : 0;
var withOffsets = (p, ox, oy) => ({ ...p, ox: offset(ox) || void 0, oy: offset(oy) || void 0 });
function swappable(from, to) {
  if (typeof to !== "string" || !(to in FURNITURE)) return false;
  const a = furnitureDef(from);
  const b = furnitureDef(to);
  return a.w === b.w && a.h === b.h && a.layer === b.layer;
}
function turnChair(p) {
  const m = /^(.*)_(up|down|side)$/.exec(p.key);
  if (!m) return null;
  const has = (k) => k in FURNITURE;
  const [, stem, dir] = m;
  const facing = dir === "side" ? p.flip ? "left" : "right" : dir;
  const order = ["down", "left", "up", "right"];
  for (let i = 1; i <= 4; i++) {
    const next = order[(order.indexOf(facing) + i) % 4];
    const key = next === "left" || next === "right" ? `${stem}_side` : `${stem}_${next}`;
    if (has(key)) return { key, flip: next === "left" || void 0 };
  }
  return null;
}
function fits(layout, key, x, y, rot = 0) {
  const def = furnitureDef(key);
  if (rot % 2 && def.layer === "wall") return "Itens de parede n\xE3o giram.";
  return floorFitError(def.layer, sizeOf({ key, rot }), (lx, ly) => layout.floor[y + ly]?.[x + lx]);
}
var seq2 = 0;
var isLowSeat = (p) => {
  const d = furnitureDef(p.key);
  return d.layer === "low" && d.w === 1 && d.h === 1 && isSeatKey(p.key);
};
function settleSeats(layout, placements) {
  const W = layout.width;
  const H = layout.height;
  const blocked = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (WALL_KINDS.has(layout.floor[y]?.[x])) blocked[y * W + x] = 1;
  for (const p of placements) {
    if (isLowSeat(p)) continue;
    const { w, h } = sizeOf(p);
    for (let ly = 0; ly < h; ly++) for (let lx = 0; lx < w; lx++) if (solidAt(p, lx, ly) && p.x + lx < W && p.y + ly < H) blocked[(p.y + ly) * W + p.x + lx] = 1;
  }
  const clamp2 = (v) => Math.max(-31, Math.min(31, v));
  let changed = false;
  const out2 = placements.map((p) => {
    if (!isLowSeat(p) || !blocked[p.y * W + p.x]) return p;
    const oy = p.oy ?? 0;
    const ox = p.ox ?? 0;
    const order = [
      [0, oy < 0 ? -1 : 1],
      [0, oy < 0 ? 1 : -1],
      [ox < 0 ? -1 : 1, 0],
      [ox < 0 ? 1 : -1, 0]
    ];
    for (const [dx, dy] of order) {
      const nx = p.x + dx;
      const ny = p.y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H || blocked[ny * W + nx]) continue;
      changed = true;
      return { ...p, x: nx, y: ny, ox: clamp2(ox - dx * 32) || void 0, oy: clamp2(oy - dy * 32) || void 0 };
    }
    return p;
  });
  return changed ? out2 : placements;
}
function applyLayoutOp(layout, base2, op) {
  const r = applyLayoutOpRaw(layout, base2, op);
  if (r.error) return r;
  return { ...r, state: { ...r.state, placements: settleSeats({ width: layout.width, height: layout.height, floor: r.state.floor }, r.state.placements) } };
}
function applyLayoutOpRaw(layout, base2, op) {
  const o = op ?? {};
  const state = { placements: layout.placements, floor: layout.floor, zones: layout.zones, doors: layout.doors, lights: layout.lights };
  if (o.op === "reset") return { state: { placements: base2.placements.map((p) => ({ ...p })), floor: base2.floor, zones: base2.zones, doors: base2.doors, lights: base2.lights } };
  if (o.op === "paint" || o.op === "region" || o.op === "room" || o.op === "resizeRoom" || o.op === "deleteRoom") return applyMapOp(layout, o);
  const r = applyFurnitureOp(layout, o);
  return { state: { ...state, placements: r.placements }, error: r.error };
}
function applyFurnitureOp(layout, op) {
  const o = op ?? {};
  const list = layout.placements;
  const int2 = (v) => Number.isInteger(v) ? v : NaN;
  switch (o.op) {
    case "add": {
      if (!(o.key in FURNITURE)) return { placements: list, error: "M\xF3vel desconhecido." };
      const x = int2(o.x);
      const y = int2(o.y);
      const rot = canRotate(o.key) ? rotOf({ rot: int2(o.rot) || 0 }) : 0;
      const err = fits(layout, o.key, x, y, rot);
      if (err) return { placements: list, error: err };
      const id = `${o.key}-n${Date.now().toString(36)}${(seq2++).toString(36)}`;
      const added = withOffsets({ id, key: o.key, x, y, flip: !!o.flip || void 0, rot: rot || void 0 }, o.ox, o.oy);
      return { placements: [...list, added, ...defaultDeskItems(added)] };
    }
    case "move": {
      const p = list.find((q) => q.id === o.id);
      if (!p) return { placements: list, error: "M\xF3vel n\xE3o encontrado." };
      const x = int2(o.x);
      const y = int2(o.y);
      const err = fits(layout, p.key, x, y, rotOf(p));
      if (err) return { placements: list, error: err };
      const to = withOffsets({ ...p, x, y }, o.ox, o.oy);
      return { placements: carries(p) ? carryDeskItems(list, p, to).map((q) => q.id === p.id ? to : q) : list.map((q) => q.id === p.id ? to : q) };
    }
    case "rotate": {
      const p = list.find((q) => q.id === o.id);
      if (!p) return { placements: list, error: "M\xF3vel n\xE3o encontrado." };
      const chair = turnChair(p);
      if (chair) return { placements: list.map((q) => q === p ? { ...q, key: chair.key, flip: chair.flip } : q) };
      if (!canRotate(p.key)) return { placements: list, error: "Itens de parede n\xE3o giram." };
      const rot = (rotOf(p) + 1) % 4;
      const err = fits(layout, p.key, p.x, p.y, rot);
      if (err) return { placements: list, error: `N\xE3o cabe girado aqui: ${err}` };
      const to = { ...p, rot: rot || void 0 };
      return { placements: (carries(p) ? carryDeskItems(list, p, to) : list).map((q) => q.id === p.id ? to : q) };
    }
    case "swap": {
      const p = list.find((q) => q.id === o.id);
      if (!p) return { placements: list, error: "M\xF3vel n\xE3o encontrado." };
      if (!swappable(p.key, o.key)) return { placements: list, error: "Esse item n\xE3o cabe no lugar deste." };
      return { placements: list.map((q) => q.id === p.id ? { ...q, key: o.key } : q) };
    }
    case "flip":
      return { placements: list.map((q) => q.id === o.id ? { ...q, flip: !q.flip || void 0 } : q) };
    case "remove": {
      const p = list.find((q) => q.id === o.id);
      if (!p) return { placements: list };
      const gone = /* @__PURE__ */ new Set([p.id, ...carries(p) ? itemsOnDesk(list, p).map((q) => q.id) : []]);
      return { placements: list.filter((q) => !gone.has(q.id)) };
    }
    default:
      return { placements: list, error: "Opera\xE7\xE3o inv\xE1lida." };
  }
}
var carries = (p) => furnitureDef(p.key).layer === "object";

// shared/map/tiled.ts
init_furniture();
var FLOOR_TILE_IDS = ["void", "wall", "glass", "wood", "parquet", "carpetBlue", "carpetGreen", "carpetRed", "stone", "checker"];
function props(o) {
  return Object.fromEntries((o.properties ?? []).map((p) => [p.name, p.value]));
}
function importTiledMap(map) {
  const tw = map.tilewidth;
  const floorLayer = map.layers.find((l) => l.type === "tilelayer" && l.name === "piso");
  if (!floorLayer?.data) throw new Error('Mapa Tiled sem a camada de tiles "piso"');
  const floor = [];
  for (let y = 0; y < map.height; y++) {
    floor.push([]);
    for (let x = 0; x < map.width; x++) floor[y].push(FLOOR_TILE_IDS[(floorLayer.data[y * map.width + x] || 1) - 1] ?? "void");
  }
  const group = (name) => map.layers.find((l) => l.type === "objectgroup" && l.name === name)?.objects ?? [];
  const placements = group("moveis").filter((o) => String(props(o).key ?? o.type) in FURNITURE).map((o, i) => {
    const pr = props(o);
    return {
      id: `${String(pr.key ?? o.type)}-${i}`,
      key: String(pr.key ?? o.type),
      x: Math.round(o.x / tw),
      y: Math.round(o.y / tw),
      flip: pr.flip === true || void 0,
      label: typeof pr.label === "string" ? pr.label : void 0
    };
  });
  const zones = group("zonas").map((o) => {
    const pr = props(o);
    return {
      id: String(pr.id ?? o.name),
      name: o.name,
      kind: String(pr.kind ?? "workspace"),
      owner: typeof pr.owner === "string" ? pr.owner : void 0,
      capacity: typeof pr.capacity === "number" ? pr.capacity : void 0,
      x: Math.round(o.x / tw),
      y: Math.round(o.y / tw),
      w: Math.round(o.width / tw),
      h: Math.round(o.height / tw),
      entry: { x: Number(pr.entryX ?? Math.round(o.x / tw)), y: Number(pr.entryY ?? Math.round(o.y / tw)) }
    };
  });
  const lights = group("luzes").map((o) => {
    const pr = props(o);
    return { x: o.x / tw, y: o.y / tw, r: Number(pr.radius ?? 4), warm: pr.warm === true };
  });
  const doors = group("portas").map((o) => ({ x: Math.round(o.x / tw), y: Math.round(o.y / tw) }));
  const mp = props(map);
  return {
    width: map.width,
    height: map.height,
    floor,
    placements,
    zones,
    doors,
    lights,
    spawn: { x: Number(mp.spawnX ?? 1), y: Number(mp.spawnY ?? 1) }
  };
}

// server/index.ts
init_desks();

// shared/map/deskDecor.ts
init_desks();
init_seats();
init_footprint();
init_deskItems();
init_furniture();
var MAX_DESK_ITEMS = 20;
function myDesk(spots, claims, profileId) {
  const claim = Object.values(claims).find((c) => c.ownerId === profileId);
  return claim ? spots.find((s) => s.id === claim.spotId) ?? null : null;
}
function onDesk(spot, key, x, y, ox = 0, oy = 0, rot = 0) {
  const d = sizeOf({ key, rot });
  const cx = x * 32 + ox + d.w * 16;
  const cy = y * 32 + oy + d.h * 16 + 4;
  return cx >= spot.desk.x * 32 && cx < (spot.desk.x + spot.desk.w) * 32 && cy >= spot.desk.y * 32 && cy < (spot.desk.y + spot.desk.h) * 32;
}
var isDeskItem = (key) => key in FURNITURE && furnitureDef(key).layer === "top";
function canEditDeskItem(spot, p, profileId) {
  if (!isDeskItem(p.key)) return false;
  if (p.owner) return p.owner === profileId;
  return onDesk(spot, p.key, p.x, p.y, p.ox, p.oy, p.rot);
}
var seq3 = 0;
function applyDeskDecor(placements, spots, claims, profileId, raw) {
  const op = raw ?? {};
  const spot = myDesk(spots, claims, profileId);
  if (!spot) return { placements, error: "Reivindique uma mesa para poder decorar." };
  const int2 = (v) => Number.isInteger(v) ? v : NaN;
  const mine = (id) => placements.find((p) => p.id === id && canEditDeskItem(spot, p, profileId));
  switch (op.op) {
    case "add": {
      if (!isDeskItem(op.key)) return { placements, error: "S\xF3 objetos de mesa podem ir em cima da mesa." };
      const x = int2(op.x);
      const y = int2(op.y);
      const ox = offset(op.ox);
      const oy = offset(op.oy);
      const rot = ((Number.isInteger(op.rot) ? op.rot : 0) % 4 + 4) % 4;
      if (!onDesk(spot, op.key, x, y, ox, oy, rot)) return { placements, error: "Coloque em cima da sua mesa." };
      if (placements.filter((p) => p.owner === profileId).length >= MAX_DESK_ITEMS) return { placements, error: `Limite de ${MAX_DESK_ITEMS} objetos por mesa.` };
      const id = `${op.key}-d${Date.now().toString(36)}${(seq3++).toString(36)}`;
      return { placements: [...placements, { id, key: op.key, x, y, ox: ox || void 0, oy: oy || void 0, owner: profileId, flip: op.flip || void 0, rot: rot || void 0 }] };
    }
    case "move": {
      const p = mine(op.id);
      if (!p) return { placements, error: "Esse objeto n\xE3o \xE9 seu." };
      const x = int2(op.x);
      const y = int2(op.y);
      const ox = offset(op.ox);
      const oy = offset(op.oy);
      if (!onDesk(spot, p.key, x, y, ox, oy, p.rot)) return { placements, error: "Tem que ficar em cima da sua mesa." };
      return { placements: placements.map((q) => q === p ? { ...q, x, y, ox: ox || void 0, oy: oy || void 0 } : q) };
    }
    case "swap": {
      const p = mine(op.id);
      if (!p) return { placements, error: "Esse objeto n\xE3o \xE9 seu." };
      if (!swappable(p.key, op.key)) return { placements, error: "N\xE3o d\xE1 para trocar por esse item." };
      return { placements: placements.map((q) => q === p ? { ...q, key: op.key } : q) };
    }
    case "rotate": {
      const p = mine(op.id);
      if (!p) return { placements, error: "Esse objeto n\xE3o \xE9 seu." };
      const rot = ((p.rot ?? 0) + 1) % 4;
      if (!onDesk(spot, p.key, p.x, p.y, p.ox, p.oy, rot)) return { placements, error: "Girado n\xE3o cabe em cima da mesa." };
      return { placements: placements.map((q) => q === p ? { ...q, rot: rot || void 0 } : q) };
    }
    case "flip": {
      const p = mine(op.id);
      if (!p) return { placements, error: "Esse objeto n\xE3o \xE9 seu." };
      return { placements: placements.map((q) => q === p ? { ...q, flip: !q.flip || void 0 } : q) };
    }
    case "remove": {
      const p = mine(op.id);
      if (!p) return { placements, error: "Esse objeto n\xE3o \xE9 seu." };
      return { placements: placements.filter((q) => q !== p) };
    }
    default:
      return { placements, error: "Opera\xE7\xE3o inv\xE1lida." };
  }
}
function chairSide(spot, desk) {
  const { h } = sizeOf(desk);
  if (spot.seat.y >= desk.y + h) return "below";
  if (spot.seat.y < desk.y) return "above";
  return spot.seat.x < desk.x ? "left" : "right";
}
var FACE = { below: "up", above: "down", left: "right", right: "left" };
function chairFacing(chair, key, side2) {
  for (const flip of [void 0, true]) {
    if (seatsOf({ ...chair, key, flip, rot: void 0 })[0]?.dir === FACE[side2]) return flip;
  }
  return null;
}
function applyDeskStyle(placements, spots, claims, profileId, raw) {
  const req = raw ?? {};
  const spot = myDesk(spots, claims, profileId);
  if (!spot) return { placements, error: "Reivindique uma mesa primeiro." };
  const deskP = placements.find((p) => p.id === spot.id);
  const chairP = placements.find((p) => p.x === spot.seat.x && p.y === spot.seat.y && isChair(p.key));
  if (!deskP) return { placements, error: "Mesa n\xE3o encontrada." };
  const side2 = chairSide(spot, deskP);
  const chairBelow = side2 === "below";
  let next = placements;
  if (req.desk !== void 0) {
    const key = req.desk;
    if (typeof key !== "string" || !(key in FURNITURE)) return { placements, error: "Modelo de mesa desconhecido." };
    const k = key;
    const a = furnitureDef(deskP.key);
    const b = furnitureDef(k);
    const sideOk = b.desk || !deskP.rot && (chairBelow ? k === "desk_a" || k === "desk_b" : side2 === "above" && (k === "desk_back" || k === "exec_desk"));
    if (!isClaimableDesk(k) || !sideOk || a.w !== b.w || a.h !== b.h) return { placements, error: "Esse modelo n\xE3o cabe no lugar desta mesa." };
    next = next.map((p) => p === deskP ? { ...p, key: k } : p);
  }
  if (req.chair !== void 0) {
    if (!chairP) return { placements, error: "Esta mesa n\xE3o tem cadeira." };
    const key = req.chair;
    if (typeof key !== "string" || !(key in FURNITURE) || !isChair(key)) return { placements, error: "Modelo de cadeira desconhecido." };
    const k = key;
    const flip = chairFacing(chairP, k, side2);
    if (flip === null) return { placements, error: "A cadeira precisa estar virada para a mesa." };
    next = next.map((p) => p.id === chairP.id ? { ...p, key: k, flip } : p);
  }
  if (req.turn) {
    const d = next.find((p) => p.id === deskP.id);
    const { w, h } = sizeOf(d);
    const rot = ((d.rot ?? 0) + 2) % 4;
    const turned = { ...d, rot: rot || void 0 };
    next = carryDeskItems(next, d, turned).map((p) => p.id === d.id ? turned : p);
    if (chairP) {
      const c = next.find((p) => p.id === chairP.id);
      let x = c.x;
      let y = c.y;
      if (side2 === "below") y = d.y - 1;
      else if (side2 === "above") y = d.y + h;
      else if (side2 === "left") x = d.x + w;
      else x = d.x - 1;
      const free = (tx, ty) => !next.some((q) => {
        if (q.id === c.id) return false;
        const z = sizeOf(q);
        if (tx < q.x || ty < q.y || tx >= q.x + z.w || ty >= q.y + z.h) return false;
        return solidAt(q, tx - q.x, ty - q.y) || isChair(q.key);
      });
      if (y < 0 || x < 0 || !free(x, y)) return { placements, error: "Do outro lado da mesa n\xE3o tem espa\xE7o para a cadeira." };
      let k = c.key;
      let flip = c.flip;
      for (let i = 0; i < 2; i++) {
        const t = turnChair({ key: k, flip });
        if (t) k = t.key, flip = t.flip;
      }
      next = next.map((p) => p.id === c.id ? { ...p, x, y, key: k, flip, ox: side2 === "left" || side2 === "right" ? p.ox ? -p.ox : void 0 : p.ox, oy: side2 === "below" || side2 === "above" ? p.oy ? -p.oy : void 0 : p.oy } : p);
    }
  }
  return { placements: next };
}

// server/index.ts
init_deskItems();

// shared/map/tv.ts
init_footprint();
var TV_KEYS = /* @__PURE__ */ new Set(["tv_wall", "tech_big_tv", "mt_tv_cart"]);
var isTvKey = (key) => TV_KEYS.has(key);
var tvSpeakerKey = (placementId) => `tv:${placementId}`;
var tvPlacementId = (key) => key.startsWith("tv:") ? key.slice(3) : null;
var TV_OPEN_RADIUS = 6;
function tvRoom(layout, p) {
  const { w, h } = sizeOf(p);
  const fx = p.x + Math.floor(w / 2);
  const fy = p.y + h - 1 + (p.key === "tv_wall" ? 1 : 0);
  const z = layout.zones.find((zz) => fx >= zz.x && fx < zz.x + zz.w && fy >= zz.y && fy < zz.y + zz.h);
  return z && (z.kind === "meeting" || z.kind === "office") ? z : null;
}
function inTvArea(layout, p, x, y) {
  const room = tvRoom(layout, p);
  if (room) return x >= room.x && x < room.x + room.w && y >= room.y && y < room.y + room.h;
  const { w, h } = sizeOf(p);
  const cx = p.x + w / 2;
  const cy = p.y + h;
  return Math.hypot(x + 0.5 - cx, y + 0.5 - cy) <= TV_OPEN_RADIUS;
}

// shared/board.ts
var BOARD_W = 1280;
var BOARD_H = 720;
var BOARD_MAX_POINTS = 6e4;
var BOARD_CHUNK_POINTS = 400;
var emptyBoard = () => ({ strokes: [], by: null, at: 0 });
function boardPointCount(b) {
  let n = 0;
  for (const s of b.strokes) n += s.p.length / 2;
  return n;
}
var clampInt = (v, max) => Math.max(0, Math.min(max, Math.round(Number(v) || 0)));
function sanitizeStroke(raw) {
  const s = raw;
  if (!s || typeof s !== "object" || typeof s.id !== "string" || !Array.isArray(s.p)) return null;
  const id = s.id.slice(0, 48);
  if (!id) return null;
  const c = typeof s.c === "string" && /^#[0-9a-f]{6}$/i.test(s.c) ? s.c.toLowerCase() : "#1f2937";
  const w = Math.max(1, Math.min(64, Math.round(Number(s.w) || 3)));
  const pts = s.p.slice(0, BOARD_CHUNK_POINTS * 2);
  if (pts.length < 2) return null;
  const p = [];
  for (let i = 0; i + 1 < pts.length; i += 2) p.push(clampInt(pts[i], BOARD_W), clampInt(pts[i + 1], BOARD_H));
  return { id, c, w, e: s.e ? true : void 0, p };
}
function applyStroke(b, s, by, now) {
  if (boardPointCount(b) + s.p.length / 2 > BOARD_MAX_POINTS) return false;
  let prev;
  for (let i = b.strokes.length - 1; i >= Math.max(0, b.strokes.length - 40); i--) {
    if (b.strokes[i].id === s.id) {
      prev = b.strokes[i];
      break;
    }
  }
  if (prev) prev.p.push(...s.p);
  else b.strokes.push({ ...s, p: [...s.p] });
  b.by = by;
  b.at = now;
  return true;
}

// server/index.ts
init_furniture();

// server/profileStore.ts
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
var ProfileStore = class {
  constructor(file) {
    this.file = file;
  }
  file;
  data = /* @__PURE__ */ new Map();
  timer = null;
  async load() {
    try {
      const raw = await readFile(this.file, "utf8");
      const arr = JSON.parse(raw);
      for (const p of arr) this.data.set(p.profileId, p);
    } catch {
    }
    return this;
  }
  get(profileId) {
    return this.data.get(profileId);
  }
  upsert(p) {
    this.data.set(p.profileId, { ...this.data.get(p.profileId), ...p, updatedAt: Date.now() });
    this.scheduleSave();
  }
  scheduleSave() {
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      void this.flush();
    }, 1500);
  }
  async flush() {
    await mkdir(dirname(this.file), { recursive: true });
    const tmp = `${this.file}.tmp`;
    await writeFile(tmp, JSON.stringify([...this.data.values()], null, 2));
    await rename(tmp, this.file);
  }
  get size() {
    return this.data.size;
  }
};

// shared/speaker.ts
var SPEAKER_RADIUS = { min: 3, max: 30, default: 10 };
function defaultSpeaker(pos) {
  return { holderId: null, pos, queue: [], index: -1, playing: false, startedAt: 0, offset: 0, volume: 0.6, radius: SPEAKER_RADIUS.default, loop: false, now: Date.now() };
}
function speakerPosition(s, serverNow) {
  if (!s.playing) return s.offset;
  return Math.max(0, (serverNow - s.startedAt) / 1e3);
}
function parseMusicLink(raw) {
  const text = String(raw ?? "").trim().slice(0, 300);
  if (!text) return null;
  let url = null;
  try {
    url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
  } catch {
    url = null;
  }
  const host = url?.hostname.replace(/^www\.|^m\.|^music\./, "") ?? "";
  if (url && (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com")) {
    const vid = host === "youtu.be" ? url.pathname.slice(1, 12) : url.searchParams.get("v") ?? /\/(?:shorts|embed|live)\/([\w-]{11})/.exec(url.pathname)?.[1] ?? "";
    const list = url.searchParams.get("list");
    const okId = /^[\w-]{11}$/.test(vid);
    if (list && /^[\w-]{10,64}$/.test(list) && !list.startsWith("RD")) return { kind: "yt-list", list, first: okId ? vid : void 0 };
    if (okId) return { kind: "yt-video", id: vid };
    return null;
  }
  if (url && (host === "open.spotify.com" || host === "spotify.com")) {
    const m = /\/(?:intl-[a-z-]+\/)?(track|album|playlist)\/([A-Za-z0-9]{10,40})/.exec(url.pathname);
    return m ? { kind: "spotify", type: m[1], id: m[2] } : null;
  }
  const uri = /^spotify:(track|album|playlist):([A-Za-z0-9]{10,40})$/.exec(text);
  if (uri) return { kind: "spotify", type: uri[1], id: uri[2] };
  if (/^https?:\/\//i.test(text)) return null;
  return { kind: "search", q: text };
}
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function startTrack(s, index, now) {
  if (index < 0 || index >= s.queue.length) return { ...s, index: s.queue.length ? clamp(s.index, 0, s.queue.length - 1) : -1, playing: false, offset: 0 };
  return { ...s, index, playing: true, startedAt: now, offset: 0 };
}
function nextIndex(s, from = s.index) {
  for (let i = from + 1; i < s.queue.length; i++) if (!s.queue[i].failed) return i;
  if (s.loop) {
    for (let i = 0; i <= Math.min(from, s.queue.length - 1); i++) if (!s.queue[i].failed) return i;
  }
  return -1;
}
function applySpeakerCmd(s, cmd, now, who) {
  switch (cmd.action) {
    case "play":
      if (s.playing) return s;
      if (s.index < 0) return startTrack(s, nextIndex(s, -1), now);
      return { ...s, playing: true, startedAt: now - s.offset * 1e3 };
    case "pause":
      return s.playing ? { ...s, playing: false, offset: speakerPosition(s, now) } : s;
    case "next": {
      const i = nextIndex(s);
      return i < 0 ? { ...s, playing: false, offset: 0 } : startTrack(s, i, now);
    }
    case "prev": {
      if (speakerPosition(s, now) > 5 || s.index <= 0) return startTrack(s, Math.max(0, s.index), now);
      return startTrack(s, s.index - 1, now);
    }
    case "jump":
      return Number.isInteger(cmd.index) ? startTrack({ ...s, queue: s.queue.map((t, i) => i === cmd.index ? { ...t, failed: false } : t) }, cmd.index, now) : s;
    case "remove": {
      const i = cmd.index;
      if (!Number.isInteger(i) || i < 0 || i >= s.queue.length) return s;
      const queue = s.queue.filter((_, k) => k !== i);
      if (i < s.index) return { ...s, queue, index: s.index - 1 };
      if (i > s.index) return { ...s, queue };
      const t = { ...s, queue, index: i - 1 };
      const n = nextIndex(t);
      return n < 0 ? { ...t, index: queue.length ? Math.min(i, queue.length - 1) : -1, playing: false, offset: 0 } : s.playing ? startTrack(t, n, now) : { ...t, index: n, offset: 0 };
    }
    case "move": {
      const { from, to } = cmd;
      if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= s.queue.length || to >= s.queue.length || from === to) return s;
      const queue = [...s.queue];
      const [t] = queue.splice(from, 1);
      queue.splice(to, 0, t);
      const curId = s.queue[s.index]?.id;
      return { ...s, queue, index: curId ? queue.findIndex((q) => q.id === curId) : s.index };
    }
    case "clear":
      return { ...s, queue: [], index: -1, playing: false, offset: 0 };
    case "seek": {
      const sec = clamp(Number(cmd.seconds) || 0, 0, 6 * 3600);
      return s.playing ? { ...s, startedAt: now - sec * 1e3 } : { ...s, offset: sec };
    }
    case "volume":
      return { ...s, volume: clamp(Number(cmd.value) || 0, 0, 1) };
    case "radius":
      return { ...s, radius: Math.round(clamp(Number(cmd.value) || SPEAKER_RADIUS.default, SPEAKER_RADIUS.min, SPEAKER_RADIUS.max)) };
    case "loop":
      return { ...s, loop: !!cmd.value };
    case "mapVideo":
      return { ...s, mapHidden: !cmd.value || void 0 };
    case "hold":
      return { ...s, holderId: who.id };
    case "drop":
      return s.holderId ? { ...s, holderId: null, pos: { x: who.x, y: who.y } } : s;
    default:
      return s;
  }
}
function speakerEnded(s, trackId, failed, now) {
  const cur = s.queue[s.index];
  if (!cur || cur.id !== trackId || !s.playing) return s;
  if (!failed && now - s.startedAt < 4e3) return s;
  if (failed && cur.alt?.length) {
    const [videoId, ...alt] = cur.alt;
    return startTrack({ ...s, queue: s.queue.map((t, i) => i === s.index ? { ...t, videoId, alt } : t) }, s.index, now);
  }
  const marked = failed ? { ...s, queue: s.queue.map((t, i) => i === s.index ? { ...t, failed: true } : t) } : s;
  const n = nextIndex(marked);
  return n < 0 ? { ...marked, playing: false, offset: 0 } : startTrack(marked, n, now);
}
var MAX_PLAYLISTS = 50;
var MAX_PLAYLIST_TRACKS = 300;
var SOURCES = /* @__PURE__ */ new Set(["youtube", "spotify", "busca"]);
var plSeq = 0;
var newId2 = (p) => `${p}${Date.now().toString(36)}${(plSeq++).toString(36)}${Math.random().toString(36).slice(2, 5)}`;
function cleanTrack(raw) {
  const t = raw ?? {};
  const videoId = typeof t.videoId === "string" && /^[\w-]{11}$/.test(t.videoId) ? t.videoId : "";
  const query = typeof t.query === "string" ? t.query.slice(0, 200) : void 0;
  if (!videoId && !query) return null;
  const title = String(t.title ?? "").trim().slice(0, 200) || "M\xFAsica";
  const source = SOURCES.has(String(t.source)) ? t.source : "youtube";
  const alt = Array.isArray(t.alt) ? t.alt.filter((v) => typeof v === "string" && /^[\w-]{11}$/.test(v)).slice(0, 5) : void 0;
  return { id: newId2("t"), videoId, title, source, ...query ? { query } : {}, ...alt?.length ? { alt } : {} };
}
var cleanName = (n) => String(n ?? "").trim().slice(0, 60);
function applyPlaylistCmd(lists, cmd, queue = []) {
  const find = (id) => lists.find((p) => p.id === id);
  switch (cmd.action) {
    case "save": {
      const tracks = queue.map(cleanTrack).filter((t) => !!t).slice(0, MAX_PLAYLIST_TRACKS);
      if (!tracks.length) return { lists, error: "A fila est\xE1 vazia: coloque m\xFAsicas antes de salvar." };
      if (cmd.id) {
        const p = find(cmd.id);
        if (!p) return { lists, error: "Playlist n\xE3o encontrada." };
        return { lists: lists.map((q) => q === p ? { ...q, tracks, name: cleanName(cmd.name) || q.name } : q) };
      }
      if (lists.length >= MAX_PLAYLISTS) return { lists, error: `Limite de ${MAX_PLAYLISTS} playlists.` };
      const name = cleanName(cmd.name) || `Playlist ${lists.length + 1}`;
      return { lists: [...lists, { id: newId2("pl"), name, tracks }] };
    }
    case "delete":
      return { lists: lists.filter((p) => p.id !== cmd.id) };
    case "share":
      return { lists: lists.map((p) => p.id === cmd.id ? { ...p, shared: !!cmd.shared || void 0 } : p) };
    case "rename": {
      const name = cleanName(cmd.name);
      if (!name) return { lists, error: "D\xEA um nome para a playlist." };
      return { lists: lists.map((p) => p.id === cmd.id ? { ...p, name } : p) };
    }
    case "addTrack": {
      const p = find(cmd.id);
      const t = cleanTrack(cmd.track);
      if (!p || !t) return { lists, error: "N\xE3o deu para adicionar essa m\xFAsica." };
      if (p.tracks.length >= MAX_PLAYLIST_TRACKS) return { lists, error: "Playlist cheia." };
      return { lists: lists.map((q) => q === p ? { ...q, tracks: [...q.tracks, t] } : q) };
    }
    case "removeTrack":
      return { lists: lists.map((p) => p.id === cmd.id ? { ...p, tracks: p.tracks.filter((_, i) => i !== cmd.index) } : p) };
    case "moveTrack": {
      const p = find(cmd.id);
      const { from, to } = cmd;
      if (!p || !Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= p.tracks.length || to >= p.tracks.length) return { lists };
      const tracks = [...p.tracks];
      const [t] = tracks.splice(from, 1);
      tracks.splice(to, 0, t);
      return { lists: lists.map((q) => q === p ? { ...q, tracks } : q) };
    }
    default:
      return { lists, error: "Comando inv\xE1lido." };
  }
}
function playlistTracks(p) {
  return p.tracks.map((t) => ({ ...t, id: newId2("t"), failed: false, retried: false }));
}

// server/music.ts
var UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
var MAX_TRACKS = 100;
async function realGet(url, ms = 9e3) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { headers: { "user-agent": UA, "accept-language": "pt-BR,pt;q=0.9,en;q=0.8", cookie: "CONSENT=YES+1; SOCS=CAI" }, signal: ctl.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  } finally {
    clearTimeout(t);
  }
}
var get = realGet;
var unescapeJson = (s) => {
  try {
    return JSON.parse(`"${s}"`);
  } catch {
    return s;
  }
};
var seq4 = 0;
var tid = () => `t${Date.now().toString(36)}${(seq4++).toString(36)}`;
async function youtubeTitle(id) {
  try {
    const j = JSON.parse(await get(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`));
    return String(j.title ?? "V\xEDdeo do YouTube");
  } catch {
    return "V\xEDdeo do YouTube";
  }
}
async function youtubeSearch(q) {
  const html = await get(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}&sp=EgIQAQ%253D%253D`);
  const re = /"videoRenderer":\{"videoId":"([\w-]{11})"[\s\S]{0,1500}?"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/g;
  const found = [];
  for (let m = re.exec(html); m && found.length < 5; m = re.exec(html)) if (!found.some((f) => f.videoId === m[1])) found.push({ videoId: m[1], title: unescapeJson(m[2]) });
  if (!found.length) {
    for (const m of html.matchAll(/"videoId":"([\w-]{11})"/g)) if (found.length < 5 && !found.some((f) => f.videoId === m[1])) found.push({ videoId: m[1], title: q });
  }
  if (!found.length) return null;
  return { ...found[0], alt: found.slice(1).map((f) => f.videoId) };
}
async function youtubePlaylist(list) {
  const html = await get(`https://www.youtube.com/playlist?list=${encodeURIComponent(list)}`);
  const out2 = [];
  const seen = /* @__PURE__ */ new Set();
  const re = /"playlistVideoRenderer":\{"videoId":"([\w-]{11})"[\s\S]{0,1500}?"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/g;
  for (let m = re.exec(html); m && out2.length < MAX_TRACKS; m = re.exec(html)) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    out2.push({ videoId: m[1], title: unescapeJson(m[2]) });
  }
  if (!out2.length) {
    for (const m of html.matchAll(/"videoId":"([\w-]{11})"/g)) {
      if (seen.has(m[1]) || out2.length >= MAX_TRACKS) continue;
      seen.add(m[1]);
      out2.push({ videoId: m[1], title: "" });
    }
  }
  return out2;
}
async function spotifyTracks(type, id) {
  try {
    const html = await get(`https://open.spotify.com/embed/${type}/${id}`);
    const raw = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/.exec(html)?.[1];
    if (raw) {
      const data = JSON.parse(raw);
      const e = data?.props?.pageProps?.state?.data?.entity;
      if (e) {
        if (Array.isArray(e.trackList) && e.trackList.length) {
          return e.trackList.slice(0, MAX_TRACKS).map((t) => ({ title: String(t.title ?? ""), artist: String(t.subtitle ?? "") }));
        }
        const artists = Array.isArray(e.artists) ? e.artists.map((a) => a.name).filter(Boolean).join(", ") : String(e.subtitle ?? "");
        if (e.name || e.title) return [{ title: String(e.name ?? e.title), artist: artists }];
      }
    }
  } catch {
  }
  const j = JSON.parse(await get(`https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/${type}/${id}`)}`));
  return [{ title: String(j.title ?? ""), artist: "" }];
}
async function resolveMusic(input) {
  const link = parseMusicLink(input);
  if (!link) throw new Error("N\xE3o entendi esse link. Cole um link do YouTube ou do Spotify, ou escreva o nome da m\xFAsica.");
  switch (link.kind) {
    case "yt-video":
      return { tracks: [{ id: tid(), videoId: link.id, title: await youtubeTitle(link.id), source: "youtube" }] };
    case "yt-list": {
      let items = [];
      try {
        items = await youtubePlaylist(link.list);
      } catch {
      }
      if (!items.length) {
        if (link.first) return { tracks: [{ id: tid(), videoId: link.first, title: await youtubeTitle(link.first), source: "youtube" }], note: "N\xE3o consegui abrir a playlist; adicionei s\xF3 o v\xEDdeo." };
        throw new Error("N\xE3o consegui abrir essa playlist (ela \xE9 p\xFAblica?).");
      }
      return { tracks: items.map((v, i) => ({ id: tid(), videoId: v.videoId, title: v.title || `M\xFAsica ${i + 1}`, source: "youtube" })), note: `${items.length} m\xFAsicas da playlist` };
    }
    case "spotify": {
      const list = (await spotifyTracks(link.type, link.id)).filter((t) => t.title);
      if (!list.length) throw new Error("N\xE3o consegui ler esse link do Spotify.");
      return {
        tracks: list.map((t) => ({ id: tid(), videoId: "", title: t.artist ? `${t.title} \u2014 ${t.artist}` : t.title, query: `${t.title} ${t.artist}`.trim(), source: "spotify" })),
        note: list.length > 1 ? `${list.length} m\xFAsicas do Spotify (tocando pelo YouTube)` : "M\xFAsica do Spotify (tocando pelo YouTube)"
      };
    }
    case "search": {
      const r = await youtubeSearch(link.q);
      if (!r) throw new Error(`N\xE3o achei "${link.q}" no YouTube.`);
      return { tracks: [{ id: tid(), videoId: r.videoId, title: r.title, source: "busca", alt: r.alt }] };
    }
  }
}
async function resolveTrack(t) {
  if (t.videoId || t.failed) return t;
  try {
    const r = await youtubeSearch(`${t.query ?? t.title} audio`);
    return r ? { ...t, videoId: r.videoId, alt: r.alt } : { ...t, failed: true };
  } catch {
    return { ...t, failed: true };
  }
}

// server/index.ts
var PORT = Number(process.env.PORT ?? process.env.SERVER_PORT ?? 3001);
var HTTPS_PORT = Number(process.env.HTTPS_PORT ?? 3443);
var DATA_DIR = resolve(process.env.DATA_DIR ?? "data");
var STATIC_DIR = resolve(process.env.STATIC_DIR ?? "dist");
var CERT = process.env.TLS_CERT ?? resolve("certs/cert.pem");
var KEY = process.env.TLS_KEY ?? resolve("certs/key.pem");
var ICE_SERVERS = process.env.ICE_SERVERS ? JSON.parse(process.env.ICE_SERVERS) : [{ urls: "stun:stun.l.google.com:19302" }];
if (process.env.MAP_FILE) {
  setOfficeLayout(importTiledMap(JSON.parse(readFileSync(resolve(process.env.MAP_FILE), "utf8"))));
  console.log(`Mapa carregado de ${process.env.MAP_FILE}`);
}
var readJson = (file, fallback) => {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
};
var readText = (file) => {
  try {
    return readFileSync(file, "utf8").trim() || null;
  } catch {
    return null;
  }
};
var restoring = false;
var writeJson = (file, data) => {
  if (restoring) return;
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 2));
};
var LAYOUT_FILE = join(DATA_DIR, "layout.json");
var CONFIG_FILE = join(DATA_DIR, "config.json");
var LAYOUT_VERSION = 5;
var savedLayout = readJson(LAYOUT_FILE, null);
if (savedLayout) {
  const v = Array.isArray(savedLayout) ? 1 : savedLayout.v;
  const list = Array.isArray(savedLayout) ? savedLayout : savedLayout.placements;
  if (Array.isArray(list)) {
    const migrated = v < LAYOUT_VERSION ? migrateLayout(list, v) : list;
    setMapState(Array.isArray(savedLayout) ? { placements: migrated } : { ...savedLayout, placements: migrated });
    const settled = settleSeats(getOfficeLayout(), getOfficeLayout().placements);
    if (settled !== getOfficeLayout().placements) setMapState({ ...getMapState(), placements: settled });
    if (migrated !== list || settled !== migrated) saveLayout();
  }
}
function saveLayout() {
  writeJson(LAYOUT_FILE, { v: LAYOUT_VERSION, ...getMapState() });
}
function migrateLayout(list, from) {
  let out2 = list;
  if (from < 2) {
    const room = { x: 38, y: 0, w: 8, h: 10 };
    const inRoom = (p) => p.x >= room.x && p.x < room.x + room.w && p.y >= room.y && p.y < room.y + room.h;
    const base2 = getBaseLayout().placements;
    const baseById = new Map(base2.map((p) => [p.id, p]));
    out2 = out2.filter((p) => !(inRoom(p) && /^[a-z_]+-\d+$/.test(p.id) && !baseById.has(p.id))).map((p) => inRoom(p) && p.key === "exec_desk" && baseById.has(p.id) ? baseById.get(p.id) : p).map((p) => inRoom(p) && p.key === "chair_down" && baseById.has(p.id) ? baseById.get(p.id) : p);
    const have = new Set(out2.map((p) => p.id));
    out2 = [...out2, ...base2.filter((p) => p.id.startsWith("studio-") && !have.has(p.id))];
    console.log("Layout salvo atualizado: sala da Dani agora \xE9 o est\xFAdio de grava\xE7\xE3o.");
  }
  if (from < 3) {
    const flag = getBaseLayout().placements.find((p) => p.id === "flag-brasil");
    if (flag && !out2.some((p) => p.id === flag.id)) out2 = [...out2, flag];
  }
  if (from < 4) {
    const base2 = new Map(getBaseLayout().placements.filter((p) => p.ox).map((p) => [p.id, p]));
    out2 = out2.map((s) => {
      const b = base2.get(s.id);
      return b && s.key === b.key && s.y === b.y && !s.ox && (s.x === b.x || s.x === b.x + 1) ? { ...s, x: b.x, ox: b.ox } : s;
    });
  }
  if (from < 5) {
    const have = new Set(out2.map((p) => p.id));
    const extra = out2.flatMap((d) => defaultDeskItems(d).filter((p) => !have.has(p.id)));
    if (extra.length) out2 = [...out2, ...extra];
  }
  return out2;
}
var config = { ...DEFAULT_CONFIG, ...readJson(CONFIG_FILE, {}) };
var L = await Promise.resolve().then(() => (init_logic(), logic_exports));
var { commitStep: commitStep2, createPlayer: createPlayer2, nearbyRecipients: nearbyRecipients2, publicState: publicState2, sanitizeAppearance: sanitizeAppearance2, sanitizeDir: sanitizeDir2, sanitizeName: sanitizeName2, sanitizeStatus: sanitizeStatus2, validateMove: validateMove2 } = L;
var profiles = await new ProfileStore(join(DATA_DIR, "profiles.json")).load();
var DESKS_FILE = join(DATA_DIR, "desks.json");
var desks = {};
try {
  desks = JSON.parse(readFileSync(DESKS_FILE, "utf8"));
} catch {
}
var deskTimer = null;
function saveDesks() {
  if (deskTimer) return;
  deskTimer = setTimeout(() => {
    deskTimer = null;
    if (restoring) return;
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DESKS_FILE, JSON.stringify(desks, null, 2));
  }, 800);
}
var BOARDS_FILE = join(DATA_DIR, "boards.json");
var boards = readJson(BOARDS_FILE, {});
var boardTimer = null;
function saveBoards() {
  if (boardTimer) return;
  boardTimer = setTimeout(() => {
    boardTimer = null;
    writeJson(BOARDS_FILE, boards);
  }, 1500);
}
var isBoard = (id) => getOfficeLayout().placements.some((p) => p.id === id && furnitureDef(p.key).interact?.kind === "whiteboard");
var MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
  ".tmj": "application/json",
  ".woff2": "font/woff2"
};
function handleHttp(req, res) {
  if (req.url?.startsWith("/backup") || req.url?.startsWith("/restore")) {
    void handleBackup(req, res);
    return;
  }
  if (req.url === "/public-url") {
    const url2 = isLocalRequest(req) ? readText(join(DATA_DIR, "public-url.txt")) : null;
    res.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
    res.end(JSON.stringify({ url: url2 }));
    return;
  }
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, players: players.size, profiles: profiles.size, desks: Object.keys(desks).length }));
    return;
  }
  if (!existsSync(STATIC_DIR)) {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    res.end("Servidor do Via Adventure ativo. Em desenvolvimento, abra http://localhost:5173");
    return;
  }
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  let file = normalize(join(STATIC_DIR, url));
  if (!file.startsWith(STATIC_DIR) || !existsSync(file) || statSync(file).isDirectory()) file = join(STATIC_DIR, "index.html");
  res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream", "cache-control": "no-cache" });
  res.end(readFileSync(file));
}
function isLocalRequest(req) {
  const addr = req.socket.remoteAddress ?? "";
  const proxied = req.headers["x-forwarded-for"] || req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["forwarded"];
  return !proxied && (addr === "127.0.0.1" || addr === "::1" || addr === "::ffff:127.0.0.1");
}
var players = /* @__PURE__ */ new Map();
var clients = /* @__PURE__ */ new Map();
var seq5 = 0;
var msgSeq = 0;
function send(c, t, d) {
  if (c.ws.readyState === 1) c.ws.send(JSON.stringify({ t, d }));
}
function broadcast(t, d, exceptId) {
  const raw = JSON.stringify({ t, d });
  for (const [id, c] of clients) if (id !== exceptId && c.player && c.ws.readyState === 1) c.ws.send(raw);
}
function persist(p) {
  profiles.upsert({ profileId: p.profileId, name: p.name, appearance: p.appearance, status: p.status, lastX: p.x, lastY: p.y });
}
var wss = new import_websocket_server.default({ noServer: true, maxPayload: 64 * 1024 });
wss.on("connection", (ws, req) => {
  const id = `p${(++seq5).toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const c = { ws, player: null, chatBudget: 5, boardBudget: 40, isAdmin: isLocalRequest(req) || !!process.env.ADMIN_TOKEN && new URL(req.url ?? "/", "http://x").searchParams.get("admin") === process.env.ADMIN_TOKEN };
  clients.set(id, c);
  const refill = setInterval(() => c.chatBudget = Math.min(5, c.chatBudget + 1), 2e3);
  const refillBoard = setInterval(() => c.boardBudget = Math.min(40, c.boardBudget + 3), 100);
  let alive = true;
  ws.on("pong", () => alive = true);
  const ping = setInterval(() => {
    if (!alive) return ws.terminate();
    alive = false;
    ws.ping();
  }, 15e3);
  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(String(raw));
    } catch {
      return;
    }
    handle(id, c, msg);
  });
  ws.on("close", () => {
    clearInterval(refill);
    clearInterval(refillBoard);
    clearInterval(ping);
    clients.delete(id);
    const me = c.player;
    if (!me) return;
    persist(me);
    players.delete(id);
    const main = speakers.get(MAIN);
    if (main.holderId === id) setSpeaker(MAIN, { ...main, holderId: null, pos: { x: me.x, y: me.y } });
    broadcast("player:left", { id });
    console.log(`[-] ${me.name} (${players.size} online)`);
  });
});
function handle(id, c, msg) {
  const me = c.player;
  switch (msg.t) {
    case "join": {
      const profile = msg.d ?? {};
      const saved = typeof profile.profileId === "string" ? profiles.get(profile.profileId) : void 0;
      const p = createPlayer2(id, profile, saved ? { x: saved.lastX, y: saved.lastY } : void 0);
      p.media = { mic: false, cam: false, screen: false };
      const rejoin = !!c.player;
      c.player = p;
      players.set(id, p);
      persist(p);
      for (const claim of Object.values(desks)) if (claim.ownerId === p.profileId) claim.ownerName = p.name;
      send(c, "welcome", {
        selfId: id,
        self: publicState2(p),
        players: [...players.values()].filter((o) => o.id !== id).map(publicState2),
        desks,
        iceServers: ICE_SERVERS,
        isAdmin: c.isAdmin,
        config,
        placements: null,
        map: getMapState(),
        boards,
        speaker: speakerOut(),
        deskSpeakers: deskSpeakersOut(),
        playlists: playlists[p.profileId] ?? [],
        sharedPlaylists: sharedPlaylists()
      });
      broadcast(rejoin ? "player:updated" : "player:joined", publicState2(p), id);
      console.log(`[+] ${p.name} (${players.size} online)`);
      return;
    }
    case "move": {
      if (!me) return;
      const now = Date.now();
      const r = validateMove2(me, msg.d?.x, msg.d?.y, now, desks, c.isAdmin);
      if (!r.ok) {
        send(c, "correction", { x: me.x, y: me.y, seq: Number(msg.d?.seq) || 0, reason: r.reason });
        return;
      }
      me.x = msg.d.x;
      me.y = msg.d.y;
      me.dir = sanitizeDir2(msg.d.dir) ?? me.dir;
      commitStep2(me, now);
      broadcast("player:moved", { id, x: me.x, y: me.y, dir: me.dir }, id);
      return;
    }
    case "turn": {
      const dir = sanitizeDir2(msg.d?.dir);
      if (!me || !dir) return;
      me.dir = dir;
      broadcast("player:turned", { id, dir }, id);
      return;
    }
    case "profile": {
      if (!me) return;
      const p = msg.d ?? {};
      if (p.name !== void 0) me.name = sanitizeName2(p.name);
      if (p.appearance !== void 0) me.appearance = sanitizeAppearance2(p.appearance, me.appearance);
      if (p.status !== void 0) me.status = sanitizeStatus2(p.status, me.status);
      persist(me);
      broadcast("player:updated", publicState2(me));
      let changed = false;
      for (const claim of Object.values(desks)) if (claim.ownerId === me.profileId && claim.ownerName !== me.name) claim.ownerName = me.name, changed = true;
      if (changed) broadcast("desks", desks);
      return;
    }
    case "media": {
      if (!me) return;
      const m = msg.d ?? {};
      me.media = { mic: !!m.mic, cam: !!m.cam, screen: !!m.screen };
      broadcast("player:updated", publicState2(me), id);
      return;
    }
    case "chat": {
      if (!me || typeof msg.d?.text !== "string") return;
      const text = msg.d.text.trim().slice(0, 500);
      if (!text || c.chatBudget <= 0) return;
      c.chatBudget--;
      const scope = msg.d.scope === "global" ? "global" : "nearby";
      const out2 = { id: `${Date.now().toString(36)}-${++msgSeq}`, fromId: id, fromName: me.name, text, scope, ts: Date.now() };
      if (scope === "global") broadcast("chat", out2);
      else {
        send(c, "chat", out2);
        for (const p of nearbyRecipients2(me, players.values())) {
          const to = clients.get(p.id);
          if (to) send(to, "chat", out2);
        }
      }
      return;
    }
    case "reaction": {
      if (!me || typeof msg.d?.emoji !== "string") return;
      broadcast("reaction", { id, emoji: [...msg.d.emoji].slice(0, 2).join("") });
      return;
    }
    case "desk:claim":
    case "desk:release":
    case "desk:update": {
      if (!me) return;
      const action = msg.t === "desk:claim" ? { type: "claim", spotId: String(msg.d?.spotId) } : msg.t === "desk:release" ? { type: "release" } : { type: "update", patch: msg.d };
      const r = applyDeskAction(desks, L.deskSpots, { profileId: me.profileId, name: me.name }, action);
      if (r.error) return send(c, "desk:error", { message: r.error });
      desks = r.claims;
      saveDesks();
      broadcast("desks", desks);
      pruneDeskDecor();
      return;
    }
    case "board:stroke": {
      if (!me) return;
      const board = String(msg.d?.board);
      const s = sanitizeStroke(msg.d?.stroke);
      if (!s || !isBoard(board) || c.boardBudget <= 0) return;
      c.boardBudget--;
      s.id = `${id}:${s.id}`;
      const b = boards[board] ??= emptyBoard();
      if (!applyStroke(b, s, me.name, Date.now())) {
        if (!c.boardFullWarned) send(c, "board:error", { message: "O quadro est\xE1 cheio. Limpe para desenhar mais." });
        c.boardFullWarned = true;
        return;
      }
      c.boardFullWarned = false;
      saveBoards();
      broadcast("board:stroke", { board, stroke: s, by: me.name }, id);
      return;
    }
    case "desk:style": {
      if (!me) return;
      const r = applyDeskStyle(getOfficeLayout().placements, L.deskSpots, desks, me.profileId, msg.d);
      if (r.error) return send(c, "desk:error", { message: r.error });
      applyMap({ ...getMapState(), placements: r.placements });
      return;
    }
    case "desk:decor": {
      if (!me) return;
      const r = applyDeskDecor(getOfficeLayout().placements, L.deskSpots, desks, me.profileId, msg.d);
      if (r.error) return send(c, "desk:error", { message: r.error });
      applyMap({ ...getMapState(), placements: r.placements });
      return;
    }
    case "board:clear": {
      if (!me) return;
      const board = String(msg.d?.board);
      if (!isBoard(board)) return;
      boards[board] = { ...emptyBoard(), at: Date.now() };
      saveBoards();
      broadcast("board:clear", { board, by: me.name });
      return;
    }
    case "speaker": {
      if (!me) return;
      void speakerCommand(c, me, msg.d);
      return;
    }
    case "playlist": {
      if (!me) return;
      void playlistCommand(c, me, msg.d);
      return;
    }
    case "speaker:ended": {
      if (!me || typeof msg.d?.trackId !== "string") return;
      const key = typeof msg.d.desk === "string" ? msg.d.desk : MAIN;
      const sp = speakerOf(key);
      if (!sp) return;
      const cur = sp.queue[sp.index];
      if (msg.d.failed && cur && cur.id === msg.d.trackId && !cur.alt?.length && !cur.retried) {
        void retryTrack(key, cur);
        return;
      }
      const next = speakerEnded(sp, msg.d.trackId, !!msg.d.failed, Date.now());
      if (next !== sp) {
        setSpeaker(key, next);
        void ensureCurrent(key);
      }
      return;
    }
    case "admin:config":
    case "admin:desk":
    case "admin:player":
    case "admin:layout": {
      if (!me) return;
      if (!c.isAdmin) return send(c, "admin:error", { message: "S\xF3 o administrador pode fazer isso." });
      return handleAdmin(c, me, msg);
    }
    case "rtc:signal": {
      if (!me || typeof msg.d?.to !== "string") return;
      const to = clients.get(msg.d.to);
      if (to?.player) send(to, "rtc:signal", { from: id, data: msg.d.data });
      return;
    }
  }
}
function handleAdmin(c, me, msg) {
  switch (msg.t) {
    case "admin:config": {
      config = applyConfigPatch(config, msg.d, getOfficeLayout().zones.map((z) => z.id));
      writeJson(CONFIG_FILE, config);
      broadcast("config", config);
      return;
    }
    case "admin:desk": {
      const claim = desks[String(msg.d?.spotId)];
      if (!claim) return;
      if (msg.d.action === "release") delete desks[claim.spotId];
      else desks[claim.spotId] = { ...claim, locked: false };
      saveDesks();
      broadcast("desks", desks);
      pruneDeskDecor();
      return;
    }
    case "admin:player": {
      const target = clients.get(String(msg.d?.id));
      const tp = target?.player;
      if (!target || !tp) return;
      if (msg.d.action === "kick") {
        send(target, "kicked", { reason: `Voc\xEA foi removido por ${me.name}.` });
        setTimeout(() => target.ws.close(), 150);
      } else if (msg.d.action === "rename") {
        tp.name = sanitizeName2(msg.d.name);
        persist(tp);
        broadcast("player:updated", publicState2(tp));
      } else if (msg.d.action === "summon") {
        const spot = L.world.nearestWalkable(me.x, me.y, me.x, me.y + 1) ?? { x: me.x, y: me.y };
        tp.x = spot.x;
        tp.y = spot.y;
        tp.lastStepAt = Date.now();
        send(target, "correction", { x: tp.x, y: tp.y, seq: 0, reason: "summon" });
        broadcast("player:moved", { id: tp.id, x: tp.x, y: tp.y, dir: tp.dir }, tp.id);
      }
      return;
    }
    case "admin:layout": {
      const r = applyLayoutOp(getOfficeLayout(), getBaseLayout(), msg.d);
      if (r.error) return send(c, "admin:error", { message: r.error });
      applyMap(r.state);
      if (r.note) send(c, "notice", { message: r.note });
      return;
    }
  }
}
var SPEAKER_FILE = join(DATA_DIR, "speaker.json");
var DESK_SPEAKER_FILE = join(DATA_DIR, "speaker-desks.json");
var MAIN = "main";
var speakers = /* @__PURE__ */ new Map();
{
  const L0 = getOfficeLayout();
  const base2 = defaultSpeaker({ x: L0.spawn.x + 2, y: L0.spawn.y - 2 });
  const saved = readJson(SPEAKER_FILE, null);
  speakers.set(MAIN, saved ? { ...base2, ...saved, holderId: null, playing: false, offset: 0, now: Date.now() } : base2);
  for (const [k, v] of Object.entries(readJson(DESK_SPEAKER_FILE, {}))) speakers.set(k, { ...v, holderId: null, playing: false, offset: 0 });
}
var speakerSaveTimer = null;
var speakerOf = (key) => speakers.get(key);
var out = (s) => ({ ...s, now: Date.now() });
function speakerOut() {
  return out(speakers.get(MAIN));
}
function deskSpeakersOut() {
  const r = {};
  for (const [k, v] of speakers) if (k !== MAIN) r[k] = out(v);
  return r;
}
function setSpeaker(key, next) {
  if (next) speakers.set(key, next);
  else speakers.delete(key);
  if (key === MAIN) broadcast("speaker", out(next));
  else broadcast("speaker:desk", { id: key, state: next ? out(next) : null });
  if (speakerSaveTimer) clearTimeout(speakerSaveTimer);
  speakerSaveTimer = setTimeout(() => {
    const { holderId: _h, now: _n, ...keep } = speakers.get(MAIN);
    writeJson(SPEAKER_FILE, keep);
    const desksOut = {};
    for (const [k, v] of speakers) if (k !== MAIN) desksOut[k] = v;
    writeJson(DESK_SPEAKER_FILE, desksOut);
  }, 1e3);
}
function pruneDeskSpeakers() {
  const placements = getOfficeLayout().placements;
  for (const key of [...speakers.keys()]) {
    if (key === MAIN) continue;
    const tvId = tvPlacementId(key);
    if (tvId) {
      const tv = placements.find((p) => p.id === tvId);
      if (!tv || !isTvKey(tv.key)) setSpeaker(key, null);
      continue;
    }
    const desk = placements.find((p) => p.id === key);
    if (!desk || !desks[key] || !deskSpeakerSource(placements, desk)) setSpeaker(key, null);
  }
}
async function ensureCurrent(key) {
  for (let guard = 0; guard < 10; guard++) {
    const sp = speakerOf(key);
    const cur = sp?.queue[sp.index];
    if (!sp || !cur || cur.videoId || cur.failed) return;
    const done = await resolveTrack(cur);
    const now = speakerOf(key);
    if (!now) return;
    let next = { ...now, queue: now.queue.map((t) => t.id === done.id ? done : t) };
    if (done.failed && now.queue[now.index]?.id === done.id) {
      const n = nextIndex(next);
      next = n < 0 ? { ...next, playing: false } : startTrack(next, n, Date.now());
    } else if (now.queue[now.index]?.id === done.id && now.playing) {
      next = { ...next, startedAt: Date.now() };
    }
    setSpeaker(key, next);
    if (!done.failed) return;
  }
}
async function retryTrack(key, cur) {
  const sp0 = speakerOf(key);
  if (!sp0) return;
  speakers.set(key, { ...sp0, queue: sp0.queue.map((t) => t.id === cur.id ? { ...t, retried: true } : t) });
  let found = null;
  try {
    found = await youtubeSearch(`${cur.query ?? cur.title} audio`);
  } catch {
    found = null;
  }
  const sp = speakerOf(key);
  if (!sp) return;
  const ids = found ? [found.videoId, ...found.alt].filter((v) => v !== cur.videoId) : [];
  const i = sp.queue.findIndex((t) => t.id === cur.id);
  if (i < 0) return;
  if (ids.length && i === sp.index) {
    const [videoId, ...alt] = ids;
    setSpeaker(key, startTrack({ ...sp, queue: sp.queue.map((t) => t.id === cur.id ? { ...t, videoId, alt } : t) }, i, Date.now()));
  } else setSpeaker(key, speakerEnded(sp, cur.id, true, Date.now()));
}
var resolving = /* @__PURE__ */ new Set();
async function resolvePending(key) {
  if (resolving.has(key)) return;
  resolving.add(key);
  try {
    for (let n = 0; n < 200; n++) {
      const sp = speakerOf(key);
      const t = sp?.queue.find((q) => !q.videoId && !q.failed);
      if (!sp || !t) break;
      const done = await resolveTrack(t);
      const now = speakerOf(key);
      if (!now) break;
      speakers.set(key, { ...now, queue: now.queue.map((q) => q.id === done.id ? done : q) });
      if (n % 5 === 4) setSpeaker(key, speakers.get(key));
    }
    const last = speakerOf(key);
    if (last) setSpeaker(key, last);
  } finally {
    resolving.delete(key);
  }
}
function speakerKeyFor(c, me, desk) {
  if (desk === void 0 || desk === null || desk === MAIN) return c.isAdmin ? { key: MAIN } : { error: "S\xF3 o administrador controla a caixa de som." };
  const tvId = tvPlacementId(String(desk));
  if (tvId) {
    const L0 = getOfficeLayout();
    const tv = L0.placements.find((q) => q.id === tvId);
    if (!tv || !isTvKey(tv.key)) return { error: "TV n\xE3o encontrada." };
    if (!c.isAdmin && !inTvArea(L0, tv, me.x, me.y)) return { error: "Chegue perto da TV (ou entre na sala dela) para escolher o v\xEDdeo." };
    return { key: tvSpeakerKey(tvId) };
  }
  const id = String(desk);
  const placements = getOfficeLayout().placements;
  const p = placements.find((q) => q.id === id);
  if (!p || !L.deskSpots.some((sp) => sp.id === id)) return { error: "Mesa n\xE3o encontrada." };
  if (!deskSpeakerSource(placements, p)) return { error: "Coloque uma caixinha de som na mesa para tocar m\xFAsica." };
  const claim = desks[id];
  if (!c.isAdmin && claim?.ownerId !== me.profileId) return { error: "S\xF3 quem reivindicou a mesa controla o som dela." };
  if (!claim) return { error: "Reivindique a mesa para usar o som dela." };
  return { key: id };
}
async function speakerCommand(c, me, raw) {
  const cmd = raw ?? {};
  const who = speakerKeyFor(c, me, cmd.desk);
  if ("error" in who) return send(c, "notice", { message: who.error });
  const key = who.key;
  if (key !== MAIN && (cmd.action === "hold" || cmd.action === "drop" || cmd.action === "radius")) return;
  const cur = speakerOf(key) ?? { ...defaultSpeaker({ x: 0, y: 0 }), volume: 0.7 };
  if (cmd.action === "add") {
    try {
      const r = await resolveMusic(String(cmd.url ?? ""));
      const base2 = speakerOf(key) ?? cur;
      const wasIdle = !base2.playing;
      const start = base2.queue.length;
      let next = { ...base2, queue: [...base2.queue, ...r.tracks].slice(-300) };
      if (wasIdle) next = startTrack(next, Math.min(start, next.queue.length - 1), Date.now());
      setSpeaker(key, next);
      send(c, "notice", { message: r.note ?? `Na fila: ${r.tracks[0]?.title ?? "m\xFAsica"}` });
      await ensureCurrent(key);
      void resolvePending(key);
    } catch (e) {
      send(c, "notice", { message: e instanceof Error && !/fetch|abort|HTTP/i.test(e.message) ? e.message : "N\xE3o consegui buscar essa m\xFAsica agora (sem internet no computador do servidor?)." });
    }
    return;
  }
  setSpeaker(key, applySpeakerCmd(cur, cmd, Date.now(), { id: me.id, x: me.x, y: me.y }));
  if (cmd.action === "next" || cmd.action === "prev" || cmd.action === "jump" || cmd.action === "play" || cmd.action === "remove") await ensureCurrent(key);
}
var PLAYLISTS_FILE = join(DATA_DIR, "playlists.json");
var playlists = readJson(PLAYLISTS_FILE, {});
var playlistTimer = null;
function sharedPlaylists() {
  const out2 = [];
  for (const [owner, lists] of Object.entries(playlists)) {
    const ownerName = [...players.values()].find((p) => p.profileId === owner)?.name ?? profiles.get(owner)?.name ?? "Algu\xE9m";
    for (const p of lists) if (p.shared) out2.push({ ...p, owner, ownerName });
  }
  return out2;
}
function findPlaylist(me, id, owner) {
  if (!owner || owner === me.profileId) return (playlists[me.profileId] ?? []).find((p) => p.id === id);
  return (playlists[owner] ?? []).find((p) => p.id === id && p.shared);
}
async function playlistCommand(c, me, raw) {
  const cmd = raw ?? {};
  const mine = playlists[me.profileId] ?? [];
  if (cmd.action === "copy") {
    const src = findPlaylist(me, String(cmd.id), String(cmd.owner));
    if (!src) return send(c, "notice", { message: "Essa playlist n\xE3o est\xE1 mais compartilhada." });
    const r2 = applyPlaylistCmd(mine, { action: "save", name: src.name }, src.tracks);
    if (r2.error) return send(c, "notice", { message: r2.error });
    playlists[me.profileId] = r2.lists;
    send(c, "playlists", r2.lists);
    send(c, "notice", { message: `"${src.name}" agora est\xE1 nas suas playlists.` });
    savePlaylists();
    return;
  }
  if (cmd.action === "load") {
    const pl = findPlaylist(me, String(cmd.id), cmd.owner);
    if (!pl) return send(c, "notice", { message: "Playlist n\xE3o encontrada." });
    const who = speakerKeyFor(c, me, cmd.desk);
    if ("error" in who) return send(c, "notice", { message: who.error });
    const key = who.key;
    const cur = speakerOf(key) ?? { ...defaultSpeaker({ x: 0, y: 0 }), volume: 0.7 };
    const tracks = playlistTracks(pl);
    let next;
    if (cmd.mode === "append") {
      next = { ...cur, queue: [...cur.queue, ...tracks].slice(-300) };
      if (!cur.playing) next = startTrack(next, Math.min(cur.queue.length, next.queue.length - 1), Date.now());
    } else next = startTrack({ ...cur, queue: tracks, index: -1 }, 0, Date.now());
    setSpeaker(key, next);
    send(c, "notice", { message: cmd.mode === "append" ? `"${pl.name}" foi para o fim da fila` : `Tocando a playlist "${pl.name}"` });
    await ensureCurrent(key);
    void resolvePending(key);
    return;
  }
  let queue = [];
  if (cmd.action === "save") {
    const who = speakerKeyFor(c, me, cmd.desk);
    queue = ("key" in who ? speakerOf(who.key) : speakerOf(typeof cmd.desk === "string" ? cmd.desk : MAIN))?.queue ?? [];
  }
  const r = applyPlaylistCmd(mine, cmd, queue);
  if (r.error) return send(c, "notice", { message: r.error });
  const wasShared = mine.some((p) => p.shared) || r.lists.some((p) => p.shared);
  playlists[me.profileId] = r.lists;
  send(c, "playlists", r.lists);
  if (cmd.action === "save") send(c, "notice", { message: cmd.id ? "Playlist atualizada com a fila atual." : "Playlist salva!" });
  if (cmd.action === "share") send(c, "notice", { message: cmd.shared ? "Playlist compartilhada com o escrit\xF3rio." : "Playlist n\xE3o est\xE1 mais compartilhada." });
  if (wasShared) broadcast("playlists:shared", sharedPlaylists());
  savePlaylists();
}
function savePlaylists() {
  if (playlistTimer) clearTimeout(playlistTimer);
  playlistTimer = setTimeout(() => writeJson(PLAYLISTS_FILE, playlists), 800);
}
function pruneDeskDecor() {
  pruneDeskSpeakers();
  const list = getOfficeLayout().placements;
  const keep = list.filter((p) => {
    if (!p.owner) return true;
    const spot = myDesk(L.deskSpots, desks, p.owner);
    return !!spot && onDesk(spot, p.key, p.x, p.y, p.ox, p.oy);
  });
  if (keep.length !== list.length) applyMap({ ...getMapState(), placements: keep });
}
function applyMap(state) {
  setMapState(state);
  L.rebuildWorld();
  const ids = new Set(L.deskSpots.map((sp) => sp.id));
  let changed = false;
  for (const k of Object.keys(desks)) if (!ids.has(k)) delete desks[k], changed = true;
  if (changed) saveDesks(), broadcast("desks", desks);
  saveLayout();
  broadcast("layout", { map: getMapState() });
  pruneDeskSpeakers();
}
function onUpgrade(req, socket, head) {
  if (!req.url?.startsWith("/ws")) return socket.destroy();
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req));
}
var http = createHttp(handleHttp);
http.on("upgrade", onUpgrade);
http.listen(PORT, () => {
  console.log(`
Via Adventure \xB7 escrit\xF3rio virtual`);
  console.log(`  Neste computador:  http://localhost:${PORT}`);
  console.log(process.env.ADMIN_TOKEN ? `  Administrador: abra o site com ?admin=<sua senha> (ADMIN_TOKEN).` : `  Administrador: quem abre pelo localhost neste computador.`);
  if (hasTls) for (const ip of lanIps()) console.log(`  Na rede (colegas):  https://${ip}:${HTTPS_PORT}   (aceite o certificado local)`);
  else for (const ip of lanIps()) console.log(`  Na rede (colegas):  http://${ip}:${PORT}   (c\xE2mera/microfone exigem HTTPS fora do localhost)`);
  console.log("");
});
var hasTls = existsSync(CERT) && existsSync(KEY);
if (hasTls) {
  const https = createHttps({ cert: readFileSync(CERT), key: readFileSync(KEY) }, handleHttp);
  https.on("upgrade", onUpgrade);
  https.listen(HTTPS_PORT);
}
function lanIps() {
  return Object.values(networkInterfaces()).flat().filter((i) => i && i.family === "IPv4" && !i.internal).map((i) => i.address);
}
async function flushAll() {
  await profiles.flush().catch(() => void 0);
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DESKS_FILE, JSON.stringify(desks, null, 2));
  writeFileSync(BOARDS_FILE, JSON.stringify(boards));
  writeJson(PLAYLISTS_FILE, playlists);
  const { holderId: _h, now: _n, ...main } = speakers.get(MAIN);
  writeJson(SPEAKER_FILE, main);
  const desksOut = {};
  for (const [k, v] of speakers) if (k !== MAIN) desksOut[k] = v;
  writeJson(DESK_SPEAKER_FILE, desksOut);
  saveLayout();
}
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, async () => {
    if (!restoring) await flushAll();
    process.exit(0);
  });
}
var BACKUP_FILES = ["layout.json", "config.json", "desks.json", "boards.json", "profiles.json", "playlists.json", "speaker.json", "speaker-desks.json"];
function isAdminHttp(req) {
  if (isLocalRequest(req)) return true;
  const tok = process.env.ADMIN_TOKEN;
  if (!tok) return false;
  const q = new URL(req.url ?? "/", "http://x").searchParams.get("admin");
  return q === tok || req.headers["x-admin-token"] === tok;
}
async function handleBackup(req, res) {
  const json = (code, body, extra = {}) => {
    res.writeHead(code, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra });
    res.end(JSON.stringify(body));
  };
  if (!isAdminHttp(req)) return json(403, { error: "S\xF3 o administrador pode fazer backup." });
  if (req.method === "GET" && req.url?.startsWith("/backup")) {
    await flushAll();
    const files = {};
    for (const name of BACKUP_FILES) {
      const v = readJson(join(DATA_DIR, name), void 0);
      if (v !== void 0) files[name] = v;
    }
    const day = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    return json(200, { app: "via-adventure", v: 1, at: (/* @__PURE__ */ new Date()).toISOString(), files }, { "content-disposition": `attachment; filename="via-adventure-backup-${day}.json"` });
  }
  if (req.method === "POST" && req.url?.startsWith("/restore")) {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 40 * 1024 * 1024) return json(413, { error: "Backup grande demais." });
      chunks.push(chunk);
    }
    let data;
    try {
      data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return json(400, { error: "Esse arquivo n\xE3o \xE9 um backup do Via Adventure." });
    }
    if (data.app !== "via-adventure" || !data.files || typeof data.files !== "object") return json(400, { error: "Esse arquivo n\xE3o \xE9 um backup do Via Adventure." });
    const names = Object.keys(data.files).filter((n) => BACKUP_FILES.includes(n));
    if (!names.length) return json(400, { error: "O backup est\xE1 vazio." });
    restoring = true;
    broadcast("notice", { message: "O escrit\xF3rio est\xE1 sendo restaurado de um backup. Reconectando em alguns segundos\u2026" });
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, files: names }), () => {
      mkdirSync(DATA_DIR, { recursive: true });
      for (const n of names) writeFileSync(join(DATA_DIR, n), JSON.stringify(data.files[n], null, 2));
      console.log(`Backup restaurado (${names.join(", ")}). Reiniciando\u2026`);
      process.exit(0);
    });
    return;
  }
  json(405, { error: "Use GET /backup ou POST /restore." });
}

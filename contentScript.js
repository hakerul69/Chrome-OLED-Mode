// Polyfill for Parcel-style module loading and execution
let defineFn;
if (typeof (defineFn = globalThis.define) === 'function') {
  globalThis.define = undefined;
}

(function (modules, entry, mainEntry, parcelName) {
  const globalScope =
    typeof globalThis !== 'undefined' ? globalThis :
    typeof self !== 'undefined' ? self :
    typeof window !== 'undefined' ? window :
    typeof global !== 'undefined' ? global : {};

  const previousRequire = typeof globalScope[parcelName] === 'function' && globalScope[parcelName];
  const moduleCache = previousRequire?.cache || {};
  const nodeRequire = typeof module !== 'undefined' && typeof module.require === 'function' && module.require.bind(module);

  function newRequire(id, jumped) {
    if (!moduleCache[id]) {
      if (!modules[id]) {
        const existingParcelRequire = typeof globalScope[parcelName] === 'function' && globalScope[parcelName];
        if (!jumped && existingParcelRequire) return existingParcelRequire(id, true);
        if (previousRequire) return previousRequire(id, true);
        if (nodeRequire && typeof id === 'string') return nodeRequire(id);

        const err = new Error(`Cannot find module '${id}'`);
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      const module = moduleCache[id] = new newRequire.Module(id);
      modules[id][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return moduleCache[id].exports;

    function localRequire(name) {
      const resolved = localRequire.resolve(name);
      return resolved === false ? {} : newRequire(resolved);
    }

    function resolve(name) {
      return modules[id][1][name] ?? name;
    }
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = function (id) {
    this.id = id;
    this.bundle = newRequire;
    this.exports = {};
  };
  newRequire.modules = modules;
  newRequire.cache = moduleCache;
  newRequire.parent = previousRequire;

  Object.defineProperty(newRequire, 'root', {
    get: () => globalScope[parcelName]
  });

  globalScope[parcelName] = newRequire;

  for (let i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    const mainExports = newRequire(mainEntry);
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;
    } else if (typeof defineFn === 'function' && defineFn.amd) {
      defineFn(() => mainExports);
    } else if (globalScope) {
      globalScope[parcelName] = mainExports;
    }
  }
})({
  MQ7ai: [
    function (require, module, exports) {
      // ========== Custom Dark Mode Injection ==========

      // Create a <style> element for injecting dark mode CSS
      const injectedStyle = document.createElement('style');
      injectedStyle.type = 'text/css';

      // Observe DOM mutations to detect when <head> becomes available
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeName === 'HEAD') {
              node.appendChild(injectedStyle);
              observer.disconnect();
              break;
            }
          }
        }
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });

      // Extract hostname from a given URL string
      const getHostname = (url) => new URL(url).hostname;

      // Update the CSS content only if it's changed
      const applyCSS = (cssText) => {
        if (injectedStyle.textContent !== cssText) {
          injectedStyle.textContent = cssText;
        }
      };

      // Clear all custom CSS if present
      const clearCSS = () => {
        if (injectedStyle.textContent !== '') {
          injectedStyle.textContent = '';
        }
      };

      // Main logic to determine whether to apply or remove CSS
      const evaluateCSS = async () => {
        try {
          const hostname = getHostname(window.location.href);
          const response = await chrome.runtime.sendMessage({
            action: 'shouldApplyCSS',
            hostname
          });

          response?.css ? applyCSS(response.css) : clearCSS();
        } catch {
          // Silently fail in production
        }
      };

      // Start the CSS polling cycle (every 500ms)
      const startPolling = async () => {
        const tick = () => evaluateCSS().catch(() => {});
        setInterval(tick, 500);
        tick();
      };

      startPolling().catch(() => {});
    },
    {}
  ]
}, ["MQ7ai"], "MQ7ai", "parcelRequirea816");

// Restore AMD define if necessary
globalThis.define = defineFn;

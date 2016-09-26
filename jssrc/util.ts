import {v4 as rawuuid} from "uuid";

//---------------------------------------------------------
// Utilities
//---------------------------------------------------------
export function clone<T>(obj:T):T {
  if(typeof obj !== "object") return obj;
  if(obj.constructor === Array) {
    let neue:T = [] as any;
    for(let ix = 0; ix < (obj as any).length; ix++) {
      neue[ix] = clone(obj[ix]);
    }
    return neue;
  } else {
    let neue:T = {} as any;
    for(let key in obj) {
      neue[key] = clone(obj[key]);
    }
    return neue;
  }
}

export function uuid() {
  let raw:string = rawuuid();
  let mangled = raw.slice(0, 8) + raw.slice(9, 9 + 4) + raw.slice(-12);
  return "⦑" + mangled + "⦒";
}

export function sortComparator(a, b) {
  if(!a.sort || !b.sort) return 0;
  let aSort = a.sort;
  let bSort = b.sort;
  return aSort === bSort ? 0 : (aSort < bSort ? -1 : 1);
}

export function debounce(fn, wait) {
  let timeout, context, args;

  let doFn = function doDebounced() {
    timeout = undefined;
    fn.apply(context, args);
    context = undefined;
    args = undefined;
  }

  return function debounced(...argList) {
    context = this;
    args = argList;
    if(timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(doFn, wait);
  }
}
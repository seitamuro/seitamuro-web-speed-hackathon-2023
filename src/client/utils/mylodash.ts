// https://github.com/pinglu85/BFEdevSolutions/blob/main/Coding-Problems/69.implement-deep-equal-isEqual.md
const cached = new WeakMap();
/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
export function isEqual(a: any, b: any) {
  if (a === null || b === null) {
    return a === b;
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }

  const dataTypeA = detectDataType(a);
  const dataTypeB = detectDataType(b);
  if (dataTypeA !== dataTypeB) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  const symbolsA = Object.getOwnPropertySymbols(a);
  const symbolsB = Object.getOwnPropertySymbols(b);
  if (symbolsA.length !== symbolsB.length) return false;

  if (cached.get(a)?.has(b)) return true;
  if (cached.get(b)?.has(a)) return true;

  cache(a, b, cached);

  const propertyNamesA = [...keysA, ...symbolsA];

  for (const propertyNameA of propertyNamesA) {
    // eslint-disable-next-line no-prototype-builtins
    if (!b.hasOwnProperty(propertyNameA)) return false;

    const propertyValueA = a[propertyNameA];
    const propertyValueB = b[propertyNameA];

    if (!isEqual(propertyValueA, propertyValueB)) {
      return false;
    }
  }

  return true;
}

function detectDataType(data: any) {
  if (Array.isArray(data)) return 'array';
  return 'object';
}

function cache(a: any, b: any, cached: any) {
  let setForA = cached.get(a);
  if (!setForA) {
    cached.set(a, (setForA = new Set()));
  }
  setForA.add(b);

  let setForB = cached.get(b);
  if (!setForB) {
    cached.set(b, (setForB = new Set()));
  }
  setForB.add(a);
}

// https://gist.github.com/imvpn22/de9682fc81c76b8b6cc4fa1f2cc0c0ad
export function myCloneDeep(param: any): any {
  if (typeof param === 'string') {
    return param;
  } else if (typeof param === 'number') {
    return param;
  } else if (typeof param === 'boolean') {
    return param;
  } else if (Array.isArray(param)) {
    return param.map((par) => myCloneDeep(par));
  } else if (typeof param === 'object') {
    const newObj = {} as { [key: string]: any };
    Object.keys(param).forEach((key) => {
      const value = myCloneDeep(param[key]) as { [key: string]: any };
      newObj[key] = value;
    });
    return newObj;
  }
}

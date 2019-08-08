function isObject (val: any): boolean {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Object' && val !== null
}

function getDataTypeConstructor (val: any): string {
    return ({}).toString.call(val).slice(8, -1)
}

function isNotBaseDataType (val: any): boolean {
    return typeof val === 'object'
}

function isNotNull (val: any): boolean {
    return val !== null
}

function isFunction (val: any): boolean {
  return getDataTypeConstructor(val) === 'Function'
}

function isSet (val: any): boolean {
    return getDataTypeConstructor(val) === 'Set'
}

function isMap (val: any): boolean {
    return getDataTypeConstructor(val) === 'Map'
}

function cloneSet (val: any): object {
    return new Set(Array.from(val))
}

function cloneMap (val: any): object {
    return new Map(Array.from(val))
}

function cloneFun (func: Function): object {
    return func.bind(null)
}

function deepClone (val: any, arr: Array<any> = []): any {
    if (!isNotBaseDataType(val)) {
        return val
    }

    if (isSet(val)) {
        return cloneSet(val)
    }

    if (isMap(val)) {
        return cloneMap(val)
    }

    if (isFunction(val)) {
        return cloneFun(val)
    }

    const complexData: any = isObject(val) ? {} : []
    if (isObject(val)) arr.push(val)

    for (let i in val) {
        if (isObject(val) && arr.some((item: any) => item === val[i])) {
            complexData[i] = val[i]
            continue
        }
        complexData[i] = deepClone(val[i], arr)
    }
    arr.pop()

    return complexData
}


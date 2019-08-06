#!/usr/bin/env node
const repl = require('repl');
const msg = 'message';


const args = process.argv
const data = args.pop()

function isObject (val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Object' && val !== null
}

function getDataTypeConstructor (val) {
    return ({}).toString.call(val).slice(8, -1)
}

function isNotBaseDataType (val) {
    return typeof val === 'object'
}

function isNotNull (val) {
    return val !== null
}

function isFunction (val) {
  return getDataTypeConstructor(val) === 'Function'
}

function isSet (val) {
    return getDataTypeConstructor(val) === 'Set'
}

function isMap (val) {
    return getDataTypeConstructor(val) === 'Map'
}

function cloneSet (val) {
    return new Set(Array.from(val))
}

function cloneMap (val) {
    return new Map(Array.form(val))
}

function cloneFun (func) {
    return func.bind(null)
}

function deepClone (val, arr = []) {
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
        return cloneFunction(val)
    }

    const complexData = isObject(val) ? {} : []
    if (isObject(val)) arr.push(val)

    for (let i in val) {
        if (isObject(val) && arr.some(item => item === val[i])) {
            complexData[i] = val[i]
            continue
        }
        complexData[i] = deepClone(val[i], arr)
    }
    arr.pop()

    return complexData
}


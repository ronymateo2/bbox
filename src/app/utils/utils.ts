
export function clone<T>(sourceObj: T) {
    return JSON.parse(JSON.stringify(sourceObj)) as T
}
const isObject = (item: any) => typeof item === 'object' && item !== null && !Array.isArray(item);

const isArray = (item: any) => Array.isArray(item);

const isString = (item: any) => typeof item === 'string';

const isNumber = (item: any) => typeof item === 'number';

const isBoolean = (item: any) => typeof item === 'boolean';

const isNull = (item: any) => item === null;


export enum TypeEnum {
    Object = 'Object',
    Array = 'Array',
    Primitive = 'Primitive',
}


export function isType(value: any): TypeEnum {
    if (isObject(value)) return TypeEnum.Object
    if (isArray(value)) return TypeEnum.Array
    if (isString(value)) return TypeEnum.Primitive
    if (isNumber(value)) return TypeEnum.Primitive
    if (isBoolean(value)) return TypeEnum.Primitive
    if (isNull(value)) return TypeEnum.Primitive
    return TypeEnum.Primitive
}

export const isKey = (chunk: string): boolean => {
    return /^"([^"]+)"(?=\s*:)/.test(chunk)
}

export const isString = (chunk: string): boolean => {
    return /^"(?:\\.|[^"\\])*"$/.test(chunk)
}

export const isNumber = (chunk: string): boolean => {
    return /\b\d+(\.\d+)?\b/.test(chunk)
}

export const isBracket = (chunk: string): boolean => {
    return /[{}[\]]/.test(chunk)
}

export const isComma = (chunk: string): boolean => {
    return /[,]/.test(chunk)
}

export const isNull = (chunk: string): boolean => {
    return /^null$/.test(chunk)
}

export const isBoolean = (chunk: string): boolean => {
    return /^(true|false)$/.test(chunk)
}


export const breakString = (string: string): string[] | null => {

    // This regex matching breaks the string into the following parts:
    // 1. JSON keys
    // 2. JSON string values
    // 3. JSON number values
    // 8. JSON boolean values
    // 4. JSON brackets
    // 5. JSON commas
    // 6. JSON colons
    // 7. JSON null values

    // And returns an array of the matched parts.

    const regex = /"([^"]+)"\s*:\s*|"(?:\\.|[^"\\])*"|\b\d+(\.\d+)?\b|\bnull\b|\btrue\b|\bfalse\b|[{}[\]]|[:,]/g;
    return string.match(regex);
}

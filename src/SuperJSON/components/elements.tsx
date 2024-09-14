import { isKey, isString, isNumber, isBoolean, isBracket, isComma, isNull, breakString } from '../lib/utils'

const indentation = 4

const createElement = (index: number, stringLine: string, depth: number): JSX.Element => {

    const highlightedElements: JSX.Element[] = []
    const chunks = breakString(stringLine)

    chunks?.forEach((chunk, index) => {

        if (isKey(chunk)) {

            // Color json keys
            const hlElement = <span key={index} className='sjd-key'>{chunk.slice(0, -2)}<span className='sjd-punct'>: </span></span>;
            highlightedElements.push(hlElement);

        } else if (isString(chunk)) {

            // Color json string values
            const hlElement = <span key={index} className='sjd-string'>{chunk}</span>;
            highlightedElements.push(hlElement);

        } else if (isNumber(chunk)) {

            // Color json numbers
            const hlElement = <span key={index} className='sjd-number'>{chunk}</span>;
            highlightedElements.push(hlElement);

        } else if (isBoolean(chunk)) {

            // Color json boolean values
            const hlElement = <span key={index} className='sjd-boolean'>{chunk}</span>;
            highlightedElements.push(hlElement);

        } else if (isBracket(chunk)) {

            // Color json brackets
            const hlElement = <span key={index} className='sjd-bracket'>{chunk}</span>;
            highlightedElements.push(hlElement);

        } else if (isComma(chunk)) {

            // Color json commas
            const hlElement = <span key={index} className='sjd-punct'>{chunk}</span>;
            highlightedElements.push(hlElement);
            
        } else if (isNull(chunk)) {

            // Color json null values
            const hlElement = <span key={index} className='sjd-null'>{chunk}</span>;
            highlightedElements.push(hlElement);
        }
    });

    // Add indentation to each line according to the depth
    const spaces = Array.from({ length: depth }, (_, index) => (
        <span key={index} className='sjd-indent'>{'\u00A0'.repeat(indentation)}</span>
    ));

    return (
        <div key={index} className="sjd-string-line">
            {spaces}{highlightedElements}
        </div>
    )
}


export const createElements = (jsonData: any): JSX.Element[] => {

    let jsonString = JSON.stringify(jsonData, null, 1)

    // check json validity
    try {
        JSON.parse(jsonString)
    } catch (error) {
        return [<p key="sjd-warning">Invalid JSON</p>]
    }

    // Prepare the string
    jsonString = jsonString.trim() + '\n'

    const htmlElements: JSX.Element[] = []

    let depth = 0;
    let stringLine = ''

    for (let i = 1; i < jsonString.length; i++) {

        const prevChar = jsonString[i - 1]
        const currentChar = jsonString[i]

        stringLine += prevChar

        if (currentChar === '\n') {

            if (prevChar === ',') {
                htmlElements.push(createElement(i, stringLine, depth))
                stringLine = ''
                continue
            }

            if (prevChar === '[') {
                htmlElements.push(createElement(i, stringLine, depth))
                stringLine = ''
                depth++
                continue
            }

            if (prevChar === ']') {
                htmlElements.push(createElement(i, stringLine, depth))
                stringLine = ''
                depth--
                continue
            }

            if (prevChar === '{') {
                htmlElements.push(createElement(i, stringLine, depth))
                stringLine = ''
                depth++
                continue
            }

            if (prevChar === '}') {
                htmlElements.push(createElement(i, stringLine, depth))
                stringLine = ''
                depth--
                continue
            }

            if (prevChar !== ',') {
                htmlElements.push(createElement(i, stringLine, depth))
                stringLine = ''
                depth--
                continue
            }
        }
    }

    return htmlElements
}
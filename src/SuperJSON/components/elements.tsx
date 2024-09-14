import { Config } from '../lib/config'
import { isKey, isString, isNumber, isBoolean, isBracket, isComma, isNull, breakString } from '../lib/utils'


export const createElements = (jsonData: any, config: Config): JSX.Element[] => {

    let jsonString = JSON.stringify(jsonData, null, 1)

    // check json validity
    try {
        JSON.parse(jsonString)
    } catch (error) {
        return [<p key="sjd-warning" style={{ color: config.colors.warning }}>Invalid JSON</p>]
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
                htmlElements.push(createElement(i, stringLine, depth, config))
                stringLine = ''
                continue
            }

            if (prevChar === '[') {
                htmlElements.push(createElement(i, stringLine, depth, config))
                stringLine = ''
                depth++
                continue
            }

            if (prevChar === ']') {
                htmlElements.push(createElement(i, stringLine, depth, config))
                stringLine = ''
                depth--
                continue
            }

            if (prevChar === '{') {
                htmlElements.push(createElement(i, stringLine, depth, config))
                stringLine = ''
                depth++
                continue
            }

            if (prevChar === '}') {
                htmlElements.push(createElement(i, stringLine, depth, config))
                stringLine = ''
                depth--
                continue
            }

            if (prevChar !== ',') {
                htmlElements.push(createElement(i, stringLine, depth, config))
                stringLine = ''
                depth--
                continue
            }
        }
    }

    return htmlElements
}

const createElement = (index: number, stringLine: string, depth: number, config: Config): JSX.Element => {

    const highlightedElements: JSX.Element[] = []
    const chunks = breakString(stringLine)

    chunks?.forEach((chunk, index) => {

        if (isKey(chunk)) {

            // Color json keys
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.key }}
                    className='sjd-key'>
                    {chunk.slice(0, -2)}
                    <span
                        style={{ color: config.highlightColors.punctuation }}
                        className='sjd-punct'>: </span>
                </span>;

            highlightedElements.push(hlElement);

        } else if (isString(chunk)) {

            // Color json string values
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.stringValue }}
                    className='sjd-string'>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isNumber(chunk)) {

            // Color json numbers
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.numberValue }}
                    className='sjd-number'>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isBoolean(chunk)) {

            // Color json boolean values
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.booleanValue }}
                    className='sjd-boolean'>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isBracket(chunk)) {

            // Color json brackets
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.bracket }}
                    className='sjd-bracket'>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isComma(chunk)) {

            // Color json commas
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.punctuation }}
                    className='sjd-punct'>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isNull(chunk)) {

            // Color json null values
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.null }}
                    className='sjd-null'>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);
        }
    });

    // Add indentation to each line according to the depth
    const spaces = Array.from({ length: depth }, (_, index) => (
        <span
            key={index}
            style={{
                borderLeft: config.showIndentGuides ? '1px solid' : 'none',
                borderColor: config.colors.indentLines,
            }}>
            {'\u00A0'.repeat(config.indentSpace)}
        </span>
    ));

    return (
        <div key={index} className="sjd-string-line">
            {spaces}{highlightedElements}
        </div>
    )
}
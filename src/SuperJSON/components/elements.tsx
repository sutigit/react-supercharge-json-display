import { Config } from '../lib/config'
import { isKey, isString, isNumber, isBoolean, isBracket, isComma, isNull, breakString } from '../lib/utils'

interface RowElementData {
    rowElement: JSX.Element,
    type: string,
}

export const createJsonRow = (jsonData: any, config: Config): RowElementData[] => {

    let jsonString = JSON.stringify(jsonData, null, 1)

    // check json validity
    try {
        JSON.parse(jsonString)
    } catch (error) {
        return [
            {
                rowElement: <p key="sjd-warning" style={{ color: config.colors.warning }}>Invalid JSON</p>,
                type: 'warning',
            }
        ]
    }

    // Prepare the string
    jsonString = jsonString.trim() + '\n'

    const rowElementData: RowElementData[] = []

    let depth = 0;
    let stringLine = ''

    for (let i = 1; i < jsonString.length; i++) {

        const prevChar = jsonString[i - 1]
        const currentChar = jsonString[i]

        stringLine += prevChar

        if (currentChar === '\n') {

            if (prevChar === ',') {

                const item = {
                    rowElement: createElement(i, stringLine, depth, config),
                    type: 'new-line',
                }
                rowElementData.push(item)
                stringLine = ''
                continue
            }

            if (prevChar === '[') {

                const item = {
                    rowElement: createElement(i, stringLine, depth, config),
                    type: 'opening-sqbr',
                }
                rowElementData.push(item)
                stringLine = ''
                depth++
                continue
            }

            if (prevChar === ']') {

                const item = {
                    rowElement: createElement(i, stringLine, depth, config),
                    type: 'ending-sqbr',
                }
                rowElementData.push(item)
                stringLine = ''
                depth--
                continue
            }

            if (prevChar === '{') {

                const item = {
                    rowElement: createElement(i, stringLine, depth, config),
                    type: 'opening-crlbr',
                }
                rowElementData.push(item)
                stringLine = ''
                depth++
                continue
            }

            if (prevChar === '}') {

                const item = {
                    rowElement: createElement(i, stringLine, depth, config),
                    type: 'ending-crlbr',
                }
                rowElementData.push(item)
                stringLine = ''
                depth--
                continue
            }

            if (prevChar !== ',') {

                const item = {
                    rowElement: createElement(i, stringLine, depth, config),
                    type: 'neutral',
                }
                rowElementData.push(item)
                stringLine = ''
                depth--
                continue
            }
        }
    }

    return rowElementData
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
                    style={{ color: config.highlightColors.key }}>
                    {chunk.slice(0, -2)}
                    <span style={{ color: config.highlightColors.punctuation }}>: </span>
                </span>;

            highlightedElements.push(hlElement);

        } else if (isString(chunk)) {

            // Color json string values
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.stringValue }}>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isNumber(chunk)) {

            // Color json numbers
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.numberValue }}>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isBoolean(chunk)) {

            // Color json boolean values
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.booleanValue }}>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isBracket(chunk)) {

            // Color json brackets
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.bracket }}>
                    {chunk}
                </span>;

            highlightedElements.push(hlElement);

        } else if (isComma(chunk)) {

            // Color json commas
            const hlElement =
                <span
                    key={index}
                    style={{ color: config.highlightColors.punctuation }}>
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
import { useEffect, useRef, useState } from 'react'
import { createJsonRow } from './components/elements'
import CollapseButton from './components/collapse-button'
import { Config, defaultOptions } from './lib/config'
import './styles.css'

interface RowElementData {
    rowElement: JSX.Element,
    type: string,
    depth: number,
    collapsed: boolean
}

interface CollapseRange {
    end: number | null,
    collapsed: boolean,
    depth: number,
};

type CollapseRangeObject<Key extends string> = {
    [key in Key]: CollapseRange
};

export default function SJDisplay(
    {
        children,
        json,
        options,
    }: {
        children?: React.ReactNode
        json: any,
        options?: any,
    }): JSX.Element {

    const [config, setConfig] = useState<Config>(defaultOptions)
    const [focusedRow, setFocusedRow] = useState<number | null>(null)
    const [rowElementData, setRowElementData] = useState<RowElementData[]>([])

    const [initialized, setInitialized] = useState<boolean>(false)
    const collapseRanges = useRef<CollapseRangeObject<string>>({})


    // Map JSON to JSX
    useEffect(() => {
        setInitialized(false)

        // Update style configurations
        if (options) {
            setConfig({
                ...config,
                ...options
            })
        }

        setRowElementData(createJsonRow(json, config))
    }, [options])

    // Map collapse ranges only once on component initialization
    useEffect(() => {
        if (initialized || rowElementData.length === 0) return

        const collectedCollapseRanges: CollapseRangeObject<string> = {}
        const currentCollapseRangeStartIndexes: number[] = [];

        rowElementData.forEach(({ type, depth }, i) => {
            if (type === 'opening-sqbr' || type === 'opening-crlbr') {

                currentCollapseRangeStartIndexes.push(i)

                collectedCollapseRanges[i] = {
                    end: null,
                    collapsed: false,
                    depth: depth
                }
            } else if (type === 'closing-sqbr' || type === 'closing-crlbr') {
                collectedCollapseRanges[currentCollapseRangeStartIndexes[currentCollapseRangeStartIndexes.length - 1].toString()].end = i
                currentCollapseRangeStartIndexes.pop()
            }
        })

        collapseRanges.current = collectedCollapseRanges
        setInitialized(true)
    }, [rowElementData])


    const updateCollapseRanges = (collapseIndex: number) => {
        collapseRanges.current[collapseIndex.toString()].collapsed = !collapseRanges.current[collapseIndex.toString()].collapsed
    }

    const handleCollapse = (collapseIndex: number) => {

        // Set new collapsed value for rowElements with collapseRanges
        updateCollapseRanges(collapseIndex)

        // Copy new rowElementData
        const rowElementDataCopy = [...rowElementData];

        let current: CollapseRange = collapseRanges.current[collapseIndex]

        if (current.end === null) return

        // Handle closing rows
        if (current.collapsed === true) {
            for (let i = collapseIndex + 1; i < current.end; i++) {

                // Close the row element
                rowElementDataCopy[i].collapsed = true;
            }
        }

        // handle opening rows
        if (current.collapsed === false) {

            let skipRange: number = 0;
            let skipDepth: number = 0;

            // Go through each row starting from collapseIndex
            for (let i = collapseIndex + 1; i < current.end; i++) {

                if (skipRange > 0) {
                    skipRange--

                    // if row is in skip range and depth, then skip the loop
                    if (rowElementDataCopy[i].depth > skipDepth) {
                        continue
                    }
                }

                // If a nested object is collapsed, set range and depth of the nested object for skipping
                if (collapseRanges.current[i]?.collapsed === true) {
                    skipRange = collapseRanges.current[i].end! - i
                    skipDepth = collapseRanges.current[i].depth
                }

                // Open the row element
                rowElementDataCopy[i].collapsed = false;

            }
        }

        setRowElementData(rowElementDataCopy);
    }

    return (
        <div
            id="super-json-display"
            style={{
                padding: config.layout.padding,
                backgroundColor: config.colors.background,
                fontFamily: config.text.fontFamily,
                fontSize: config.text.fontSize,
                fontWeight: config.text.fontWeight,
            }}>

            {rowElementData.map(({ rowElement, type, collapsed }, i) => {
                return (
                    <div
                        key={i}
                        className='sjd-row'
                        onMouseEnter={() => setFocusedRow(i)}
                        onMouseLeave={() => setFocusedRow(null)}
                        style={{
                            backgroundColor: focusedRow === i ? config.colors.focusedRow : 'transparent',
                            height: collapsed ? 0 : config.layout.lineHeight,
                            maxHeight: config.layout.lineHeight,
                        }}>

                        {/* Line number */}
                        <div
                            className='sjd-row-number'
                            style={{
                                visibility: config.showLineNumbers ? 'visible' : 'hidden',
                                color: config.colors.rowNumber,
                            }}>
                            {i + 1}
                        </div>

                        {/* Line content */}
                        {rowElement}

                        {/* Added components */}
                        <div className='sjd-add-on' style={{ marginLeft: '6px' }}>
                            <CollapseButton
                                visible={type === 'opening-sqbr' || type === 'opening-crlbr'}
                                onClick={() => handleCollapse(i)}
                                color={config.colors.collapseButtonIcon}
                                bgColor={config.colors.collapseButtonBg}
                                isCollapsed={collapsed}
                            />
                            {children}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
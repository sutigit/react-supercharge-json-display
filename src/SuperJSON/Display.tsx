import { useEffect, useState } from 'react'
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

type RowElementDataObject<Key extends string> = {
    [key in Key]: RowElementData
};

interface CollapseRange {
    end: number | null,
    collapsed: boolean,
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
    const [collapseRanges, setCollapseRanges] = useState<CollapseRangeObject<string>>({})


    useEffect(() => {
        if (options) {
            setConfig({
                ...config,
                ...options
            })
        }

        setRowElementData(createJsonRow(json, config))
    }, [options])

    useEffect(() => {
        if (rowElementData.length === 0) return

        const collectedCollapseRanges: CollapseRangeObject<string> = {}
        const currentCollapseRangeStartIndexes: number[] = [];

        rowElementData.forEach(({ type }, i) => {
            if (type === 'opening-sqbr' || type === 'opening-crlbr') {

                currentCollapseRangeStartIndexes.push(i)

                collectedCollapseRanges[i] = {
                    end: null,
                    collapsed: false,
                }
            } else if (type === 'closing-sqbr' || type === 'closing-crlbr') {
                collectedCollapseRanges[currentCollapseRangeStartIndexes[currentCollapseRangeStartIndexes.length - 1].toString()].end = i
                currentCollapseRangeStartIndexes.pop()
            }
        })

        setCollapseRanges(collectedCollapseRanges)
    }, [rowElementData])

    useEffect(() => {
        if (Object.keys(collapseRanges).length === 0) return

    }, [collapseRanges])

    const handleCollapse = (collapseIndex: number) => {
        const collapseRange = collapseRanges[collapseIndex.toString()];
        if (collapseRange.end !== null) {
            for (let i = collapseIndex+1; i < collapseRange.end; i++) {
                rowElementData[i].collapsed = !rowElementData[i].collapsed;
            }
        }
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
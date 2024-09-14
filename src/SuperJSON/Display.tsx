import { useEffect, useState } from 'react'
import { createJsonRow } from './components/elements'
import CollapseButton from './components/collapse-button'
import { Config, defaultOptions } from './lib/config'
import './styles.css'

interface RowElementData {
    rowElement: JSX.Element,
    type: string,
}

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

    useEffect(() => {
        if (options) {
            setConfig({
                ...config,
                ...options
            })
        }

        setRowElementData(createJsonRow(json, config))
    }, [options])

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

            {rowElementData.map(({ rowElement, type }, i) => {
                return (
                    <div
                        key={i}
                        className='sjd-row'
                        onMouseEnter={() => setFocusedRow(i)}
                        onMouseLeave={() => setFocusedRow(null)}
                        style={{
                            backgroundColor: focusedRow === i ? config.colors.focusedRow : 'transparent',
                            height: config.layout.lineHeight,
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
                                color={config.colors.collapseButtonIcon}
                                bgColor={config.colors.collapseButtonBg}
                                isCollapsed={false}
                            />
                            {children}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
import { useEffect, useState } from 'react'
import { createElements } from './components/elements'
import { Config, defaultOptions } from './lib/config'
import './styles.css'

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
    const [rowElements, setRowElements] = useState<JSX.Element[]>([])

    useEffect(() => {
        if (options) {
            setConfig({
                ...config,
                ...options
            })
        }

        setRowElements(createElements(json, config))
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

            {rowElements.map((element, i) => {
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
                        {element}

                        {/* Added components */}
                        <div className='sjd-add-on' style={{ marginLeft: '1rem' }}>
                            {children}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
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

        setRowElements(createElements(json))
    }, [options])

    return (
        <div id="super-json-display" style={{ padding: config.layout.padding }}>
            {rowElements.map((element, i) => {
                return (
                    <div
                        key={i}
                        className='sjd-row'
                        onMouseEnter={() => setFocusedRow(i)}
                        onMouseLeave={() => setFocusedRow(null)}
                        style={{ backgroundColor: focusedRow === i ? config.colors.focusedRow : 'transparent' }}>

                        {/* Line number */}
                        <div className='sjd-row-number' style={{ visibility: config.showLineNumbers ? 'visible' : 'hidden'}}>{i + 1}</div>

                        {/* Line content */}
                        {element}

                        {/* Added components */}
                        <div className='sjd-add-on' style={{marginLeft: '1rem'}}>
                            {children}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
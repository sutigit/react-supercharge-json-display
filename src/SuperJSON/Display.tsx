import { useEffect, useState } from 'react'
import { createElements } from './components/elements'
import './styles.css'

interface Config {
    indentSpace: number,
    collapsible: boolean,
    showLineNumbers: boolean,
    showIndentGuides: boolean,
    layout: {
        padding: number | string,
        width: number | string,
        height: number | string,
        lineHeight?: number | string,
    },
    colors: {
        background: string,
    },
    highlightColors: {
        key: string,
        stringValue: string,
        numberValue: string,
        bracket: string,
        punctuation: string,
    }
}

const defaultOptions = {
    indentSpace: 4,
    collapsible: true,
    showLineNumbers: true,
    showIndentGuides: true,
    layout: {
        padding: 40,
        width: '100%',
        height: '100%',
        lineHeight: '2rem',
    },
    colors: {
        background: '#242424',
    },
    highlightColors: {
        key: '#F5F5F5',
        stringValue: '#DEB887',
        numberValue: '#87CEFA',
        bracket: '#FF7F50',
        punctuation: '#808080',
    }
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


    const [htmlElements, setHtmlElements] = useState<JSX.Element[]>([])
    const [config, setConfig] = useState<Config>(defaultOptions)

    useEffect(() => {
        if (options) {
            setConfig({
                ...config,
                ...options
            })
        }

        setHtmlElements(createElements(json))
    }, [options])

    return (
        <div id="super-json-display" style={{ padding: config.layout.padding }}>
            {htmlElements.map((element, i) => {
                return (
                    <div key={i} className='sjd-row hover'>
                        <div className='sjd-line-number'>{i + 1}</div>
                        {element}
                        {children}
                    </div>
                )
            })}
        </div>
    )
}
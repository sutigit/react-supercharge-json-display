export interface Config {
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
        focusedRow: string,
    },
    highlightColors: {
        key: string,
        stringValue: string,
        numberValue: string,
        booleanValue: string,
        bracket: string,
        punctuation: string,
        null: string,
    }
};

export const defaultOptions = {
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
        focusedRow: 'rgba(255, 255, 255, 0.02)',
    },
    highlightColors: {
        key: '#F5F5F5',
        stringValue: '#DEB887',
        numberValue: '#87CEFA',
        booleanValue: '#87CEFA',
        bracket: '#FF7F50',
        punctuation: '#808080',
        null: '#87CEFA',
    }
} as Config;
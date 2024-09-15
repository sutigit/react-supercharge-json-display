export interface Config {
    indentSpace: number,
    collapsible: boolean, //  not implemented yet
    showLineNumbers: boolean,
    showIndentGuides: boolean,
    layout: {
        padding: number | string, 
        lineHeight?: number | string,
    },
    text: {
        fontFamily: string,
        fontSize: string,
        fontWeight: number | string,
    },
    colors: {
        background: string,
        focusedRow: string,
        rowNumber: string,
        indentLines: string,
        openIcon: string,
        closedIcon: string,
        openBg: string,
        closedBg: string,
        warning: string,
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
        lineHeight: '2rem',
    },
    text: {
        fontFamily: 'monospace',
        fontSize: '1rem',
        fontWeight: 300,
    },
    colors: {
        background: '#242424',
        focusedRow: 'rgba(255, 255, 255, 0.03)',
        rowNumber: 'rgba(255, 255, 255, 0.2)',
        indentLines: 'rgba(255, 255, 255, 0.1)',
        openIcon: 'rgba(255, 255, 255, 0.4)',
        closedIcon: 'rgba(255, 255, 255, 0.8)',
        openBg: 'rgba(255, 255, 255, 0.1)',
        closedBg: 'rgba(135, 206, 250, 0.6)',
        warning: '#FF6347',
    },
    highlightColors: {
        key: '#F5F5F5',
        stringValue: '#DEB887',
        numberValue: '#87CEFA',
        booleanValue: '#87CEFA',
        bracket: '#FF7F50',
        punctuation: 'rgba(255, 255, 255, 0.3)',
        null: '#87CEFA',
    }
} as Config;
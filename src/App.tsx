import { useEffect, useState } from 'react'
import arrJson from './lib/testdata/array.json'
import objJson from './lib/testdata/object.json'


const a = JSON.stringify(arrJson, null, 1)
const b = JSON.stringify(objJson, null, 1)

const current = b

function App() {

  const createElement = (index: number, stringLine: string, depth: number) => {

    const highlightedElements: JSX.Element[] = []

    const regex = /"([^"]+)"\s*:\s*|"(?:\\.|[^"\\])*"|\b\d+(\.\d+)?\b|[{}[\]]|[:,]/g;
    const chunks = stringLine.match(regex);

    chunks?.forEach((chunk, index) => {
      let hlElement: JSX.Element;

      if (/^"([^"]+)"(?=\s*:)/.test(chunk)) {
        // Highlight keys
        hlElement = <span key={index} className='key'>{chunk.slice(0, -2)}<span className='comma-colon'>: </span></span>;

      } else if (/^"(?:\\.|[^"\\])*"$/.test(chunk)) {
        // Highlight string values
        hlElement = <span key={index} className='string'>{chunk}</span>;

      } else if (/\b\d+(\.\d+)?\b/.test(chunk)) {
        // Highlight numbers
        hlElement = <span key={index} className='number'>{chunk}</span>;

      } else if (/[{}[\]]/.test(chunk)) {
        // Highlight brackets
        hlElement = <span key={index} className='bracket'>{chunk}</span>;

      } else if (/[,]/.test(chunk)) {
        // Highlight commas
        hlElement = <span key={index} className='comma-colon'>{chunk}</span>;

      } else {
        // Default case
        hlElement = <span key={index}>{chunk}</span>;
      }

      highlightedElements.push(hlElement);
    });

    const spaces = Array.from({ length: depth }, (_, index) => (
      <span key={index} className='left-bordered'>{'\u00A0'.repeat(4)}</span>
    ));

    return (
      <div key={index} className="hover json-row">
        {spaces}{highlightedElements}
      </div>
    )
  }

  const createElements = (jsonString: string) => {

    // check json validity
    try {
      JSON.parse(jsonString)
    } catch (error) {
      return [<p key="invalid">Invalid JSON</p>]
    }

    jsonString = jsonString.trim() + '\n'
    const length = jsonString.length

    const htmlElements: JSX.Element[] = []

    let depth = 0;
    let element: JSX.Element | null = null
    let stringLine = ''

    for (let i = 1; i < length; i++) {

      stringLine += jsonString[i - 1]

      if (jsonString[i] === '\n') {

        if (jsonString[i - 1] === ',') {
          element = createElement(i, stringLine, depth)
          htmlElements.push(element)
          stringLine = ''
          continue
        }

        if (jsonString[i - 1] === '[') {
          element = createElement(i, stringLine, depth)
          htmlElements.push(element)
          stringLine = ''
          depth++
          continue
        }

        if (jsonString[i - 1] === ']') {
          element = createElement(i, stringLine, depth)
          htmlElements.push(element)
          stringLine = ''
          depth--
          continue
        }

        if (jsonString[i - 1] === '{') {
          element = createElement(i, stringLine, depth)
          htmlElements.push(element)
          stringLine = ''
          depth++
          continue
        }

        if (jsonString[i - 1] === '}') {
          element = createElement(i, stringLine, depth)
          htmlElements.push(element)
          stringLine = ''
          depth--
          continue
        }

        if (jsonString[i - 1] !== ',') {
          element = createElement(i, stringLine, depth)
          htmlElements.push(element)
          stringLine = ''
          depth--
          continue
        }
      }

    }

    return htmlElements
  }

  const [htmlElements, setHtmlElements] = useState<JSX.Element[]>([])

  useEffect(() => {
    setHtmlElements(createElements(current))
  }, [])

  return (
    <main style={{ padding: 50 }}>
      {htmlElements.map((element, index) => {
        return (
          <div key={index} className='flex hover'>
            <div className='line-index'>{index + 1}</div>
            {element}
          </div>
        )
      })}
    </main>
  )
}


export default App

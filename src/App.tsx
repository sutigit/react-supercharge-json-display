import { useEffect, useState } from 'react'
import data from './example_data/lotrapi.json'

import JSONView from "./SuperJSON/View"
import JSONRowAddon from "./SuperJSON/RowAddon"
import JSONRowItem from "./SuperJSON/RowItem"
import { extractJsonInfo } from './SuperJSON/lib/extractJsonInfo'

export default function App() {

  const [jsonDataInfo, setJsonDataInfo] = useState({})
  const [depths, setDepths] = useState<number[]>([1, 2, 3, 4])
  const [selectedDepth, setSelectedDepth] = useState(1)

  useEffect(() => {
    const result = extractJsonInfo(data)
    setJsonDataInfo(result)
  }, [])

  return (
    <main style={{ padding: 50 }}>
      <div style={{display: 'flex', justifyContent: 'flex-end', backgroundColor: '#242424', padding: '20px', gap: 2}}>
        {depths.map((depth: number) => (
          <button key={depth}>
            {depth}
          </button>
        ))}
      </div>


      <JSONView json={data}>
        {/* <JSONRowAddon>
          <JSONRowItem visibleFor={{ key: 'id' }} onHover={true}></JSONRowItem>
          <JSONRowItem visibleFor={{ key: 'id' }}></JSONRowItem>
        </JSONRowAddon> */}
      </JSONView>

    </main>
  )
};

import data from './example_data/lotrapi.json'

import JSONDisplay from "./SuperJSON/Display"
// import SjnRowAddOn from "./SuperJSON/RowAddon"

export default function App() {

  return (
    <main style={{ padding: 50 }}>
      <JSONDisplay json={data}>
      </JSONDisplay>
    </main>
  )
};
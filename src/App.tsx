import data from './example_data/lotrapi.json'

import SjnDisplay from "./SuperJSON/Display"
// import SjnRowAddOn from "./SuperJSON/RowAddon"

export default function App() {

  return (
    <main style={{ padding: 50 }}>
      <SjnDisplay json={data}>
        {/* <SjnRowAddOn visibilityRules={}>
            <p>Hello</p>
        </SjnRowAddOn> */}
      </SjnDisplay>
    </main>
  )
};
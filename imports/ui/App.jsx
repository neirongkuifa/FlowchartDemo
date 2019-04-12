import React, { useState } from 'react'

import Flowchart from './components/Flowchart'
import DisplayJSON from './components/DisplayJSON'

const App = () => {
	const [json, setJson] = useState('')
	return (
		<div>
			<h1>Flowchart APP</h1>
			<Flowchart data-test='cpn-flowchart' setJson={setJson} />
			<DisplayJSON data-test='cpn-displayjson' json={json} />
		</div>
	)
}

export default App

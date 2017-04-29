import React from 'react'
import ReactDOM from 'react-dom'
import ReactWastageTester from '../src/index'

import Root from './Root'

ReactWastageTester(React, ReactDOM)

const container = document.getElementById('app-container')
ReactDOM.render(React.createElement(Root, {}), container)

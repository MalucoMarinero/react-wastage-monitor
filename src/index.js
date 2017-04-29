import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import htmlChecker from './htmlChecker'
import reuseChecker from './reuseChecker'


export class WastageTesterMounting extends Component {
  componentDidMount () {
    htmlChecker(this._reactInternalInstance.constructor.prototype, this.props.options)
    reuseChecker(this._reactInternalInstance.constructor.prototype, this.props.options)
    // shimUpdateComponent(this._reactInternalInstance.constructor.prototype)
    // shimPerformUpdate(this._reactInternalInstance.constructor.prototype)
  }

  render () {
    return <div className="WastageTesterMounting" />
  }
}


export default function (options = {}) {
  console.log('%cReact Wastage Tester Mounting', 'font-weight: bold;')
  const div = document.createElement('div')
  document.body.appendChild(div)

  const out = ReactDOM.render(
    React.createElement(WastageTesterMounting, {options}),
    div
  )

  ReactDOM.unmountComponentAtNode(div)
}


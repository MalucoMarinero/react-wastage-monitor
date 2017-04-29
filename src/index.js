import htmlChecker from './htmlChecker'
import reuseChecker from './reuseChecker'


export default function (React, ReactDOM, options = {}) {
  class WastageTesterMounting extends React.Component {
    componentDidMount () {
      htmlChecker(this._reactInternalInstance.constructor.prototype, this.props.options)
      reuseChecker(this._reactInternalInstance.constructor.prototype, this.props.options)
    }

    render () {
      return <div className="WastageTesterMounting" />
    }
  }

  console.log('%cReact Wastage Tester Mounting', 'font-weight: bold;')
  const div = document.createElement('div')
  document.body.appendChild(div)

  const out = ReactDOM.render(
    React.createElement(WastageTesterMounting, {options}),
    div
  )

  ReactDOM.unmountComponentAtNode(div)
}


import React, {PureComponent} from 'react'
import shallowCompare from 'react-addons-shallow-compare'

export default class WastedState extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.doThing = this.doThing.bind(this)

    this.state = {
      someObject: { key: "value", },
      someSideEffect: { key: "value", },
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    this.setState({someSideEffect: {key: "value"}})
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  doThing () {
    this.setState({someObject: {key: "value"}})
  }

  render () {
    return <button onClick={this.doThing}>
      Click to do a thing
    </button>
  }
}

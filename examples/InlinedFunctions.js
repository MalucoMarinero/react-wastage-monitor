import React, {PureComponent} from 'react'
import shallowCompare from 'react-addons-shallow-compare'

export default class InlinedFunctions extends PureComponent {
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render () {
    const {count, onClick} = this.props

    return <button onClick={onClick}>
      Clicker Three: {count}
    </button>
  }
}

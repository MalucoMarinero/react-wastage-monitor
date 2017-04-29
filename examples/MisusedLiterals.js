import React, {PureComponent} from 'react'
import shallowCompare from 'react-addons-shallow-compare'

export default class MisusedLiterals extends PureComponent {
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render () {
    const {style, count} = this.props

    return <div style={style}>
      Receiving Clicker One: {count}
    </div>
  }
}

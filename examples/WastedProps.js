import React, {PureComponent} from 'react'
import shallowCompare from 'react-addons-shallow-compare'

export default class WastedProps extends PureComponent {
  render () {
    const {count} = this.props

    return <div>
      Receiving Clicker Two: {count}
    </div>
  }
}

import React, {Component, PureComponent} from 'react'

import MisusedLiterals from './MisusedLiterals'
import WastedProps from './WastedProps'
import WastedState from './WastedState'
import InlinedFunctions from './InlinedFunctions'


export default class Root extends Component {
  constructor (props, context) {
    super(props, context)
    this.incrementOne = this.incrementOne.bind(this)
    this.incrementTwo = this.incrementTwo.bind(this)

    this.state = {
      clickerOne: 0,
      clickerTwo: 0,
      clickerThree: 0,
    }
  }

  incrementOne (e) {
    this.setState({clickerOne: this.state.clickerOne + 1})
  }

  incrementTwo (e) {
    this.setState({clickerTwo: this.state.clickerTwo + 1})
  }

  incrementThree (e) {
    this.setState({clickerThree: this.state.clickerThree + 1})
  }

  render () {
    return <div>
      <h1>Hello</h1>
      <button onClick={this.incrementOne}>
        Clicker One: {this.state.clickerOne}
      </button>
      <MisusedLiterals
        style={{background: 'yellow'}}
        count={this.state.clickerOne}
      />
      <br/>
      <br/>
      <button onClick={this.incrementTwo}>
        Clicker Two: {this.state.clickerTwo}
      </button>
      <WastedProps
        count={this.state.clickerTwo}
        unusedCount={this.state.clickerOne}
      />
      <br/>
      <br/>
      <InlinedFunctions
        onClick={this.incrementThree.bind(this)}
        count={this.state.clickerThree}
      />
      <br/>
      <br/>
      <br/>
      <WastedState />

    </div>
  }
}

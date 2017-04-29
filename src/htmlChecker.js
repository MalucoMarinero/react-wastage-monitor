import ReactDOM from 'react-dom'
import showChange from './showChange'
import _ from 'lodash'

export default function (proto, options) {
  const oldMethod = proto._performComponentUpdate
  const htmlHistory = {}

  proto._performComponentUpdate = function (
    nextElement,
    nextProps,
    nextState,
    nextContext,
    transaction,
    unmaskedContext,
  ) {
    const inst = this._instance
    const node = ReactDOM.findDOMNode(this._instance)
    const prevProps = inst.props
    const prevState = inst.state
    if (node) {
      htmlHistory[this._debugID] = node.outerHTML
    }

    const result = oldMethod.bind(this)(
      nextElement, nextProps, nextState,
      nextContext, transaction, unmaskedContext,
    )

    if (
      node &&
      (inst.shouldComponentUpdate || inst.constructor.prototype.isPureReactComponent)
    ) {
      transaction.getReactMountReady().enqueue(() => {
        const node = ReactDOM.findDOMNode(this._instance)
        if (htmlHistory[this._debugID] === node.outerHTML) {
          console.group(
            (inst.constructor.displayName || inst.constructor.name) +
            " props/state changed and updated but HTML didn't"
          )
          const keys = _.union(_.keys(prevProps), _.keys(nextProps));
          for (const key of keys) {
            if (prevProps[key] !== nextProps[key]) {
              showChange('changed:'+key, key, prevProps, nextProps)
            }
          }

          const prvState = prevState || {}
          const nxtState = nextState || {}

          const skeys = _.union(_.keys(prvState), _.keys(nxtState));
          for (const key of skeys) {
            if (prvState[key] !== nxtState[key]) {
              showChange('state changed:'+key, key, prvState, nxtState)
            }
          }
          console.groupEnd();
        }
      })
    }

    return result
  }
}

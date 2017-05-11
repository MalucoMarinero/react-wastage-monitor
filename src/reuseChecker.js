import ReactDOM from 'react-dom'
import showChange from './showChange'
import _ from 'lodash'
import shallowCompare from 'react-addons-shallow-compare'
import componentCheck from './componentCheck'

export default function (proto, options) {
  const oldMethod = proto.updateComponent

  proto.updateComponent = function (
    transaction,
    prevParentElement, nextParentElement, prevUnmaskedContext,
    nextUnmaskedContext
  ) {
    const inst = this._instance
    const {componentName, excluded} = componentCheck(inst, options)
    let nextContext
    const prevContext = inst.context

    if (this._context === nextUnmaskedContext) {
      nextContext = inst.context
    } else {
      nextContext = this._processContext(nextUnmaskedContext)
    }

    const prevState = inst.state || {}
    const prevProps = prevParentElement.props
    const nextProps = nextParentElement.props
    const nextState = _.assign({}, prevState)

    let parentName = 'TopLevel'

    if (nextParentElement._owner) {
      const parentInstance = nextParentElement._owner._instance
      parentName = (
        parentInstance.constructor.displayName || parentInstance.constructor.name
      )
    }

    const oldSetState = inst.setState;

    if (!excluded) {
      inst.constructor.prototype.setState = (updates) => {
        _.assign(nextState, updates)
      }
      
      if (prevParentElement !== nextParentElement && inst.componentWillReceiveProps) {
        inst.componentWillReceiveProps(nextProps, nextContext);
      }

      inst.constructor.prototype.setState = oldSetState;
    }

    if (
      !excluded &&
      (inst.shouldComponentUpdate ||
       inst.constructor.prototype.isPureReactComponent)
    ) {
      const shouldUpdate = inst.shouldComponentUpdate
        ? inst.shouldComponentUpdate(
            nextProps, !inst.state ? inst.state : nextState, nextContext
          )
        : shallowCompare(inst, nextProps, !inst.state ? inst.state : nextState)

      if (
        shouldUpdate &&
        _.isEqual(prevProps, nextProps) &&
        _.isEqual(prevState, nextState)
      ) {
        console.group(
          parentName + " > " +
          componentName + " updated when it shouldn't need to"
        )
        const keys = _.union(_.keys(prevProps), _.keys(nextProps));
        for (const key of keys) {
          if (
            _.isEqual(prevProps[key], nextProps[key]) &&
            prevProps[key] !== nextProps[key]
          ) {
            showChange('ref inequality:' + key, key, prevProps, nextProps)
          }
        }

        const skeys = _.union(_.keys(prevState), _.keys(nextState));
        for (const key of skeys) {
          if (
            _.isEqual(prevState[key], nextState[key]) &&
            prevState[key] !== nextState[key]
          ) {
            showChange('ref inequality state:' + key, key, prevState, nextState)
          }
        }
        console.groupEnd();
      }
    } else if (!excluded) {
      console.log(
        '%c' + (parentName + " > " + componentName),
        'font-weight: bold;',
        "is impure and will ALWAYS update when a component above it does"
      )
    }


    const result = oldMethod.bind(this)(
      transaction, prevParentElement, nextParentElement,
      prevUnmaskedContext, nextUnmaskedContext
    )

    return result
  }
}



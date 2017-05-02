import _ from 'lodash'

export default function (inst, options) {
  const componentName = (
    inst.constructor.displayName || inst.constructor.name
  )
  let excluded = false

  if (options.exclude) {
    excluded = options.exclude.some((name) => {
      if (_.isRegExp(name)) {
        return name.test(componentName)
      } else {
        return name === componentName
      }
    })
  }

  return {
    componentName,
    excluded,
  }
}

const transformRange = formFilter => ({
  $gte: formFilter[0],
  $lte: formFilter[1],
})

export const RANGE = 'range'
export default (formFilters, mapping) => {
  if (!formFilters) return {}
  return Object.keys(formFilters).reduce((oldValue, f) => {
    const newObject = {}
    switch (mapping[f]) {
      case RANGE:
        newObject[f] = transformRange(formFilters[f])
        break
      default:
        newObject[f] = formFilters[f]
    }
    return newObject
  }, {})
}

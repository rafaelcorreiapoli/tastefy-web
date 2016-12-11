
export default (sortString) => {
  if (!sortString) return {}
  const v = sortString.split('.')
  return {
    [v[0]]: v[1] === 'asc' ? 1 : -1,
  }
}

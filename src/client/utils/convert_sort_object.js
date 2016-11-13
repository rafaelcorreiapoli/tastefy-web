
export default (sortString) => {
  if (!sortString) return {}
  const v = sortString.split('.')
  console.log(v)
  return {
    [v[0]]: v[1] === 'desc' ? 1 : -1,
  }
}

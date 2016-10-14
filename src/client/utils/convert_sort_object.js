
export default (sortString) => {
  const v = sortString.split('.')
  return {
    [v[0]]: v[1] === 'desc' ? 1 : -1,
  }
}

export const setNestedObject = (path: string, value: any, obj: Record<string, any>): Record<string, string> => {
  const pList: string[] = path.split('.')
  const len: number = pList.length
  for (let i = 0; i < len - 1; i++) {
    const elem: string = pList[i]
    if (!obj[elem]) obj[elem] = {}
    obj = obj[elem]
  }

  obj[pList[len - 1]] = value
  return obj
}

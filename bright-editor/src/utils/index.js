// file size
export function fileSize(byteSize) {
  let res = 0
  while (Math.abs(byteSize >= 1024)) {
    byteSize = byteSize / 1024
    res++
    if (res === 4) break
  }
  const units = ['字节', 'KB', 'MB', 'GB', 'TB']
  const newSize = byteSize.toFixed(2)
  return newSize + ' ' + units[res]
}

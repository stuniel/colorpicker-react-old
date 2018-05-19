export const hueChanged = (prevColor, color) => {
  const { hsb: { h } } = color
  const reg = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g
  const prevH = reg.exec(prevColor).slice(1)[0]

  return prevH !== h
}

export const getBasicHue = (color) => {
  const { hsl: { h } } = createColor(color)
  const backgroundColor = `hsl(${h}, 100%, 50%)`
  return backgroundColor
}

export const createColor = (color) => {
  // Check if color is valid
  // Temporarily accept only hsl
  const reg = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g
  const arr = reg.exec(color).slice(1)

  const hsl = {
    h: arr[0],
    s: arr[1] / 100,
    l: arr[2] / 100,
    value: color
  }

  const hsb = {}
  const t = hsl.s * (hsl.l < 0.5 ? hsl.l : 1 - hsl.l)
  hsb.h = hsl.h
  hsb.b = hsl.l + t
  hsb.s = hsl.l > 0 ? 2 * t / hsb.b : hsb.s

  // Convert to object
  return { hsb, hsl }
}

export const getLeft = (e, parent) => {
  let left = ((e.targetTouches && e.targetTouches[0].clientX) || e.clientX) + window.scrollX

  left = left <= parent.right
    ? left
    : parent.right

  left = left >= parent.left
    ? left
    : parent.left

  return left
}

export const getTop = (e, parent, direction) => {
  let top = ((e.targetTouches && e.targetTouches[0].clientY) || e.clientY) + window.scrollY

  if (direction === 'horizontal') { return parent.top + parent.height / 2 }
  top = top <= parent.bottom
    ? top
    : parent.bottom

  top = top >= parent.top
    ? top
    : parent.top

  return top
}

export const getHue = (left, top, parent, color) => {
  const hsb = {}
  hsb.h = parseInt((left - parent.left) / parent.width * 360)
  hsb.s = color.hsb.s
  hsb.b = color.hsb.b
  hsb.value = `hsb(${hsb.h}, ${(hsb.s * 100 | 0)}%, ${(hsb.b * 100 | 0)}%)`

  const hsl = {}
  hsl.h = hsb.h
  hsl.l = color.hsl.l
  hsl.s = color.hsl.s
  hsl.value = `hsl(${hsl.h}, ${(hsl.s * 100 | 0)}%, ${(hsl.l * 100 | 0)}%)`

  console.log(hsb)
  return { ...color, hsb, hsl }
}

export const getColor = (left, top, parent, color) => {
  const hsb = {}
  hsb.h = color.hsb.h
  hsb.s = (left - parent.left) / parent.width
  hsb.b = 1 - (top - parent.top) / parent.height
  hsb.value = `hsb(${hsb.h}, ${(hsb.s * 100 | 0)}%, ${(hsb.b * 100 | 0)}%)`

  const hsl = {}
  hsl.h = hsb.h
  hsl.l = (2 - hsb.s) * hsb.b / 2
  hsl.s = hsl.l < 1
    ? hsb.s * hsb.b / (hsl.l < 0.5 ? hsl.l * 2 : 2 - hsl.l * 2)
    : hsl.s
  hsl.value = `hsl(${hsl.h}, ${(hsl.s * 100 | 0)}%, ${(hsl.l * 100 | 0)}%)`

  return { ...color, hsb, hsl }
}

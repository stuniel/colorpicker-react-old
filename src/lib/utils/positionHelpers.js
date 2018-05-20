const inBoundries = (position, parent, start, end) => {
  position = position >= parent[start]
    ? position
    : parent[start]

  position = position <= parent[end]
    ? position
    : parent[end]

  return position
}

export const getLeft = (e, parent) => {
  let left = ((e.targetTouches && e.targetTouches[0].clientX) || e.clientX) + window.scrollX

  return inBoundries(left, parent, 'left', 'right')
}

export const getTop = (e, parent, direction) => {
  let top = ((e.targetTouches && e.targetTouches[0].clientY) || e.clientY) + window.scrollY

  if (direction === 'horizontal') { return parent.top + parent.height / 2 }

  return inBoundries(top, parent, 'top', 'bottom')
}

export const getLeftKey = (key, parent, prevLeft) => {
  let step = (key === 39 && 5) || (key === 37 && -5) || 0
  let left = prevLeft + step

  return inBoundries(left, parent, 'left', 'right')
}

export const getTopKey = (key, parent, prevTop) => {
  let step = (key === 40 && 5) || (key === 38 && -5) || 0
  let top = prevTop + step

  return inBoundries(top, parent, 'top', 'bottom')
}

import React from 'react'

import { createColorFromHSL, getBasicHue, getColor, hueChanged } from '../utils/colorHelpers'
import { getLeft, getTop, getLeftKey, getTopKey } from '../utils/positionHelpers'

import Pointer from './Pointer'

const fieldWrapperVertical = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))',
  userSelect: 'none'
}

const fieldWrapperHorizontal = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))'
}

class Field extends React.Component {
  state = {
    color: createColorFromHSL(this.props.color),
    top: 0,
    left: 0,
    pressed: false,
    focused: false
  }

  componentDidMount () {
    const { hsb } = this.state.color

    // Store fields coordinates
    this._rect = this._field.getBoundingClientRect()
    const left = hsb.s * this._rect.width + this._rect.left + window.scrollX
    const top = (1 - hsb.b) * this._rect.height + this._rect.top + window.scrollY
    this.setState({ top, left })

    // Listen for mouse down and touch start on field and keydown on document
    this._field.addEventListener('mousedown', this.handleMouseDown)
    this._field.addEventListener('touchstart', this.handleMouseDown)
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillReceiveProps (props) {
    if (hueChanged(props.color, this.state.color)) {
      const color = createColorFromHSL(props.color)
      const { hsb } = color
      const left = hsb.s * this._rect.width + this._rect.left
      const top = (1 - hsb.b) * this._rect.height + this._rect.top
      this.setState({ color, left, top })
    }
  }

  componentWillUnmount () {
    // Unbind listeners
    this._field.removeEventListener('mousedown', this.handleMouseDown)
    this._field.removeEventListener('touchstart', this.handleMouseDown)
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleMouseDown = e => {
    e.preventDefault()
    this.setState({ pressed: true }, () => {
      this.handleMouseMove(e)
    })

    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('touchmove', this.handleMouseMove)

    document.addEventListener('mouseup', () => {
      this.setState({ pressed: false })
    })
  }

  handleMouseMove = e => {
    e.preventDefault()
    if (this.state.pressed) {
      const { onChange } = this.props
      const { color: prevColor } = this.state
      const left = getLeft(e, this._rect)
      const top = getTop(e, this._rect)
      let color = getColor(left, top, this._rect, prevColor)

      this.setState({ color, top, left })

      if (onChange) {
        onChange(color)
      }
    }
  }

  handleMouseLeave = e => {
    this._field.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleBlur = () => {
    this.setState({ focused: false })
  }

  handleFocus = () => {
    this.setState({ focused: true })
  }

  handleKeyDown = (e) => {
    const { focused } = this.state
    const key = e.keyCode || e.which

    // Ignore if pointer is not focused
    if (!focused) { return }
    if (focused && key > 36 && key < 41) {
      const { onChange } = this.props
      const { color: prevColor } = this.state

      const top = getTopKey(key, this._rect, this.state.top)
      const left = getLeftKey(key, this._rect, this.state.left)
      let color = getColor(left, top, this._rect, prevColor)
      this.setState({ color, top, left })

      if (onChange) {
        onChange(color)
      }
    }
  }

  render () {
    const { color, width, height } = this.props

    const fieldStyle = {
      width,
      height,
      backgroundColor: getBasicHue(color)
    }

    return (
      <div ref={node => (this._field = node)} style={fieldStyle}>
        <div style={fieldWrapperHorizontal}>
          <div style={fieldWrapperVertical}>
            <Pointer
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              top={this.state.top}
              left={this.state.left}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Field

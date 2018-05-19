import React from 'react';

function Pointer(props) {
  const { onBlur, onFocus } = props;
  const pointerWrapper = {
    position: 'absolute',
    top: props.top,
    left: props.left,
    width: '10px',
    height: '10px',
    cursor: 'pointer',
  };

  const pointer = {
    position: 'relative',
    top: '-7.5px',
    left: '-7.5px',
    width: '10px',
    height: '10px',
    backgroundColor: '#fff',
    border: '2px solid #000',
    borderRadius: '10px',
    cursor: 'pointer',
  };

  return (
    <div style={pointerWrapper}>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        tabIndex="0"
        style={pointer}
      />
    </div>
  );
}

export default Pointer;

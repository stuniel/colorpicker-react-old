import React from 'react';

function ColorPicker(props) {
  const { children, color, onChange } = props;

  const clone = child => React.cloneElement(child, { color, onChange, ...child.props });

  return (
    <div>
      {React.Children.map(children, clone)}
    </div>
  );
}

export default ColorPicker;

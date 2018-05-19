import React from "react";
import { render } from "react-dom";
import { ColorPicker, Field } from "../../lib";
import "./styles.css";

class Demo extends React.Component {
  state = {
    color: 'hsl(240, 100%, 50%)'
  }

  render () {
    return (
      <div>
        <div style={{ height: '40px', width: '40px', backgroundColor: this.state.color }} />
        {this.state.color}
        <ColorPicker
          color={this.state.color}
          onChange={color => this.setState({ color: color.hsl.value })}
        >
          <div>hello</div>
          <Field
            width={200}
            height={200}
          />
          {/* <Hue />
          <Button color='hsl(0, 100%, 50%)' />
          <Button color='hsl(60, 100%, 50%)' />
          <Button color='hsl(120, 100%, 50%)' />
          <Button color='hsl(240, 100%, 50%)' /> */}
        </ColorPicker>
      </div>
    )
  }
}

render(<Demo />, document.getElementById("app"));

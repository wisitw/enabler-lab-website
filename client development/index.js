import React, { Component } from 'react'
import { render } from 'react-dom'

class Test extends Component {
  constructor() {
    super();
    this.state = {
      testWord: "Test React!"
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({
        testWord: "React Worked!"
      })
    , 2000);
  }

  render() {
    return (
      <h1>{ this.state.testWord }</h1>
    );
  }
}

render(<Test />, document.getElementById('app'));

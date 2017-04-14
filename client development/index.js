import React, { Component } from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'; 
import routes from './routes';

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

const store= configureStore();

render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>
  , document.getElementById('app'));

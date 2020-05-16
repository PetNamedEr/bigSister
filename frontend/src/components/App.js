import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import BallotList from './BallotList';

const store = configureStore();

const App = (props) => {
  return (
    <div>
      <Provider store={store} >
        <BallotList />
      </Provider>
    </div>
  );
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
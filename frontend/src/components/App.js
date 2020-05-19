import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';

import configureStore from '../store/configureStore';
import BallotCard from './BallotCard';
import BallotList from './BallotList';
import Layout from './Layout';

const useStyles = makeStyles({
  item: {
      border: 'solid 1px',
  },
  root: {
    backgroundColor: 'hotpink',
      width: '100%',
  },
});

const store = configureStore();

const App = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Provider store={store} >
      <BrowserRouter>
          <Layout>
          <Route exact path="/" component={BallotCard} />
            </Layout>
            </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
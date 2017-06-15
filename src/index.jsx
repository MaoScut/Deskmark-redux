// you combine your components in index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import Deskmark from './components/Deskmark/Deskmark';
import rootReducer from 'reducers';
import * as actionCreators from 'actions';

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);
const App = connect(
	state => ({ state }),
	dispatch => ({
		actions: bindActionCreators(actionCreators, dispatch),
	}) )

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(
	<Provider store={store} >
		<App />
	</Provider>
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Deskmark/Deskmark', () => {
    render(
    	<Provider store={store} >
		<App />
	</Provider>)
  });
}
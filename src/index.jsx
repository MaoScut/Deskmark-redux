// you combine your components in index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components';

// const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);
// both are the same, but the below is easier to understand,
// first we create the store, and we enhance it.
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
    	<Provider store={store}>
      <Component/>
     </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components', () => {
    render(App)
  });
}
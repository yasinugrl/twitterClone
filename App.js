import React, { useEffect } from 'react';
import Router from './src/Router';
import SplashScreen from 'react-native-splash-screen'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers'


const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  useEffect(() => {
    SplashScreen.hide();
  })

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App;
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import GlobalStyles from '../styles/theme'
import Header from '../components/Header';

const App = () => {

  return (
    <React.Fragment>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route path='' component={Home} />
      </Switch>
    </React.Fragment>
  )
}

export default App;
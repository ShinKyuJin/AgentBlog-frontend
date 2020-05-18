import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Nav from '../containers/Nav';
import GlobalStyles from '../styles/theme'

const App = () => {

  return (
    <React.Fragment>
      <Nav />
      <GlobalStyles />
      <Switch>
        <Route path='' component={Home} />
      </Switch>
    </React.Fragment>
  )
}

export default App;
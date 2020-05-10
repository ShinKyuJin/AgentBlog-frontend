import React from 'react';
import { Route } from 'react-router-dom';
import Test from '../components/test';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Test} />
      </div>
    );
  }
}

export default App;
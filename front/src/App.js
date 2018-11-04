import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import FakeBook from './FakeBook'
import FakeBookAdmin from './FakeBookAdmin'


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={FakeBook} />
        <Route exact path="/admin" render={() => <FakeBook login={true} />} />
        <Route exact path="/admin/settings" component={FakeBookAdmin} />
      </div>
    );
  }
}

export default App;

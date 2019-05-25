import React, { Fragment, Component } from 'react';

// Components
import Header    from './component/Header';
import Footer    from './component/Footer';
import Phonebook from './component/Phonebook';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Phonebook />
        <Footer />
      </Fragment>
    )
  }
}

export default App;
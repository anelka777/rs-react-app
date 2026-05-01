import React from 'react';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';

class App extends React.Component {
  render() {
    return (
        <div>
          <section>
            <Search />
          </section>
          <section>
            <CardList />
          </section>
        </div>
    );
  }
}

export default App;
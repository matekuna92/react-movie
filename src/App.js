import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Now!
        </a>
      </header>
    </div>
  );
}

class HelloMessage extends React.Component {
  render() {
    return(
      <h1 class="hello">Hello, {this.props.username}</h1>
    )
  }
}

ReactDOM.render(
    <HelloMessage username="Mate" />,
    document.getElementById('root')
  );

export default App;

import React from 'react'; 
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  return (
    <div className="App">
      <header>
        <img src='/img/logo.png' alt='logo'/>
        <h2>Converter</h2>
        <h3>$ 36.56 / 37.45</h3>
        
      </header>
      <CurrencyConverter/>
    </div>
  );
}

export default App;

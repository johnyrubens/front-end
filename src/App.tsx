import React from 'react';
import logo from './logo.svg';
import './App.css';
import { api } from './axios';


navigator.serviceWorker.register('service-worker.js')
  .then(async serviceWorker => {
    let subscription = await serviceWorker.pushManager.getSubscription()
    
    if (!subscription) {
      const publicKeyResponse = await api.get('/push/public_key')

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data.publicKey
      })
    }

    await api.post('/push/register', {
      subscription
    })

    await api.post('/push/send', {
      subscription
    })

  })

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

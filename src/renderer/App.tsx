import { Component, createSignal, onMount, onCleanup } from 'solid-js';
import type { IElectronAPI } from '../types/electron';

declare global {
  interface Window {
    api: IElectronAPI;
  }
}

const App: Component = () => {
  const [message, setMessage] = createSignal('');
  const [response, setResponse] = createSignal('');

  onMount(() => {
    if (window.api) {
      window.api.receive('message-from-main', (data: string) => {
        setResponse(data);
      });
    }
  });

  onCleanup(() => {
    if (window.api) {
      window.api.removeListener('message-from-main');
    }
  });

  const sendMessage = () => {
    if (window.api) {
      window.api.send('message-to-main', message());
    }
  };

  return (
    <div>
      <h1>Electron + Vite + SolidJS</h1>
      <div>
        <input
          type="text"
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
          placeholder="Enter message for main process"
        />
        <button onClick={sendMessage}>Send to Main Process</button>
      </div>
      {response() && (
        <div>
          <h3>Response from Main Process:</h3>
          <p>{response()}</p>
        </div>
      )}
    </div>
  );
};

export default App;
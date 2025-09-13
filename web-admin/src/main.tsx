import './styles.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { enableMocking } from './mocks';
import { App } from './app';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  // Todo: move this to a wrapper component
  enableMocking().then(() => {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
}

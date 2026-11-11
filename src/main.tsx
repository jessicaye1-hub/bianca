import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Standalone static app: index.html is the entry point
const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}

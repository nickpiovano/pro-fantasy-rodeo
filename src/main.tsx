import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Polyfill/ignore MediaSession API errors
if ('mediaSession' in navigator) {
  try {
    // Empty handlers for all common media actions to prevent errors
    const actions = [
      'play', 'pause', 'seekbackward', 'seekforward', 
      'previoustrack', 'nexttrack', 'stop', 'seekto',
      'enterpictureinpicture', 'leavepictureinpicture'
    ];
    
    actions.forEach(action => {
      try {
        // Using type assertion for MediaSessionAction
        navigator.mediaSession.setActionHandler(action as MediaSessionAction, () => {});
      } catch (e) {
        // Ignore unsupported actions
      }
    });
  } catch (error) {
    console.warn('MediaSession API not fully supported');
  }
}

createRoot(document.getElementById("root")!).render(<App />);

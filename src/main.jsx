import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthZContextProvider from './context/AuthZContext.jsx';
import { ToastContainer } from 'react-toastify';
import UserProfileContextProvider from './context/UserProfileContext.jsx';
import MentorContextProvider from './context/MentorContext.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthZContextProvider>
        <MentorContextProvider>
          <UserProfileContextProvider>
            <App />
            <ToastContainer />
          </UserProfileContextProvider>
        </MentorContextProvider>
      </AuthZContextProvider>
    </BrowserRouter>
  </StrictMode>,
);

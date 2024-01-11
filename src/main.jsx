import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WorkoutsContextProvider } from './context/WorkoutsContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey="6LcOPU0pAAAAAL5oSQ78Y3C3Fz4mVYWhvCxNiR59">
      <AuthContextProvider>
        <WorkoutsContextProvider>
          <App />
        </WorkoutsContextProvider>
      </AuthContextProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
)
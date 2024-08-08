import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux'
import {persistStoree, store} from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <GoogleOAuthProvider clientId={'647477425639-0400rhpf2q89n1c7f33c4p0scclioq96.apps.googleusercontent.com'}>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistStoree}></PersistGate>
    <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)

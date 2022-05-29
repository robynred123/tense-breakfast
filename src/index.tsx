import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import store from './store';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Index } from './pages/index';
import { Layout } from './pages/Layout';
import { TherapistPage } from './pages/Therapist';
import { SuccessPage } from './pages/Success';
import { ConfirmPage } from './pages/Confirm';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/Confirm' element={<ConfirmPage />} />
          <Route path='/Success' element={<SuccessPage />} />
          <Route path='/Therapist' element={<TherapistPage />} />
          <Route path='/' element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

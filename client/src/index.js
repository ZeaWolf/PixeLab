import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import { AuthContextProvider } from './auth';
import reportWebVitals from './reportWebVitals';
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
/*import { GlobalStoreContext, useGlobalStore } from './store'
const AppWrapper = () => {
  const store = useGlobalStore();
  return (
    <GlobalStoreContext.Provider value={store}>
      <App />
    </GlobalStoreContext.Provider>
  )
}*/
ReactDOM.render(
  <React.StrictMode>  
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
import './App.css'
import FirstWindow from "./components/FirstWindow.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import {Provider} from "react-redux";
import {store} from "./app/store.js";
import RegSuccess from "./components/RegSuccess.jsx";
import LoginSuccess from "./components/LoginSuccess.jsx";

function App() {

  return (
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<FirstWindow/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/regsuccess" element={<RegSuccess/>}/>
                  <Route path="/loginsuccess" element={<LoginSuccess/>}/>
              </Routes>
          </BrowserRouter>
      </Provider>    
  )
}

export default App

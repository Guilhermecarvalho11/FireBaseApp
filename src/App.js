import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from './pages/routes/index';


function App(){
  return(
    <BrowserRouter>
      <RoutesApp/>
    </BrowserRouter> 
  )
}


export default App;

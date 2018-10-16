// FoodApp.js  //CommentBox.js
import React, { Component } from 'react'; 
import {BrowserRouter, Route} from "react-router-dom";

import Home from "./components/Home";
import Shopprofile from "./components/Shopprofile";


class FoodApp extends Component {
  
  render() {
      return (

          <BrowserRouter>
              <div>
              <Route path="/" component={Home} exact/>
              <Route path="/shopprofile" component={Shopprofile} />
              </div>
          </BrowserRouter>

    );
  }
}

export default FoodApp;
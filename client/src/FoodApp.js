// FoodApp.js  //CommentBox.js
import React, { Component } from 'react'; 
import {BrowserRouter, Route} from "react-router-dom";

import Home from "./components/Home";
import Shopprofile from "./components/Shopprofile";
import StarRating from './components/StarRating';
import Map1 from './components/Map1';


class FoodApp extends Component {
  
  render() {
      return (

          <BrowserRouter>
              <div>


              <Route path="/" component={Home} exact/>
              <Route path="/shopprofile" component={Shopprofile} exact strict/>
              <Route path="/StarRating" component={StarRating} />
              <Route path="/Map1" component={Map1} />
              </div>
          </BrowserRouter>

    );
  }
}

export default FoodApp;
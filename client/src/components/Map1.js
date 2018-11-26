import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Map1 extends Component {
    constructor() {
        super();
        this.state = {
			locationOptions : [],
			selectedShopProfile: null
			
        };
      }
  


  render() {
     return (
         <div>
            <Map google={this.props.google} zoom={14}>
 
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    {/* <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    </div> */}
                </InfoWindow>
            </Map>
             
         </div>
     );
  }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDeS8MJYgiahdaGGXNH4trZ7XrZq6yzsgI")
  })(Map1)
// FoodApp.js  //CommentBox.js
import React, { Component } from 'react';
import Select from 'react-select'
import {ProductCard} from 'react-ui-cards';
import { Carousel } from 'react-bootstrap';
import '../css/CardsCustom.css';
import '../css/Footer.css';
import { withRouter } from 'react-router-dom';
import AppNavbar from './AppNavbar';

// const auth = new Auth();


class Home extends Component {

  
  constructor() { 
    super();
    
    this.state = {

      index: 0,
      direction: null,
      error: null,
      
      
      
      locationOptions : [],
      selectedLocation: null,
      selectedLocationAddress: null,

      shopOptions : [],
      selectedShop: null

    };

    this.searchOneBarStyle = {
      "margin": "auto",
      "width": "15%",
      "padding": "10px",
      "marginTop": "30px"
    }
    this.searchTwoBarStyle = {
      "margin": "auto",
      "width": "50%",
      "padding": "10px",
      "marginTop": "30px"
    }

    this.foodResultStyle = {
      "margin": "auto",
      "width": "84%",
      "padding": "10px",
      "display": "flex",
      "backgroundColor": "#efefeff2"
    }



  }

  componentDidMount() {
  


    


    this.loadShops();
    this.loadFoods();
  }

  authenticateUser = () => {
    // const auth = new Auth();
    // auth.login();
  }

  loadShops = () => {
    

    fetch('/api/shops')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else {
             this.setState({ locationOptions: res.data.map(locGroup=>({ label: locGroup._id, value: locGroup.shops })) }) 
          }
      });
  }


  


  loadFoods = () => {

      // fetch('/api/foods')
      //   .then(data => data.json())
      //   .then((res) => {
      //     if (!res.success) this.setState({ error: res.error });
      //     else console.log(res.data);
      //   });
      function buildUrl(url, parameters) {
        let qs = "";
        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                const value = parameters[key];
                qs +=
                    encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            }
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1);
            url = url + "?" + qs;
        }
    
        return url;
    }

    fetch(
      buildUrl('/api/foods', {
          key: "KFC"
      }),
      {
          method: "GET"
      }
  )
        .then(data => data.json())
        .then((res) => {
          if (!res.success) this.setState({ error: res.error });
          else console.log(res.data)
        });
          
    }
  

  // loadLocations = () => {

  //   fetch('/api/shops')
      // .then(data => data.json())
      // .then((res) => {
      //   if (!res.success) this.setState({ error: res.error });
      //   else this.setState({ locationOptions: res.data.map(shop=>({ label: shop.address, value: shop })) })
      // });
  // }



  handleChangeLocation = (selectedLoca) => {

    this.setState({ shopOptions : [] });
    this.setState({ selectedShop : null });
    

    this.setState({ selectedLocation : selectedLoca.value });
 
    let shops = selectedLoca.value;  
    console.log(shops)
    this.setState({ shopOptions: shops.map(shop=>({ label: shop.shop_name, value: shop })) })
    

  }



  handleChangeShop = (selectedShp) => {
    console.log(selectedShp.value.items)
    this.setState({ selectedShop : selectedShp.value});
    this.props.history.push('/Shopprofile?shop_name=' + selectedShp.value.shop_name);
  }
//Carousel 
  handleSelect = (selectedIndex, e)=> {
    this.setState({ 
      index: selectedIndex,
      direction: e.direction
    });
  }


  render() {
    const { selectedShop } = this.state;
    const { selectedLocation } = this.state;
    const { index, direction } = this.state;


    let shopElement;
    if(this.state.selectedShop){
     shopElement = this.state.selectedShop.items.map(i=>{
     return 

     <ProductCard key={i.item_name}
     photos={[i.image_url]}
     price={i.price}
     productName={i.item_name}
     description={"available_quantity : " + i.available_quantity}
     rating={"shop_id" + i.shop_id}
     url={"image_url : " + i.image_url}/>

         })
     }
     else
      {
           shopElement = <div style={{"margin": "auto", "fontStyle" : "italic" , "color": "#868080"}}>No result</div>
      }  
    return (

<div>
<div >
<AppNavbar auth={this.props.auth} />
</div>
        <div>
                
              <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect} >
                <Carousel.Item>
                  <img width={2000} height={100} alt="900x500" src="https://i.ibb.co/vBXk1N5/50597de0f1b1fda.jpg" />
                  <Carousel.Caption>
                    <h1 style={{fontStyle: 'italic', fontSize: '60px', margin:'300px'}}>Looking for Food</h1>
                    <p style={{fontStyle: 'italic', fontSize: '25px'}}>Find resturants.Order online.Get food delivered</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={2000} height={100} alt="900x500" src="https://i.ibb.co/vBXk1N5/50597de0f1b1fda.jpg" />
                  <Carousel.Caption>
                      <h1 style={{fontStyle: 'italic', fontSize: '60px', margin:'300px'}}>Looking for Food</h1>
                      <p style={{fontStyle: 'italic', fontSize: '25px'}}>Find resturants.Order online.Get food delivered</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={2000} height={100} alt="900x500" src="https://i.ibb.co/vBXk1N5/50597de0f1b1fda.jpg" />
                  <Carousel.Caption>
                    <h1 style={{fontStyle: 'italic', fontSize: '60px', margin:'300px'}}>Looking for Food</h1>
                    <p style={{fontStyle: 'italic', fontSize: '25px'}}>Find resturants.Order online.Get food delivered</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
      </div>



<div style={{"marginTop": "20px"}} className="container">
  <div className="row">
    <div className="col-sm-4">
    <Select
           value={selectedLocation}
           onChange={this.handleChangeLocation}
           options={this.state.locationOptions}
           placeholder={"Search for Location"}
          />
    </div>
    <div className="col-sm-8">
    <Select
           value={selectedShop}
           onChange={this.handleChangeShop}
           options={this.state.shopOptions}
           placeholder={"Search for resturants"}
          />
    </div>

  </div>
</div>

      
            <div style={this.foodResultStyle}>
                  {shopElement}        
            </div>
            <div>
            {this.state.error && <p>{this.state.error}</p>}
           </div>


      
            <div>
                        <section id="footer">
                            <ul class="icons">
                              <li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
                              <li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
                              <li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
                              <li><a href="#" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li>
                              <li><a href="#" class="icon fa-github"><span class="label">GitHub</span></a></li>
                            </ul>
                    <div class="copyright">
                      <ul class="menu">
                        <li>&copy; Untitled. All rights reserved.</li><li>Food Hub: <a href="Shopprofile.js">Shop Profile</a></li>
                      </ul>
                    </div>
                  </section>
            </div>


</div>
    );
  }
}

export default withRouter(Home);
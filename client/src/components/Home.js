// FoodApp.js  //CommentBox.js
import React, { Component } from 'react';
import Select from 'react-select'
import {ProductCard} from 'react-ui-cards';
import { Carousel } from 'react-bootstrap';
import '../CardsCustom.css';




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

  // loadLocations = () => {

  //   fetch('/api/shops')
  //     .then(data => data.json())
  //     .then((res) => {
  //       if (!res.success) this.setState({ error: res.error });
  //       else this.setState({ locationOptions: res.data.map(shop=>({ label: shop.address, value: shop })) })
  //     });
  // }


  // value={selectedLocation}
  // onChange={this.handleChange}
  // options={this.state.options}
  // placeholder={"Search for Location"}



  handleChangeLocation = (selectedLoca) => {

    this.setState({ shopOptions : [] });
    this.setState({ selectedShop : null });
    

    this.setState({ selectedLocation : selectedLoca.value });
 
    let shops = selectedLoca.value;  
    console.log(shops)
    this.setState({ shopOptions: shops.map(shop=>({ label: shop.shop_name, value: shop })) })
    

  }



  handleChangeShop = (selectedShp) => {
    console.log(selectedShp.value)
    this.setState({ selectedShop : selectedShp.value });
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
    if(this.state.selectedShop)
    {
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
        <div>
                
              <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect} >
                <Carousel.Item>
                  <img width={2000} height={250} alt="900x500" src="https://b.zmtcdn.com/images/foodshots/cover/pizza3.jpg" />
                  <Carousel.Caption>
                    <h1 style={{fontStyle: 'italic', fontSize: '60px', margin:'300px'}}>Looking for Food</h1>
                    <p style={{fontStyle: 'italic', fontSize: '25px'}}>Find resturants.Order online.Get food delivered</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={2000} height={250} alt="900x500" src="http://www.twitrcovers.com/wp-content/uploads/2013/10/Food-Cups-l.jpg" />
                  <Carousel.Caption>
                      <h1 style={{fontStyle: 'italic', fontSize: '60px', margin:'300px'}}>Looking for Food</h1>
                      <p style={{fontStyle: 'italic', fontSize: '25px'}}>Find resturants.Order online.Get food delivered</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={2000} height={250} alt="900x500" src="https://b.zmtcdn.com/images/foodshots/cover/pizza3.jpg" />
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
      </div>
    );
  }
}

export default Home;
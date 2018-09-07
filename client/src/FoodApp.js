// FoodApp.js  //CommentBox.js
import React, { Component } from 'react';
import Select from 'react-select'
import {ProductCard} from 'react-ui-cards';
import { Carousel } from 'react-bootstrap';
import './CardsCustom.css';




class FoodApp extends Component {
  constructor() {
    super();
    this.state = {

      index: 0,
      direction: null,

      data: [],
      error: null,
      
      selectedShop: null,
      selectedLocation: null,

      options : [],
      locationOptions : []
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
    // this.loadLocations();
  }


  loadFoodsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch('/api/foods/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });

      fetch('/api/shops/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  loadShops = () => {

    fetch('/api/shops')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else {
           this.setState({ options: res.data.map(shop=>({ label: shop.shop_name, value: shop })) })
           this.setState({ locationOptions: res.data.map(shop=>({ label: shop.address, value: shop })) }) 
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
    this.setState({ selectedLocation : selectedLoca.value });
  }

  handleChangeShop = (selectedShp) => {
    this.setState({ selectedShop : selectedShp.value });
  }

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
      return <ProductCard key={i.item_name}
      photos={[
        i.image_url 
      ]}
      price={i.price}
      productName={i.item_name}
      description={"available_quantity : " + i.available_quantity}
      rating={"shop_id" + i.shop_id}
      url={"image_url : " + i.image_url}
    />  })
     }else {
      shopElement = <div style={{"margin": "auto", "fontStyle" : "italic" , "color": "#868080"}}>No result</div>
     }  
    return (
      <div>
       
       <div>
         
       <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <img width={2000} height={250} alt="900x500" src="https://b.zmtcdn.com/images/foodshots/cover/pizza3.jpg" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={2000} height={250} alt="900x500" src="http://www.twitrcovers.com/wp-content/uploads/2013/10/Food-Cups-l.jpg" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={2000} height={250} alt="900x500" src="https://b.zmtcdn.com/images/foodshots/cover/pizza3.jpg" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

        
        </div>



<div style={{"marginTop": "20px"}} class="container">
  <div class="row">
    <div class="col-sm-4">
    <Select
           value={selectedLocation}
           onChange={this.handleChangeLocation}
           options={this.state.locationOptions}
           placeholder={"Search for Location"}
          />
    </div>
    <div class="col-sm-8">
    <Select
           value={selectedShop}
           onChange={this.handleChangeShop}
           options={this.state.options}
           placeholder={"Search for resturants"}
          />
    </div>

  </div>
</div>

        <div style={this.foodResultStyle}>
            {shopElement}        
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default FoodApp;
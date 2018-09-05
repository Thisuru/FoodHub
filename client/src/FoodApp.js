// FoodApp.js
import React, { Component } from 'react';
import Select from 'react-select'
import {ProductCard} from 'react-ui-cards';


class FoodApp extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      selectedShop: null,

      options : []
    };

    this.searchBarStyle = {
      "margin": "auto",
      "width": "50%",
      "padding": "10px",
      "margin-top": "30px"
    }

    this.foodResultStyle = {
      "margin": "auto",
      "width": "84%",
      "padding": "10px",
      "display": "flex",
      "background-color": "#efefeff2"
    }



  }


  componentDidMount() {
    this.loadShops();
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
  }

  loadShops = () => {

    fetch('/api/shops')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ options: res.data.map(shop=>({ label: shop.shop_name, value: shop })) })
      });
  }

  handleChange = (selectedShp) => {
    this.setState({ selectedShop : selectedShp.value });
  }


  render() {
    const { selectedShop } = this.state;
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
      rating={5}
      url={"image_url : " + i.image_url}
    />  })
     }else {
      shopElement = <div style={{"margin": "auto", "fontStyle" : "italic" , "color": "#868080"}}>No result</div>
     }  
    return (
      <div className="container">
      <div style={{width: '100%', height : '250px', maxWidth:"100%", maxHeight:"100%", backgroundImage: `url(https://previews.123rf.com/images/lukpedclub/lukpedclub1706/lukpedclub170600186/81161826-thai-food-and-fresh-ingredients-on-wooden-background-flat-design-vector-for-banner-website-cover-or-.jpg)`}}></div>
        
        <div style={this.searchBarStyle}>
          <Select
           value={selectedShop}
           onChange={this.handleChange}
           options={this.state.options}
           placeholder={"Search for resturants"}
          />
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
// FoodApp.js
import React, { Component } from 'react';
import FoodList from './FoodList';
import DATA from './data';
import Select from 'react-select'
import {ProductCard} from 'react-ui-cards';


class FoodApp extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      author: '',
      text: '',
      selectedShop: null,

      options : [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    };

    this.pollInterval = null;
    this.searchBarStyle = {
      "width" : "50%"
    }



  }

  

  componentDidMount() {
    this.loadShops();
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
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
    console.log(`Option selected:`, selectedShp);
    this.loadShops();
  }


  render() {
    const { selectedShop } = this.state;
     let shopElement;
     if(this.state.selectedShop){
      shopElement = this.state.selectedShop.items.map(i=>{
      return <ProductCard key={i.item_name}
      photos={[
        'https://i.imgur.com/t7DTziH.jpg',
        'https://i.imgur.com/kA5lx6t.jpg',
        'https://i.imgur.com/cUsl6Gs.jpg'
      ]}
      price={i.price}
      productName={i.item_name}
      description={"available_quantity : " + i.available_quantity}
      rating={5}
      url={"image_url : " + i.image_url}
    />  })
     }else {
      shopElement = <div>No result</div>
     }  
    return (
      <div className="container">
      <h2>FoodList:</h2>
        <div style={this.searchBarStyle}>
          <Select
           value={selectedShop}
           onChange={this.handleChange}
           options={this.state.options}
          />
        </div>
        <div >
            {shopElement}        
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default FoodApp;
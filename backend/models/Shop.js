import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    item_name : String,
    available_quantity : String,
    image_url : String,
    shop_id : String,
    price : String,
    text: String,
  }, { timestamps: true });

const ShopSchema = new Schema({
    shop_name : String,
    address : String,
    image_url : String,
    description : String,
    shop_id : String,
    items : [FoodSchema] 
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Shop', ShopSchema);
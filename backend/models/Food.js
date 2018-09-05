import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const FoodSchema = new Schema({
  item_name : String,
  available_quantity : String,
  image_url : String,
  shop_id : String,
  price : String,
  text: String,
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Food', FoodSchema);
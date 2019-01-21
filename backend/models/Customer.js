import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    custname: String,
    email : String,
    address : String,
  }, { timestamps: true });


// export our module to use in server.js
export default mongoose.model('Customer', CustomerSchema);  
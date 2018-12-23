// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';

// Data access models
import Food from './models/Food';
import Shop from './models/Shop';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// router.get('/foods', (req, res) => {
//     console.log(req.query.location + "location")
    
//     Food.find({"author" : "53"}, (err, foods) => {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true, data: foods });
//     });
//   });


//get shop_name from db
router.get('/foods', (req, res) => {
  console.log("req.query");
  console.log(req.query.key);
  Shop.find({"shop_name" : req.query.key}, (err, foods) => {
    
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: foods });
  });
});


//get shops from db according to address  
router.get('/shops', (req, res) => {
    Shop.aggregate([
      {$group: {
          _id: "$address",
          shops: {$push: "$$ROOT"}
      }}
    ], (err, shops) => {
        console.log(shops);
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: shops });
    });
  }); 



  //Insert a shop in to the database
  router.post('/ninjas', function(req,res) {
    Shop.create(req.body).then(function(Shop){
        res.send(Shop);
      }); 
  });

  
  //Insert an item in to the database
  router.post('/fooditem/:id', function(req,res) {
    Shop.findByIdAndUpdate(
      {_id: req.params.id},
      { $push: {"items": req.body}},
      {  safe: true, upsert: true},
        function(err, model) {
          if(err){
           console.log(err);
           return res.send(err);
          }{
            console.log("req.body =>");
            console.log(req.body);
           return res.json(model);
          }
       }); 
  });


  //Delete a whole shop
  router.delete('/ninjas/:id', function(req,res){
    Shop.findByIdAndRemove({_id: req.params.id}).then(function(Shop){
        res.send(Shop);
    });
  });


 

  //Update a shop property
  router.put('/ninjas/:id', function(req,res){
    Shop.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      Shop.findOne({_id: req.params.id}).then(function(Shop){
        res.send(Shop);
      });
    });
  });


//ratings not complete
  router.post('/ratings', (req, res) => {
    Shop.find({ rating:req.body.rating }, (err, shops) => {
       
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: shops });
    });
  });


  //Not used yet
router.post('/foods', (req, res) => {
    const food = new Food();
    // body parser lets us use the req.body
    const { item_name,  available_quantity, image_url , shop_id, price } = req.body;
    if (!author || !text || !item_name || !available_quantity || !image_url || !shop_id || !price) {
      // we should throw an error. we can do this check on the front end
      return res.json({
        success: false,
        error: 'You must provide an author and comment'
      });
    }
    food.author = author;
    food.text = text;
    food.item_name = item_name;
    food.available_quantity = available_quantity;
    food.image_url = image_url;
    food.shop_id = shop_id;
    food.price = price;
    food.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));router.get('/foods', (req, res) => {
  console.log(req.query.location + "location")
  
  Food.find({"author" : "53"}, (err, foods) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: foods });
  });
});
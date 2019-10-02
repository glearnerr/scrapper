const axios = require("axios");
const mongoose = require("mongoose");
const https = require("https");

const ProductSchema = require("./models/Products");
const config = require("./config");

let cachedDb = null;
const connectToDatabase = () => {
  if (cachedDb) {
    console.log("=> using cached database instance");
    return Promise.resolve(cachedDb);
  }
  return mongoose.connect(config.database, { useNewUrlParser: true });
};

//global variables
let max = 100;
let offset = 6400;

//main function starts here

const callMain = () => {
  offset = offset + 100;
  let url = config.url + `&offset=${offset}&max=${max}`;
  console.log(url);
  axios
    .get(url)
    .then(res => {
      if (res && res.data && res.data.length > 0) {
        console.log("=======Downloading Product Data======");
        let bulk = ProductSchema.collection.initializeUnorderedBulkOp();
        console.log("=======Downloaded Product Data======");
        console.log("=======Updating Product Database======");
        let results = res.data;
        let objectArr = [];
        results.map(result => {
          let imgUrl = result.products[0].targetInfo.imageUrl;
          let tcin = result.products[0].tcin;
          objectArr.push({
            imgUrl,
            tcin
          });
          bulk
            .find({ urlId: result.urlId })
            .upsert()
            .updateOne({ ...result });
        });
        //bulk data saving in mongodb
        bulk.execute();
        console.log("=======Product Database Updated======");
      } else {
        console.log("=======Done======");
      }
    })
    .catch(e => {
      console.log(e);
    });
};

connectToDatabase()
  .then(function(client) {
    if (cachedDb === null) {
      cachedDb = client.connection;
    }
    try {
      callMain();
    } catch (e) {
      console.error(e);
    }
  })
  .catch(e => {
    console.error(e);
  });

module.exports = { callMain };

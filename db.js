const { MongoClient } = require('mongodb');
const User = require('./models/User');
const Fund = require('./models/Fund');

const uri = 'mongodb+srv://administrator:GVeBDO5x2KwqeSqP@hedgeme.gyxidmn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDb = async () => {
  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db('users');
  return db;
};




module.exports = {
  connectToDb,
  User,
  Fund,
};

const mongoose = require('mongoose');

require('dotenv').config()

const uri = process.env.MONGODB_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


// mongoose.connect('mongodb://localhost:27017/cinema-plus', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true

// })
// .then(() => console.log('MongoDB Connected...'))
// .catch(err => console.log(err));

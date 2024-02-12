const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// route paths
const userRoutes = require('./src/routes/auth.route');
const todoRoutes = require('./src/routes/todo.route');


const app = express();
dotenv.config();

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse incoming requests with JSON payloads and returns them as a JavaScript object.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse incoming requests with urlencoded payloads and returns them as a JavaScript object.
app.use(cors('*')); // Enable All CORS 

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Memories API");
});

app.use('/auth', userRoutes);
app.use('/todo', todoRoutes);

// define the server port 
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });


// port listner
app.listen(PORT, () =>  {console.log(`Server running on port: ${PORT}`)});

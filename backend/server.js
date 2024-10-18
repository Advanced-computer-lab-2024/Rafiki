// require('dotenv').config()

// const express = require('express')
// const mongoose = require('mongoose')
// const workoutRoutes = require('./routes/workouts')
// const touristRoutes = require('./routes/TouristRoute')
// const advertiserRoutes = require('./routes/AdvertiserRoute')
// const activityRoutes = require('./routes/activityRoute')
// const tourGuideRoutes = require('./routes/tourguideRoutes')
// const adminRoutes = require('./routes/adminRoute')
// const sellerRoutes = require('./routes/sellerRoute')
// const itineraryRoutes = require('./routes/itineraryRoutes')
// const categoryRoutes = require('./routes/categeryRoute'); // Adjust the path as necessary
// const TagRoute=require('./routes/TagRoute')
// // const categoryRoutes = require('./routes/categeryRoute') // Adjust the path as necessary
// const museumRoutes = require('./routes/museumRoute')
// const productRoutes = require('./routes/productsRoute');
// // express app
// const app = express()

// // middleware
// app.use(express.json())

// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   next()
// })

// // routes
// app.use('/api/categoryRoutes', categoryRoutes);
// app.use('/api/workouts', workoutRoutes)
// app.use('/api/TouristRoute',touristRoutes )
// app.use('/api/AdvertiserRoute',advertiserRoutes )
// app.use('/api/ActivityRoute',activityRoutes )
// app.use('/api/tourguideRoute',tourGuideRoutes )
// app.use('/api/adminRoute',adminRoutes )
// app.use('/api/sellerRoute',sellerRoutes )
// app.use('/api/itineraryRoute', itineraryRoutes);
// app.use('/api/TagRoute',TagRoute)

// app.use('/api/museumRoute', museumRoutes)
// app.use('/api/productsRoute', productRoutes)

// // connect to db
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('connected to database')
//     // listen to port
//     app.listen(process.env.PORT, () => {
//       console.log('listening for requests on port', process.env.PORT)
//     })
//   })
//   .catch((err) => {
//     console.log(err)
//   }) 
// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Import routes
const workoutRoutes = require('./routes/workouts');
const touristRoutes = require('./routes/TouristRoute');
const advertiserRoutes = require('./routes/AdvertiserRoute');
const activityRoutes = require('./routes/activityRoute');
const tourGuideRoutes = require('./routes/tourguideRoutes');
const adminRoutes = require('./routes/adminRoute');
const sellerRoutes = require('./routes/sellerRoute');
const itineraryRoutes = require('./routes/itineraryRoutes');
const categoryRoutes = require('./routes/categeryRoute'); // Adjust the path as necessary
const tagRoutes = require('./routes/TagRoute'); // Adjust the path as necessary
const museumRoutes = require('./routes/museumRoute');
const productRoutes = require('./routes/productsRoute');
const uploadRoute = require('./routes/documentRoute');
// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Route definitions
app.use('/api/categoryRoutes', categoryRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/TouristRoute', touristRoutes);
app.use('/api/AdvertiserRoute', advertiserRoutes);
app.use('/api/ActivityRoute', activityRoutes);
app.use('/api/tourguideRoute', tourGuideRoutes);
app.use('/api/adminRoute', adminRoutes);
app.use('/api/sellerRoute', sellerRoutes);
app.use('/api/itineraryRoute', itineraryRoutes);
app.use('/api/tagRoute', tagRoutes);
app.use('/api/museumRoute', museumRoutes);
app.use('/api/productsRoute', productRoutes);
app.use('/api', uploadRoute);
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');

    // Start the server and listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Listening for requests on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

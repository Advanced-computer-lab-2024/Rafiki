require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const touristRoutes = require('./routes/TouristRoute')
const advertiserRoutes = require('./routes/AdvertiserRoute')
const activityRoutes = require('./routes/activityRoute')
const tourGuideRoutes = require('./routes/tourguideRoutes')
const adminRoutes = require('./routes/adminRoute')
const sellerRoutes = require('./routes/sellerRoute')
const itineraryRoutes = require('./routes/itineraryRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/TouristRoute',touristRoutes )
app.use('/api/AdvertiserRoute',advertiserRoutes )
app.use('/api/ActivityRoute',activityRoutes )
app.use('/api/tourguideRoute',tourGuideRoutes )
app.use('/api/adminRoute',adminRoutes )
app.use('/api/sellerRoute',sellerRoutes )
app.use('/api/itineraryRoute', itineraryRoutes);
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
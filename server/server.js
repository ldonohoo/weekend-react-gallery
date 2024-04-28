const express = require('express');
const app = express();
const gallery = require('./routes/gallery.router.js');
const PORT = process.env.PORT || 5001;
// I wasn't going to include this because I didn't know what it does, then
//  I got some sort of network error and this fixed it.
// you are supposed to need CORS when you want to pull data from external APIs
//  that are public or authorized? so some sort of authority thing?
const cors = require('cors')

 
app.use(cors());

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/gallery', gallery);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
  console.log('Listening on port: ', PORT);
});

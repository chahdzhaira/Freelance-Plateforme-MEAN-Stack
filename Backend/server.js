const express = require("express");
const cors = require('cors');
const mongoose = require ("mongoose");
require('dotenv').config();



const app = express() ;
// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));
app.get('/', (req, res) => {
    res.send('server work')
});



app.listen(5000, ()=>{
    console.log('server work');
})


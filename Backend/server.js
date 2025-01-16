const express = require("express");
const cors = require('cors');
const mongoose = require ("mongoose");
require('dotenv').config();
const userRoute = require("./routes/userRoute");
const serviceRoute = require("./routes/serviceRoute")
const proposalRoute = require("./routes/proposalRoute")

const app = express() ;
// Middleware pour analyser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour analyser les requêtes de type URL-encoded

app.use(cors());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));
app.get('/', (req, res) => {
    res.send('server work')
});

app.use('/users' , userRoute) ;
app.use('/services ', serviceRoute) ;
app.use('/proposals' , proposalRoute) ;





app.listen(5000, ()=>{
    console.log('server work');
})


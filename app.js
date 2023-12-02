require('dotenv').config(); // Asegúrate de instalar el paquete 'dotenv' y crear un archivo '.env'
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const port = process.env.PORT || 3000; 

// BodyParser Middleware
app.use(bodyParser.json());

// Activar CORS para todas las rutas
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI) 
.then(() => console.log('Conexión a MongoDB Atlas exitosa'))
.catch(err => console.error('Error conectando a MongoDB Atlas', err));

// Routes
app.use('/tickets', ticketRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

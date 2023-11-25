const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const ticketRoutes = require('./routes/ticketRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');

const app = express();
const port = 3000;

// BodyParser Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://myAtlasDBUser:castillo2030*@myatlasclusteredu.gawksjl.mongodb.net/UTNFRA2')
.then(() => console.log('Conexión a MongoDB Atlas exitosa'))
.catch(err => console.error('Error conectando a MongoDB Atlas', err));

// Routes
app.use('/tickets', ticketRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

const express = require('express');
const cors = require('cors'); // Importa cors
const app = express();
const port = 4000;
const morgan = require('morgan');
const taskRoutes = require('./routes/task.routes');

// Middleware para habilitar CORS
app.use(cors());

// Middleware para mostrar los logs de las solicitudes
app.use(morgan('dev'));

// Rutas
app.use(taskRoutes);

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});

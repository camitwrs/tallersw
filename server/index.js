const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const preguntaRoutes = require("./routes/pregunta.routes");
const app = express();
const port = 4000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para mostrar los logs de las solicitudes
app.use(morgan("dev"));

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json());  // Asegúrate de tener esto aquí

// Rutas
app.use(preguntaRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});

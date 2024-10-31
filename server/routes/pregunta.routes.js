const {
  getPreguntas,
  getPreguntasPorCategoria,
  getPreguntasPorId,
  getPreguntasD5,
  getPreguntasPorItem,
} = require("../controllers/pregunta.controller");

const { Router } = require("express");

const router = Router();

router.get("/preguntas", getPreguntas);
router.get("/preguntas/:categoria", getPreguntasPorCategoria);
router.get("/preguntas_id/:id", getPreguntasPorId);
router.get("/preguntasD5", getPreguntasD5);

// Corrección en la ruta para preguntas por item
router.get("/preguntasporitem/:item", getPreguntasPorItem);

router.post("/preguntacrear", (req, res) => {
  res.send("Creando preguntas");
});
router.delete("/preguntaeliminar", (req, res) => {
  res.send("Eliminando preguntas");
});
router.put("/preguntaactualizar", (req, res) => {
  res.send("Actualizar preguntas");
});

module.exports = router;

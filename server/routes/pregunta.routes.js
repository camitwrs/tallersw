const {
  getPreguntas,
  getAlternativas,
  getPreguntasPorCategoria,
  getPreguntasPorId,
  getPreguntasPorItem,
  getUniversidades,
  crearPersona,
  crearEducador,
  getCantidadPersonas,
  crearRespuesta,
  crearIlustracion
} = require("../controllers/pregunta.controller");

const { Router } = require("express");

const router = Router();
router.get("/cantidad_personas", getCantidadPersonas);
router.get("/preguntas", getPreguntas);
router.get("/preguntas/:categoria", getPreguntasPorCategoria);
router.get("/preguntas_id/:id", getPreguntasPorId);
router.get("/uni", getUniversidades);

router.get("/alternativas", getAlternativas);

// Corrección en la ruta para preguntas por item
router.get("/preguntasporitem/:item", getPreguntasPorItem);
//-------------------------------------------------------------------
router.post("/preguntacrear", (req, res) => {
  res.send("Creando preguntas");
});
router.post("/crearPersona", crearPersona);
router.post("/crearEducador", crearEducador);
router.post("/crearRespuesta", crearRespuesta);
router.post("/crearIlustracion", crearIlustracion);


router.delete("/preguntaeliminar", (req, res) => {
  res.send("Eliminando preguntas");
});
router.put("/preguntaactualizar", (req, res) => {
  res.send("Actualizar preguntas");
});

module.exports = router;

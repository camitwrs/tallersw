const { getPreguntas, getPreguntasPorCategoria } = require('../controllers/task.controller')

const { Router } = require("express");

const router = Router();

router.get('/preguntas', getPreguntas)
router.get('/preguntas/:categoria', getPreguntasPorCategoria);



router.post('/taskcrear', (req, res) => {
    res.send("Creando lista de tareas");
})
router.delete('/taskeliminar', (req, res) => {
    res.send("Eliminando lista de tareas");
})
router.put('/taskactalizar', (req, res) => {
    res.send("Actualizar lista de tareas");
})



module.exports = router;
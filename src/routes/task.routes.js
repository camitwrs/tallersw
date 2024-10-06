const { getTask } = require('../controllers/task.controller')

const { Router } = require("express");
const pool = require('../pg');

const router = Router();

router.get('/task', getTask)
router.post('/task', (req, res) => {
    res.send("Creando lista de tareas");
})
router.delete('/task', (req, res) => {
    res.send("Eliminando lista de tareas");
})
router.put('/task', (req, res) => {
    res.send("Actualizar lista de tareas");
})

router.get('/task/10', (req, res) => {
    res.send("Retornando una sola tarea");
})

module.exports = router;
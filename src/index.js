const express = require('express');
const app = express();
const port = 4000;
const morgan = require('morgan');
const taskRoutes = require('./routes/task.routes');


app.use(morgan('dev'))

app.use(taskRoutes);

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});

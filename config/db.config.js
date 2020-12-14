const mongoose = require('mongoose');


//Confgiguracion de la conexion a la base de datos
mongoose
  .connect("mongodb://localhost/proyectoWeb", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));
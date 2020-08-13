const express = require('express');
const conectarDB = require('./config/db');

const app = express();

conectarDB();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));

app.listen(port, '0.0.0.0', () => {
  console.log('El servidor esta funcionando en el puerto ' + port);
});
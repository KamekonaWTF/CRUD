const express = require('express')
const app = express()

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }
    usuarios.push(nuevoUsuario)
    res.redirect("/usuarios")
})

app.get('/usuarios/:nombre',(req, res) => {
    const nombre = req.params.nombre
    const usuario = usuarios.find(user => user.nombre === nombre)

    if(!usuario) {
        res.status(404).json({mensaje: 'Usuario no encontrado'})
    } else {
        res.json(usuarios)
    } 
})

app.put('/usuarios/:nombre',(req, res) => {
    const nombreUsuario = req.params.nombre;
    const index = usuarios.findIndex(usuario => usuario.nombre === nombreUsuario)

    if (index != -1) {
        usuarios[index] = {id: usuarios[index].id, ...req.body}
        res.jason(usuarios)
    } else {
        res.status(404).json({mensaje:'usuario no encontrado'})
    }
})

app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre
    usuarios = usuarios.filter(usuario => usuario.nombre !== nombre)
    res.json({mensaje:'Usuario eliminado'})
})

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000')
})
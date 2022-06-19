const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//Get All Users
router.get('/users', (req, res) =>{
    mysqlConnection.query('SELECT * FROM usuarios', (err, rows, filds) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

//Get by ID User
router.get('/users/:id', (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE idusuarios = ?', [id], (err, rows, filds) => {
        if(!err){
            res.json(rows);

        }else{
            console.log(err);
        }
    })
});

//Get By UserName AND Password
router.get('/users/:userName/:password', (req, res) =>{
    const {userName} = req.params;
    const {password} = req.params
    mysqlConnection.query('SELECT * FROM usuarios WHERE nombreUsuario = ? AND contrasenaUsuario = ?', [userName, password], (err, rows, filds) => {
        if(!err){
        const arreglo = res.json(rows[0]);

        }else{
            console.log(err);
        }
    })
});
 
//Save new User
router.post('/users/', (req,res) => {
    const {nombre, correo, contrasena} = req.body;
    const query = 'CALL str_AddUser(?,?,?)';

    mysqlConnection.query(query, [nombre,correo,contrasena], (err, rows, filds) => {
        if(!err){
            res.json({Status: 'User Saved'})
    
            }else{
                console.log(err);
            }
    }) 
})

//Delete User
router.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE idusuarios = ?', [id], (err, rows, filds) => {
        if(!err){
            res.json({Status: 'User Deleted'})
    
            }else{
                console.log(err);
            }
    })
})

//Get all Products
router.get('/pizzas', (req, res) =>{
    mysqlConnection.query('SELECT * FROM productos', (err, rows, filds) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

//Update Product
router.put('/pizzas/:id', (req, res) =>{
    const{id}= req.params
    const {nombreProducto, descripcionProducto, precioProducto, imageUrl} = req.body
    const query = 'CALL str_modifyPizza(?,?,?,?,?)';

    mysqlConnection.query(query, [id, nombreProducto, descripcionProducto, precioProducto, imageUrl], (err, rows, filds) => {

        if(!err){
            res.json({Status: 'Pizza Updated'});
        }else{
            console.log(err);
        }
    })
})
router
module.exports = router;
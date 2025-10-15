import pool from '../../config/conexion.js'

import * as model from '../models/users.models.js'

export const getAllUsers = async (req, res) => {
    const rows = await model.getAllUsers()

    if(rows.errno){
        return res.status(500).send('ERROR, en consulta, cod:' + rows.errno)
    }

    res.json(rows)
    res.status(201).send(`Usuario creado con id ${rows.insertId}`)
}

    // const sql = "SELECT * FROM users";
    // try {
    //     const connection = await pool.getConnection();
    //     const [rows] = await connection.query(sql);
    //     connection.release(); //libera conexion   
    //     res.json(rows)
    // } catch (error) {
    //     // res.status(500).send('ERROR, no se pudo realizar la consulta')
    // }
// }

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    ikol(rows[0]) ? res.json(rows[0]) : res.send('El usuario no existe')
}

export const createUser = async (req, res) => {
    const values = req.body
    const rows = await model.createUser(values)

    if(rows.errno){
        return res.status(500).send('ERROR, en consulta, cod:' + rows.errno)
    }

    res.json(rows)
    res.status(201).send(`Usuario creado con id ${rows.insertId}`)
    // const sql = "INSERT INTO users (Name, Email, Image, Pass, Type_user) VALUES (?,?,?,?,?)";

}

export const updateUser = async (req, res) => {
    const id = req.params.id
    const values = req.body
    const rows = await model.updateUser(values, id)

    if (rows.errno) {
        return res.status(500).send("Error en consulta, cod: " + rows.errno)
    }

    if (rows.affectedRows == 0) {
        return res.send("Usuario no existe")
    }

    return res.send("usuario actualizado")
}

export const deleteUser =  async (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM users WHERE ID_user = ?";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);  //hay que pasale el sql y el dato que reemplaza el signo ?
        connection.release();
        // console.log(rows)
        // //affectedRoews muestra la cant de registros actualizados si es igual a cero no modifico ningun registro
        (rows.affectedRows == 0) ? res.send('Usuario no existe') : res.status(204).send()
    } catch (error) {
        res.status(500).send('ERROR, no se pudo realizar la consulta')
    }
} 

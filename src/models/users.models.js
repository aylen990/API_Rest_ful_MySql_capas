import pool from '../../config/conexion.js'
export const getAllUsers = async (req, res) => {
    const sql = "SELECT * FROM users";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release(); //libera conexion   
        res.json(rows)
    } catch (error) {
        // res.status(500).send('ERROR, no se pudo realizar la consulta')
    }
}

export const getUserById = async (id) => {
    const sql = "SELECT * FROM users WHERE ID_user = ?";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        return rows
    } catch (error) {
        return    
    }
}

export const createUser = async ()=> {
    const sql = 'INSERT INTO users SET ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [values]); 
        connection.release();
        return rows

    } catch (error){
        return error
    }
}

const updateUser = async (newValues, id) => {
    const sql = 'UPDATE users SET ? WHERE ID_user = ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [newValues, id]); 
        connection.release();
        return rows

    } catch (error){
        return error
    }
}
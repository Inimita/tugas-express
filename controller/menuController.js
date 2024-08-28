import db from "../connection.js";

export const getMenu = (req, res) => {
    const sql = "SELECT * FROM menu"
    db.query(sql, (error, result) => 
    res.send(result)
    )
}

export const getMenuById = (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM menu WHERE id = ${id}`
    db.query(sql, (error, result) => 
        res.json(result)
        )
}

export const createNewMenu = (req, res) => {
    const data = req.body
    const sql = "INSERT INTO menu SET ?"
    db.query(sql, data, (error, result) => {
        if(error){
            res.status(400)
            res.send(error)
        }
        
        res.json(result);
    })
}

export const updateMenu = (req, res) => {
    const data = { ...req.body };
    const id = req.params.id
    const querySearch = `SELECT * FROM menu WHERE id = ${id}`;
    const queryUpdate = `UPDATE menu SET ? WHERE id = ${id}`;
  
    db.query(querySearch, req.params.id, (err, rows, field) => {
      if (err) {
        return res.status(500).json({ message: "Ada kesalahan", error: err });
      }
  
      if (rows.length) {
        db.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
          if (err) {
            return res.status(500).json({ message: "Ada kesalahan", error: err });
          }
  
          res
            .status(200)
            .json({ success: true, message: "Berhasil update data!" });
        });
      } else {
        return res
          .status(404)
          .json({ message: "Data tidak ditemukan!", success: false });
      }
    });
}

export const deleteMenu = (req, res) => {
    const kode_menu = req.query.kode_menu;
    const sql =`DELETE FROM menu WHERE id = ${req.params.id}`
    db.query(sql, [kode_menu], (error, result) => {
        if(error){
            res.status(400)
            res.send(error)
        }

        res.status(200)
        res.json("data berhasil dihapus")
    })
}
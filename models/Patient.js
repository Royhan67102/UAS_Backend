const db = require("../config/database");

class Patient {
    static all() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM patients";
            db.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static async create(data) {
        const id = await new Promise((resolve, reject) => {
            const sql = "INSERT INTO patients SET ?";
            db.query(sql, data, (err, results) => {
                if (err) reject(err);
                resolve(results.insertId);
            });
        });

        const patient = await this.find(id);
        return patient;
    }

    static async find(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients WHERE id = ?";
            db.query(sql, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static async update(id, data) {
        await new Promise((resolve, reject) => {
            const sql = "UPDATE patients SET ? WHERE id = ?";
            db.query(sql, [data, id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        const patient = await this.find(id);
        return patient;
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM patients WHERE id = ?";
            db.query(sql, [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static searchByName(name) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients WHERE name LIKE ?";
            db.query(sql, [`%${name}%`], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static findByStatus(status) {
      return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM patients WHERE status = ?";
          db.query(sql, [status], (err, results) => {
              if (err) reject(err);
              resolve(results);
          });
      });
  }
}

module.exports = Patient;
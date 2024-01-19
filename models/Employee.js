// import database
const db = require("../config/database");

// membuat class Employee
class Employee {
  // buat fungsi
  static all() {
    return new Promise((resolve, reject) => {
      // Melakukan query ke db untuk ambil data
      const sql = "SELECT * FROM employees";
      db.query(sql, (sql, results) => {
          resolve(results);
      });
    });
  }

  // Promise 1
  static async create(Employee) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO employees SET ?";
      db.query(sql, Employee, (err, results) => {
        resolve(results.insertId);
      });
    });


    // Promise 2
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE id = ?`;
      db.query(sql, id, (err, results) => {
          resolve(results);
      });
  });
}

  static find(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM employees WHERE id = ?`;
        db.query(sql, id, (err, results) => {
            resolve(results[0]);
        });
    });
  }

  static async update(id, data) {
    // Update data
    await new Promise((resolve, reject) => {
        const sql = "UPDATE employees SET ? WHERE id = ?";
        db.query(sql, [data, id], (err, results) => {
            resolve(results);
        });
    });

    const employee = await this.find(id);
    return employee;
}

static async delete(id) {
    return new Promise((resolve, reject) => {
        // query sql
        const sql = "DELETE FROM employees WHERE id = ?";
        db.query(sql, id, (err, results) => {
            resolve(results);
        });
    });
}
}

// export class Employee
module.exports = Employee;

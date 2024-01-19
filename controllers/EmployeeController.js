// import Model Employee
const Employee = require("../models/Employee")
// buat class EmployeeController
class EmployeeController {
  // buat fungsi
  async index(req, res) {
    const employees = await Employee.all();

    const data = {
      messange: "Menampilkan data employee",
      data: employees
    };

    res.status(200).json(data);
  }

  async store(req, res) {
    const employees = await Employee.create(req.body);
    const data = {
      messange: "Menambahkan data employee",
      data: employees,
    };

    res.status(201).json(data);
  }

  async update(req, res) {
    const { id } = req.params;

    const employees = await Employee.find(id);

    if (employees) {
      // update data
      const employeeUpdated = await Employee.update(id,req.body);
      const data = {
        messange: "Mengupdate data employee",
        data: employeeUpdated,
      };

      res.status(200).json(data);
    }
    else {
      // kirim data tidak ada
      const data = {
        messange: "Data tidak ada",
      };

      res.status(404).json(data);
    }


  }


  async destroy(req, res) {
    const { id } = req.params;
    const employee = await Employee.fin(id);

    if (employee) {
      // Hapus data
      await Employee.delete(id);
      const data = {
        messange: "Menghapus data employee",
      };
      
      res.status(200).json(data);
    }
    else {
      // Data tidak ada
      const data = {
        messange: "Data tidak ada",
      };

      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const employee = await Employee.find(id);

    if (employee) {
      const data = {
        messange: "Menampilkan detail data employee",
        data: employee,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        messange: "Data tidak ada",
      };

      res.status(404).json(data);
    }

  }
}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;

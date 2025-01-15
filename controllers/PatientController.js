const Patient = require("../models/Patient");

class PatientController {
    async index(req, res) {
        const patients = await Patient.all();

        if (patients.length > 0) {
            const data = {
                message: "Get all resource",
                data: patients,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Data is empty",
                data: patients,
            };
            res.status(200).json(data);
        }
    }

    async store(req, res) {
        const { name, phone, address, status, in_date_at, out_date_at } = req.body;

        if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
            const data = {
                message: "All fields must be filled correctly",
            };
            return res.status(422).json(data);
        }

        try {
            const patient = await Patient.create(req.body);
            const data = {
                message: "Resource is added successfully",
                data: patient,
            };
            return res.status(201).json(data);
        } catch (error) {
            const data = {
                message: "Gagal menambahkan data pasien",
                error: error.message,
            };
            return res.status(500).json(data);
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, phone, address, status, in_date_at, out_date_at } = req.body;

        if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
            const data = {
                message: "Semua data harus dikirim",
            };
            return res.status(422).json(data);
        }

        try {
            const patient = await Patient.find(id);

            if (patient) {
                const updatedPatient = await Patient.update(id, req.body);
                const data = {
                    message: "Resource is update successfully",
                    data: updatedPatient,
                };
                res.status(200).json(data);
            } else {
                const data = {
                    message: "Resource not found",
                };
                res.status(404).json(data);
            }
        } catch (error) {
            const data = {
                message: "Gagal mengedit data pasien",
                error: error.message,
            };
            res.status(500).json(data);
        }
    }

    async destroy(req, res) {
        const { id } = req.params;

        if (!id) {
            const data = {
                message: "ID harus dikirim",
            };
            return res.status(422).json(data);
        }

        try {
            const patient = await Patient.find(id);

            if (patient) {
                await Patient.delete(id);
                const data = {
                    message: "Resource is delete successfully",
                };
                res.status(200).json(data);
            } else {
                const data = {
                    message: "Resource not found",
                };
                res.status(404).json(data);
            }
        } catch (error) {
            const data = {
                message: "Gagal menghapus data pasien",
                error: error.message,
            };
            res.status(500).json(data);
        }
    }

    async show(req, res) {
        const { id } = req.params;

        if (!id) {
            const data = {
                message: "ID harus dikirim",
            };
            return res.status(422).json(data);
        }

        try {
            const patient = await Patient.find(id);

            if (patient) {
                const data = {
                    message: "Menampilkan detail pasien",
                    data: patient,
                };
                res.status(200).json(data);
            } else {
                const data = {
                    message: "Pasien tidak ditemukan",
                };
                res.status(404).json(data);
            }
        } catch (error) {
            const data = {
                message: "Gagal menampilkan detail pasien",
                error: error.message,
            };
            res.status(500).json(data);
        }
    }

    async search(req, res) {
        const { name } = req.params;

        if (!name) {
            const data = {
                message: "Nama harus dikirim",
            };
            return res.status(422).json(data);
        }

        try {
            const patients = await Patient.searchByName(name);

            if (patients.length > 0) {
                const data = {
                    message: "Get searched resource",
                    data: patients,
                };
                res.status(200).json(data);
            } else {
                const data = {
                    message: "Resource not found",
                    data: patients,
                };
                res.status(404).json(data);
            }
        } catch (error) {
            const data = {
                message: "Gagal mencari pasien",
                error: error.message,
            };
            res.status(500).json(data);
        }
    }

    async findByStatus(req, res) {
      const { status } = req.params;

      if (!status) {
          const data = {
              message: "Status harus dikirim",
          };
          return res.status(422).json(data);
      }

      try {
          const patients = await Patient.findByStatus(status);

          if (patients.length > 0) {
              const data = {
                  message: `Get positive resource ${status}`,
                  data: patients,
              };
              res.status(200).json(data);
          } else {
              const data = {
                  message: `Resource not found ${status}`,
                  data: patients,
              };
              res.status(404).json(data);
          }
      } catch (error) {
          const data = {
              message: `Gagal mencari pasien dengan status ${status}`,
              error: error.message,
          };
          res.status(500).json(data);
      }
  }
}

const object = new PatientController();
module.exports = object;
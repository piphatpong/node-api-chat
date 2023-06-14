const db = require("../register-models/register-model");
const Register = db.registers;

// Create and Save a new Register
exports.create = (req, res) => {
  // Validate request
  if (!req.body.authenID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Register
  const register = new Register({
    authenID: req.body.authenID,
    email: req.body.email,
    setpass: req.body.setpass,
    repass: req.body.repass,
    nickname: req.body.nickname,
    gender: req.body.gender,
    birthday: req.body.birthday,
    nationality: req.body.nationality,
    photo: req.body.photo,
    published: req.body.published ? req.body.published : false
  });

  // Save Register in the database
  register
    .save(register)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Register."
      });
    });
};

// Retrieve all Registers from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  Register.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registers."
      });
    });
};

// Find a single Register with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Register.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Register with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "findById / Error retrieving Register with id=" + id });
    });
};

// Find a single Register with an id


// Update a Register by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Register.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Register with id=${id}. Maybe Register was not found!`
        });
      } else res.send({ message: "Register was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Register with id=" + id
      });
    });
};

// Update a Register by the id in the request
exports.postUpdate = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.authenID;

  Register.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Register with id=${id}. Maybe Register was not found!`
        });
      } else res.send({ message: "Register was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Register with id=" + id
      });
    });
};


// Delete a Register with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Register.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Register with id=${id}. Maybe Register was not found!`
        });
      } else {
        res.send({
          message: "Register was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Register with id=" + id
      });
    });
};

// Delete all Registers from the database.
exports.deleteAll = (req, res) => {
  Register.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Registers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all registers."
      });
    });
};

// Find all published Registers
exports.findAllPublished = (req, res) => {
  Register.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registers."
      });
    });
};

/*-----------------------------------------------------------*/

// Retrieve all Registers from the database.
exports.findAllAuthen = (req, res) => {
  const authenIDs = req.query.authenID;

  Register.find({authenID: authenIDs})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registers."+authenIDs
      });
    });
};

/*-----------------------------------------------------------*/

// Retrieve all Registers from the database.
exports.findAllAuthen = (req, res) => {
  const authenIDs = req.query.authenID;

  Register.find({authenID: authenIDs})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registers."+authenIDs
      });
    });
};


// Find a single Register with an id
exports.findUserInfo = (req, res) => {
  const idUsers = req.query.idUsers;

  Register.findById(idUsers)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "User Info Not found Register with id :" + idUsers });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "UserInfo / Error retrieving Register with id :" + idUsers });
    });
};

// Update a Register by the id in the request
exports.patchUserProfile = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Register.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  //Register.update({_id: Object(id)}, {$set: req.body})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Patch User Info Cannot update Register with id=${id}. Maybe Register was not found!`
        });
      } else res.send({ message: "Patch User Info Register was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Patch User Info Error updating Register with id=" + id
      });
    });
};

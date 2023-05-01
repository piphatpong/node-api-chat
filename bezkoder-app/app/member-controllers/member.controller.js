const db = require("../member-models");
const Member = db.members;

// Create and Save a new Member
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Member
  const member = new Member({
    name: req.body.name,
    lname: req.body.lname,
    gentle: req.body.gentle,
    age: req.body.age,
    ocupation: req.body.ocupation,
    nationality: req.body.nationality,
    published: req.body.published ? req.body.published : false
  });

  // Save Member in the database
  member
    .save(member)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Member."
      });
    });
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Member.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving members."
      });
    });
};

// Find a single Member with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Member.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Member with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Member with id=" + id });
    });
};

// Update a Member by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Member.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Member with id=${id}. Maybe Member was not found!`
        });
      } else res.send({ message: "Member was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Member with id=" + id
      });
    });
};

// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Member.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Member with id=${id}. Maybe Member was not found!`
        });
      } else {
        res.send({
          message: "Member was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Member with id=" + id
      });
    });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
  Member.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Members were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all members."
      });
    });
};

// Find all published Members
exports.findAllPublished = (req, res) => {
  Member.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Members."
      });
    });
};

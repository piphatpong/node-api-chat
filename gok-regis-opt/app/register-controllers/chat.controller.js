const db = require("../register-models/chat-models");
const Chat = db.chats;

// Create and Save a new Chat
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Chat
  const chat = new Chat({
    idOwner: req.body.idOwner,
    idFriend: req.body.idFriend,
    ownerMsg: req.body.ownerMsg,
    timestampsOwnerMsg: req.body.timestampsOwnerMsg,
    friendMsg: req.body.friendMsg,
    timestampsFriendMsg: req.body.timestampsFriendMsg,
    lastMsg: req.body.lastMsg,
    lastMsgTime: req.body.lastMsgTime,
    published: req.body.published ? req.body.published : false
  });

  // Save Chat in the database
  chat
    .save(chat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Chat."
      });
    });
};

// Retrieve all Chats from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Chat.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chats."
      });
    });
};

// Find a single Chat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Chat.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Chat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Chat with id=" + id });
    });
};

// Update a Chat by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Chat.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Chat with id=${id}. Maybe Chat was not found!`
        });
      } else res.send({ message: "Chat was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Chat with id=" + id
      });
    });
};

// Delete a Chat with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Chat.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Chat with id=${id}. Maybe Chat was not found!`
        });
      } else {
        res.send({
          message: "Chat was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Chat with id=" + id
      });
    });
};

// Delete all Chats from the database.
exports.deleteAll = (req, res) => {
  Chat.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Chats were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all chats."
      });
    });
};

// Find all published Chats
exports.findAllPublished = (req, res) => {
  Chat.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Chats."
      });
    });
};

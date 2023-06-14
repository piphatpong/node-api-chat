module.exports = app => {
  const registers = require("../register-controllers/register.controller.js");

  var router = require("express").Router();

  var router2 = require("express").Router();

  var router3 = require("express").Router();

  var chat = require("express").Router();

  // Create a new Tutorial
  router.post("/", registers.create);

  // Create a new Tutorial
  router.post("/update/:authenID", registers.postUpdate);

  // Retrieve all registers
  router.get("/", registers.findAll);

  // Retrieve all published registers
  router.get("/published", registers.findAllPublished);

  // Retrieve a single Tutorial with Authen
  // router.get("/authenID/:authenID", registers.findAuthenID);

  // Retrieve a single Tutorial with id
  router.get("/:id", registers.findOne);

  // Update a Tutorial with id
  router.put("/:id", registers.update);

  // Delete a Tutorial with id
  router.delete("/:id", registers.delete);

  // Create a new Tutorial
  router.delete("/", registers.deleteAll);

  app.use("/api/registers", router);

  //----------------------------------------//

  app.use("/api/authens", router2);

  // Find user by authenID when login
  router2.get("/", registers.findAllAuthen);

  //----------------------------------------//

  app.use("/api/userinfos", router3);

  // Find user by id
  router3.get("/", registers.findUserInfo);

  // Update user info by id
  router3.patch("/:id", registers.patchUserProfile);

  //----------------------------------------//

  //app.use("/api/chats", chat);

  // Find user by id
  //chat.get("/", registers.findAll);

  // Update user info by id
  //chat.get("/:id", registers.findOne);

  // Create a new Tutorial
  //chat.post("/", registers.create);


};

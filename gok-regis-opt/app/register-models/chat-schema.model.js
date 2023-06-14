module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        idOwner: String,
        idFriend: String,
        ownerMsg: String,
        timestampsOwnerMsg: String,
        friendMsg: String,
        timestampsFriendMsg: String,
        lastMsg: String,
        lastMsgTime: String,
        published: Boolean,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Chat = mongoose.model("chatrooms-collect", schema);
    return Chat;
  };
  
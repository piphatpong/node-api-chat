module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        authenID: String,
        email: String,
        setpass: String,
        repass: String,
        nickname: String,
        gender: String,
        birthday: String,
        nationality: String,
        photo: String,
        published: Boolean,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Member = mongoose.model("register-collect", schema);
    return Member;
  };
  
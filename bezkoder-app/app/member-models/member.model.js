module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        lname: String,
        gentle: String,
        age: String,
        ocupation: String,
        nationality: String,
        published: Boolean,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Member = mongoose.model("members", schema);
    return Member;
  };
  
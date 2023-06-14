const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;
  
  // module.exports = {
  //  url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
  // };
  
  module.exports = {
    url: 'mongodb+srv://mrphatsorn:Samurai2517@cluster0.tifvjce.mongodb.net/googkikdb?retryWrites=true&w=majority'
  };
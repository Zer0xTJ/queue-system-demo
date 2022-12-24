import mongoose from "mongoose";

const mongoDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  // create new connection
  await mongoose.connect("mongodb://localhost:27017/booking");
  return handler(req, res);
};

export default mongoDB;

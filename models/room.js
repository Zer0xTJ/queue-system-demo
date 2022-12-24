import mongoose from "mongoose";

let schema = mongoose.Schema({
  isEmpty: Boolean,
  number: Number,
});

schema.methods.book = async function () {
  this.isEmpty = false;
  await this.save();
};

schema.statics.bookRoom = async function (number) {
  let room = await this.findOne({ number });
  if (room?.isEmpty) {
    await room.book();
    return { booked: true };
  }
  return { booked: false };
};

let RoomModel;
try {
  RoomModel = mongoose.model("Room", schema);
} catch {
  RoomModel = mongoose.model("Room");
}

export default RoomModel;

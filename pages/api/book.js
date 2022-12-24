import mongoDB from "../../middlewares/mongodb";
import RoomModel from "../../models/room";
import { queue } from "async";

const bookingQueue = queue(function (number, cb) {
  //
  RoomModel.bookRoom(number).then((jsonResp) => cb(jsonResp));
}, 1);

async function handler(req, res) {
  let { number } = req.query;
  number = parseInt(number);
  // res.json(await RoomModel.bookRoom(number));
  bookingQueue.push(number, (jsonResp) => {
    // this will execute after the task finish
    res.json(jsonResp);
  });
}

export default mongoDB(handler);

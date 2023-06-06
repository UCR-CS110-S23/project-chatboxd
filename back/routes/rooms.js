const express = require('express');
const router = express.Router()
// TODO: add rest of the necassary imports
const Room = require('../model/room');
const User = require('../model/user');
const Message = require('../model/messages')

module.exports = router;

// temporary rooms
//temprooms = ["room1", "room2", "room3"]

//Get all the rooms
router.get('/all', async (req, res) => {
    // TODO: you have to check the database to only return the rooms that the user is in
    const user = await User.findOne({username: req.session.username})
    res.send(user.rooms)
    /* res.send(temprooms) */ //send request to database and return result instead of temp rooms array
});


/* router.post('/create', (req, res) => { */
router.post('/create', async (req, res) => {
    // TODO: write necassary codesn to Create a new room
    const roomExists = await Room.findOne({name: req.body.name})
    if (!roomExists){
      const room = new Room ({
          name: req.body.name 
      })

      const updateUserRooms = {
          $push: {
              rooms: room.name,
          },
      };
      const result = await User.updateOne({username: req.session.username}, updateUserRooms);
      
      try{
        const dataSaved = await room.save();
        //console.log("ROOM saved")
        res.status(200).json(dataSaved);
      }

      catch (error){
        console.log(error);
        res.send("ERROR!")
      }
    }
    else {
      return res.json({ msg: "Room already exists. Please choose a unique name.", status: false });
    }
});


router.post('/join', async(req, res) => {
    // TODO: write necassary codes to join a new room
    const room = await Room.findOne({name: req.body.name})
    
    if (!room)
      return res.json({ msg: `Room ${req.body.name} not Found `, status: false });
    else {
      const roomExist = await User.findOne({username: req.session.username, rooms: req.body.name})
      if (!roomExist){
        const updateUserRooms = {
          $push: {
              rooms: room.name,
          },
        };
        const result = await User.updateOne({username: req.session.username}, updateUserRooms);
      }
      res.json({ msg: "Room Found", status: true, username: req.session.username });
    }

});

router.delete('/leave', async(req, res) => {
    // TODO: write necassary codes to delete a room
    // leave means deleting the room
    const room = await Room.findOne({name: req.body.name})
    
    if (!room)
      return res.json({ msg: `Room ${req.body.name} not Found `, status: false });
    else {
      const roomExist = await User.findOne({username: req.session.username, rooms: req.body.name})
      if(roomExist){

        const r = await Room.findOne({name: req.body.name})
        /* console.log("ROOM whose messages will be deleted from", r.name)
        console.log("ROOM ID", r._id) */

        const deleteMessages = await Message.deleteMany({room: r._id})
        /* console.log("MESSAGES DELETED") */

        const deleteRoom = await Room.deleteOne({name: req.body.name})
        /* console.log("ROOM DELETED") */

        const deleteRoomFromUserList = await User.updateMany({}, {$pull: {rooms: req.body.name}})
        /* console.log("ROOM removed from users list of rooms") */
      }
      else{
        console.log("ROOM NOT FOUND")
      }
      res.json({ msg: "Room Deleted", status: true, username: req.session.username });
    }
});
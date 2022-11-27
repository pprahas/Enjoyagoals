const express = require("express");
const router = express.Router();
const Room = require("../models/RoomModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");

router.use(express.json());

//creating a post
router.post("/create/post", async (req, res) => {
  try {
    const { firstName, lastName, title, content, roomId, userId } = req.body;

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    let nowTime = year + "-" + month + "-" + date;

    const newPost = new Post({
      _id: new mongoose.Types.ObjectId(), // not part of request
      firstName: firstName,
      lastName: lastName,
      title: title,
      content: content,
      roomId: roomId,
      userId: userId,
      datePosted: nowTime,
    });

    await newPost.save();

    const room = await Room.findById(roomId);
    room.posts.push(newPost);
    await room.save();

    return res.status(200).json({ msg: "Post created." });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/get/post", async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId);

    let allPostsId = room.posts;
    let allPosts = [];

    for (let i = 0; i < allPostsId.length; i++) {
      const post = await Post.findById(allPostsId[i]);
      allPosts.push(post);
    }

    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

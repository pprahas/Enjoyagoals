const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    users: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
      required: true,
    },
    teamTasks: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
      required: false,
    },
    completedTasks: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
      required: false,
    },
    assignedTasks: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
      required: false,
    },
    posts: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
      required: false,
    },
    voteKickMember: {
      type: Map,
      of: String,
      required: false,
    },

    voteRemoveTaskFromCompleted: {
      type: Map,
      of: String,
      required: false,
    },
    voteRemoveUserFromPending: {
      type: Map,
      of: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

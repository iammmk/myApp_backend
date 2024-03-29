const mongoose = require("mongoose");
const DB_LINK = process.env.DB_LINK;
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("Connected to commentsCollection !!!");
  });

//comment Schema
const commentSchema = new mongoose.Schema({
  statusId: {
    //parent id
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  uploadedBy:{
    type: String //username
  },
  comment: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.comment.length <= 140;
      },
      message: "Max character limit is 140",
    },
  },
  mainStatusByUserId: {
    type: String,
  },
  childCommentIds: {
    type: [String],
    default: [],
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  likedBy:{
    type:[String] ,
    default:[]
  },
  totalComments: {
    type: Number,
    default: 0,
  },
  uploadTime: {
    type: Number, // check type
    default: Date.now,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  lastEdit: String,
});

const commentModel = mongoose.model("commentsCollection", commentSchema);
module.exports = commentModel;

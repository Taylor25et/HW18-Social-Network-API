const { Schema, Model, trusted } = require("mongoose");
const dateFormat = require("../utils/dateformat");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (format) => dateFormat(format),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      //once reaction array created add reactionSchema
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

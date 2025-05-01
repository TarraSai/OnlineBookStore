const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  avatar: {
    type: String,
    default:
      "https://www.bing.com/images/search?view=detailV2&ccid=q2YsgHsj&id=C7A0A4EFCA64AF00831D4FA93E54EB9940543808&thid=OIP.q2YsgHsjuMWvKbVbnp-aJwHaHa&mediaurl=https%3a%2f%2fstatic.vecteezy.com%2fsystem%2fresources%2fpreviews%2f006%2f487%2f917%2foriginal%2fman-avatar-icon-free-vector.jpg&exph=1920&expw=1920&q=avatar+icons&simid=608012051271867393&FORM=IRPRST&ck=DD7B91A472BDB90FDF824D9D343810D6&selectedIndex=2&itb=0",
  },

  cart: [
    {
      BookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  cartTotal: {
    type: Number,
    default: 0,
  },

  orders: [
    {
      BookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending",
      },
    },
  ],

  orderTotal: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

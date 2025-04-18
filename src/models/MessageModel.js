const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const messageSchema = new Schema(
  {
    sender:{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true 
    },
    receiver:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true 
    },
    content:{ 
        type: String, 
        required: true 
    },
    isRead:{ 
        type: Boolean, 
        default: false 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message",messageSchema)
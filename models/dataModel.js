import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CredenceData = new Schema({
    name: { 
        type: String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    summary:{
        type:String,
        require:true
    }
  });

export default mongoose.model('Credence',CredenceData)

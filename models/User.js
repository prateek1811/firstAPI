const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const userSchema =new Schema({
name:{
    type: String,
    required:true
},
email:{
    type:String,
    required:true,
},
city:{
    type:String,
}
})
module.exports=mongoose.model("User",userSchema);
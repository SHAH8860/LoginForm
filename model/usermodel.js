const mongoose = require('mongoose'); 
const encrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userschema=new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
       
    },
    comfirmpassword:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        min:10,
        
    },
    gender:{
        type:String,
        required:true,
    },
    

    age:{
        type:Number,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true,

        }
    }]

})
userschema.methods.generatetoken=async function(){
    try {
        const token=jwt.sign({_id:this._id.toString()},"bf2538ad228753c474ccf98dcf890aaca09df677a344de33e1e12ce97870f46daf5b90c99eed90fe747eb1f2d1486213b31ceffa42fb1a521cd183580634c906");
       this.tokens=this.tokens.concat({token:token})
        return token
    } catch (error) {
        res.status(500).json({message:"something wrong"})
       
        
    }
}

userschema.pre("save",async function(next){
    this.password=await encrypt.hash(this.password,10)
    next()
})
const usertable= new mongoose.model("userdata",userschema)
module.exports=usertable

//'bf2538ad228753c474ccf98dcf890aaca09df677a344de33e1e12ce97870f46daf5b90c99eed90fe747eb1f2d1486213b31ceffa42fb1a521cd183580634c906'
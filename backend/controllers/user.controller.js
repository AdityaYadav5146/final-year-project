const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtToken = (id , fullName , email)=>{
    return jwt.sign({id,fullName,email}, process.env.JWT_SECRET);
}

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userExists = await user.findOne({email});

    if (userExists) {
      console.log("user already exists");
      res.json({ success: false, message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);

      const newUser = new user({ fullName, email, password: hashpassword });
      const savedUser = await newUser.save();

      const newtoken = jwtToken(savedUser._id, savedUser.fullName, savedUser.email);

      res.json({
        success: true,
        message: "User registered successfully",
        newtoken,
      });
    }
  } catch (err) {
    console.log("Some error occured",err);
    res.json({ message: "Error occured on registering user", success: false });
  }
};

const login = async(req,res)=>{
  const {email,password} = req.body;

  try{
    const userPresent = await user.findOne({email});

    if(!userPresent){
      return res.status(404).json({
        success:false,
        message:"User does not exists"
      })
    }

    const isValidPassword = await bcrypt.compare(password,userPresent.password);

    if(!isValidPassword){
      return res.status(500).json({
        success:false,
        message:"Invalid credentials"
      })
    }

    const token = jwt.sign({email:email, fullName:userPresent.fullName},process.env.JWT_SECRET);

    res.cookie("token",token,{
      httpOnly:true,
    })
    
    res.status(200).json({
      success:true,
      message:"login successful"
    })

     
  }
  catch(err){
    console.log("Internal server error no user found")

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}


module.exports={register,login};
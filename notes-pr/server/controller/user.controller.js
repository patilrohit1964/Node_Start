const sendToken = require("../utils/sendToken");


const user={
    id:"123",
    name:"John Doe",
    email:"john@gmail.com",
    password:"123456",
    profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5bpdR0qrbbZH5qTcbXea_Ebdr0iqPuE6y1A&s",
    role:"user"
}
exports.userData = (req, res) => {
  const { name, email, password } = req.body;

  sendToken(res,user)
};


exports.getUserNotes=(req,res)=>{
    res.send("Hello World");
}

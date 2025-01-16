const User = require ('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req ,res)=>{

    const {firstname , lastname , email , password} = req.body ;
    
    try{
        const hashedPass = await bcrypt.hash(password , 10);
        const newUser = new User({firstname , lastname , email , password : hashedPass})
        await newUser.save();
        res.status(200).json({message : 'user created successfully !'});
    }catch(error){
        res.status(500).json({message : error.message});
    }
}

exports.login = async (req , res) => {

    const { email , password }= req.body ;
    
    try{

        const user = await User.findOne({email});
        if (!user){
            return res.status(404).json({message : "user not found !"});
        }
        const passValid = await bcrypt.compare(password , user.password) ;
        if(!passValid){
            return res.status(400).json({message : 'invalid credentials !'}) ; 
        }

        const token = jwt.sign({ id : user._id} , '987654321' , {expiresIn : '1h'}); 

        res.status(200).json({token}) ; 

    }catch(error){
        res.status(500).json({message : error.message});
    }
}

exports.getUserById = async (req , res) => {
    try{

        const user = await User.findById(req.params.id);
        res.status(200).json({user})

    }catch(error){
        res.status(500).json({message : error.message});
    }
}

exports.EditUser = async (req , res) => {
    
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id , req.body , {new : true});
        if (!updatedUser) {
            return res.status(404).json({message : "user not found ! "});
        }

        res.status(200).json({massage : "user updated successfully ! " , updatedUser});
    }catch(error){
        res.status(500).json({message : error.message});
    }
}
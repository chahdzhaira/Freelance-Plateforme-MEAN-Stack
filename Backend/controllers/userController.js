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

/** sans le cryptage du password lors du modif */

// exports.EditUser = async (req , res) => {
    
//     try{
//         const updatedUser = await User.findByIdAndUpdate(req.params.id , req.body , {new : true});
//         if (!updatedUser) {
//             return res.status(404).json({message : "user not found ! "});
//         }
    
//         res.status(200).json({massage : "user updated successfully ! " , updatedUser});
//     }catch(error){
//         res.status(500).json({message : error.message});
//     }
// }


/** avec le cryptage du password lors du modif */

exports.EditUser = async (req , res) => {
    
    try{

        if(req.body.password){
            req.body.password = await bcrypt.hash( req.body.password, 10 );
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id , req.body , {new : true});
        if (!updatedUser) {
            return res.status(404).json({message : "user not found ! "});
        }
    
        res.status(200).json({massage : "user updated successfully ! " , updatedUser});
    }catch(error){
        res.status(500).json({message : error.message});
    }
}

//ou bien 

// exports.EditUser = async (req , res) => {
    
//     try{
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: "Utilisateur non trouvé !" });
//         }

//         if ( req.body.password){
//             req.body.password = await bcrypt.hash(req.body.password , 10);
//         }

//         // Appliquer les modifications à l'utilisateur
//         Object.assign(user, req.body); // Applique les modifications de req.body à l'utilisateur récupéré

//         // Sauvegarder l'utilisateur avec les nouvelles informations
//         const updatedUser = await user.save();   

//         res.status(200).json({message : "user updated successfully ! " , updatedUser});
//     }catch(error){
//         res.status(500).json({message : error.message});
//     }
// }

exports.getAllUsers = async(req , res) =>{
    try {
        const users = await User.find();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}
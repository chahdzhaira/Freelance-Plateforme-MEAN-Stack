const express = require("express");
const userController = require("../controllers/userController")
const router = express.Router();
const multer = require('multer');
const myStorage = multer.diskStorage({
    destination : './public',
    filename : (req , file , cb)=>{
        let fileName = Date.now() +'.'+ file.mimetype.split('/')[1] ;
        req.body.image = fileName ;
        cb(null , fileName)
    }
        
})
const upload = multer ({storage : myStorage});


router.post('/register' , userController.register);
router.post ('/login' , userController.login) ; 
router.get("/:id" , userController.getUserById);
router.put("/:id" , upload.single('image'), userController.EditUser);


module.exports = router ; 
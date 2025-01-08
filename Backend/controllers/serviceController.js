const Service = require("../models/serviceModel");

exports.createService = async (req , res) =>{
    try {
        const newService = new Service(req.body) ;
        await newService.save();
        res.status(200).json({message : "service created successfully ! "});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.getServices = async(req , res) =>{
    try {
        const services = await Service.find().populate('idUser' , 'firstname lastname image' );
        res.status(200).json(services);
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}

exports.getMyServices = async(req , res) =>{
    try {
        const services = await Service.find({idUser : req.params.id}).populate('idUser','firstname lastname image');
        res.status(200).json(services);
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}

exports.getServiceById = async(req , res) =>{
    try {
        const service = await Service.findById(req.params.id).populate('idUser','firstname lastname image');
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}

exports.deleteService= async(req , res) =>{
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "service deleted successfully ! "});
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}
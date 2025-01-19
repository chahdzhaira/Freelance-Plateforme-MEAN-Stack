const Proposal = require('../models/proposalModel');
const serviceModel = require('../models/serviceModel');

exports.createProposal = async(req , res) => {
    try {
        const newProposal = new Proposal(req.body);
        await newProposal.save();
        res.status(200).json({message : "proposal created successfully ! "});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


exports.getProposalsByServiceId = async(req , res) => {
    try {
        const proposals = await Proposal.find({idService : req.params.id}).populate('idUser' , 'firstname lastname image');
        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.getProposalsByUserId = async(req , res) => {
    try {
        const proposals = await Proposal.find({idUser : req.params.id}).populate('idService' , 'name');
        res.status(200).json(proposals);
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.deleteProposal = async(req , res) => {
    try {
        const proposal = await Proposal.findByIdAndDelete(req.params.id);
        res.status(200).json({message :" proposal deleted successfully ! "});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.acceptProposal = async(req , res) => {
    try {
        const proposal = await Proposal.findByIdAndUpdate(req.params.id ,{ status: true }, { new: true } )
        res.status(200).json({message: "proposal accepted ! " , proposal});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.getAllProposals = async(req , res) =>{
    try {
        const proposals = await Proposal.find();
        res.status(200).json(proposals);
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}

exports.getProposalsForMyServices = async(req , res)=>{
    try {
        const userId = req.params.id ;
        const myServices = await serviceModel.findById(userId);

        // Extraction des IDs des services
        const serviceIds = myServices.map(service => service._id);
        // Recuperation des proposals liées à ces services
        const proposals = await Proposal.find({ idService: { $in: serviceIds } });

        res.status(200).json({ proposalsCount: proposals.length });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

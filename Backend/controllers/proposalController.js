const Proposal = require('../models/proposalModel');

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
        const proposal = await Proposal.findByIdAndUpdate(req.params.id , status =true )
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}
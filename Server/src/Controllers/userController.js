import User from "../Schema/UserSchema.js";
import Admin from "../Schema/AdminSchema.js"
import bcrypt from "bcrypt"
import {formatDataToSend, formatDataToSendAdmin} from "../utils/formatter.js";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    
    try{
        await User.exists({"personal_info.email": email}).then((result) => {
            if(result){
                return res.status(400).json({message: "email already exists"})
            }
        })
        const hashPassword = await bcrypt.hash(password, 10)
        let userName = email.split("@")[0]
        let user = new User({personal_info: {name, email, password: hashPassword,  username: userName}})
        user.save().then((result) => {
            return res.status(200).json(formatDataToSend(result));
        })
        .catch((err) => {
            return res.status(500).json({"error": err.message})
        })
    }
    catch(err){
        res.status(500).json({"error": err.message})
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        let user = await User.findOne({"personal_info.email": email})
        if(user){
            let passwordMatch = await bcrypt.compare(password, user.personal_info.password)
            if(passwordMatch){
                return res.status(200).json(formatDataToSend(user))
            }
            else{
                return res.status(403).json({"error": "Incorrect Password"})
            }
        }
        else{
            return res.status(403).json({"error": "Email not found"})
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const loginAdmin = async (req, res) => {
    const {email, password} = req.body

    try{
        let admin = await Admin.findOne({"personal_info.email": email})
        if(admin){
            let passwordMatch = await bcrypt.compare(password, admin.personal_info.password)
            if(passwordMatch){
                return res.status(200).json(formatDataToSendAdmin(admin))
            }
            else{
                return res.status(403).json({"error": "Incorrect Password"})
            }
        }
        else{
            return res.status(403).json({"error": "Email not found"})
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const registerAdmin = async (req, res) => {
    const {name, email, password} = req.body;
    
    try{
        await Admin.exists({"personal_info.email": email}).then((result) => {
            if(result){
                return res.status(400).json({message: "email already exists"})
            }
        })
        const hashPassword = await bcrypt.hash(password, 10)
        let userName = email.split("@")[0]
        let admin = new Admin({personal_info: {name, email, password: hashPassword,  username: userName}})
        admin.save().then((result) => {
            return res.status(200).json(formatDataToSendAdmin(result));
        })
        .catch((err) => {
            return res.status(500).json({"error": err.message})
        })
    }
    catch(err){
        res.status(500).json({"error": err.message})
    }
}

export const adminInfo = async (req, res) => {
    let username = req.params.username
    let admin = await Admin.findOne({"personal_info.username": username})
    return res.status(200).json(formatDataToSendAdmin(admin))
}

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins.map(admin => formatDataToSendAdmin(admin)));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// RDCjMAP6bPcR8JRg
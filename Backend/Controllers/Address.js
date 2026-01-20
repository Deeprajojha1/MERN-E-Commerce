import { Address } from "../Models/Address.js";
// import { Authenticated } from "../Middlewares/IsAuthenticated.js";

// add address
export const addAddress = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    const { fullname, phoneNumber, address, city, state, pincode, country } = req.body;

    try {
        const newAddress = new Address({
            userId: req.user.id,
            fullname: fullname,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            country: country
        });

        await newAddress.save();

        res.status(201).json({
            message: "Address added successfully",
            address: newAddress
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding address",
            error
        });
    }
};

// get addresses for a user (to be implemented)
export const getUserAddresses = async (req, res) => {
    const address= await Address.find({userId:req.user.id}).sort({createdAt:-1}).limit(1);
    try{
        if(!address){
            return res.status(404).json({message:"No addresses found"});
        }else{
            res.status(200).json(address[0]);
        }
    }
    catch(error){
        res.status(500).json({message:"Error fetching addresses"});
    }
}
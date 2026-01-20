import { Authenticated } from "../Middlewares/IsAuthenticated.js";
import { addAddress,getUserAddresses } from "../Controllers/Address.js";
import exprees from "express";

const router = exprees.Router();

// Add Address Route
router.post("/add-address", Authenticated, addAddress);

// Get User Addresses Route
router.get("/user-addresses", Authenticated, getUserAddresses);
export default router;
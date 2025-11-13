import express from "express";
import ControllerPet from "../controller/pet.js"

const router = express.Router();

router.get("/pets", ControllerPet.FindAll);
router.get("/pet/:id", ControllerPet.FindOne);
router.post("/pet", ControllerPet.Create);
router.put("/pet/:id", ControllerPet.Update);
router.delete("/pet/:id", ControllerPet.Delete);

export default router;

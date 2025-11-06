import express from "express";
import ControllerPetshop from "../controller/petshop.js";

const router = express.Router();

router.get("/clientes", ControllerPetshop.FindAll);
router.get("/cliente/:id", ControllerPetshop.FindOne);
router.post("/cliente", ControllerPetshop.Create);
router.put("/cliente/:id", ControllerPetshop.Update);
router.delete("/cliente/:id", ControllerPetshop.Delete);

export default router;

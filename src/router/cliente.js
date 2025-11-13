import express from "express";
import ControllerCliente from "../controller/cliente.js"

const router = express.Router();

router.get("/clientes", ControllerCliente.FindAll);
router.get("/cliente/:id", ControllerCliente.FindOne);
router.post("/cliente", ControllerCliente.Create);
router.put("/cliente/:id", ControllerCliente.Update);
router.delete("/cliente/:id", ControllerCliente.Delete);

export default router;

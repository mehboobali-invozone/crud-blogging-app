import express from "express";
import register from "../controllers/Auth/register.js";
import login from "../controllers/Auth/login.js";
import { getUsersController, deleteUsersController, editUsersController } from '../controllers/userController.js'

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
///users
router.get('/get', getUsersController);
router.put('/:id', editUsersController);
router.delete('/:id', deleteUsersController);

export default router;

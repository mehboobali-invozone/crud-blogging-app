import express from "express";
import { createBlogController, getBlogsController, updateBlogController, deleteBlogController } from '../controllers/blogController.js'

const router = express.Router();

// CRUD routes
router.post("/", createBlogController);
router.get("/", getBlogsController);
router.put("/:id", updateBlogController);
router.delete("/:id", deleteBlogController);



export default router;


import Blogs from "../models/blogModel.js";

export const createBlogController = async (req, res) => {
  try {
    console.log("req", req.body);
    const blog = await Blogs.create({
      title: req.body.title,
      content: req.body.content,
      author_name: req.body.author_name
    });
    console.log("blog", blog)
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: "Error creating blog", err });
  }
};

export const getBlogsController = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", err });
  }
};


export const updateBlogController = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const updatedBlog = await Blogs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: "Error updating blog", err });
  }
};


export const deleteBlogController = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await Blogs.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting blog", err });
  }
};


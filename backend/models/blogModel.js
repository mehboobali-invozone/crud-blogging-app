import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author_name: { type: String },
}, { timestamps: true });


const Blogs = mongoose.model("blogs", blogSchema);
export default Blogs;

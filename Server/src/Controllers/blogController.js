import Blog from "../Schema/Blog.js";

export const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().populate("author", "name");
    res.json(blogs);
};

export const getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
};

export const createBlog = async (req, res) => {
    const { title, content } = req.body;
    const coverImage = req.file?.path;

    const newBlog = new Blog({
        title,
        content,
        coverImage,
        author: req.user._id,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
};

export const updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    if (req.file) blog.coverImage = req.file.path;

    await blog.save();
    res.json(blog);
};

export const deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();
};

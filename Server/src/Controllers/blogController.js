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
    const { title, content, author, url, slug } = req.body;
    const coverImage = req.file?.path;

    const newBlog = new Blog({
        title,
        content,
        coverImage,
        author,
        url,
        slug,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
};

export const updateBlog = async (req, res) => {
    console.log(req.body);
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.author = req.body.author || blog.author;
    blog.url = req.body.url || blog.url;
    blog.slug = req.body.slug || blog.slug;
    if (req.file) blog.coverImage = req.file.path;

    await blog.save();
    console.log(blog);
    res.json(blog);
};

export const deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();
};

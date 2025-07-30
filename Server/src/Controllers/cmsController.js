import Page from "../Schema/pageSchema.js";
import Section from "../Schema/sectionSchema.js";
// Create a new page

export const createPage = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const page = await Page.create({ name, slug });
        res.status(201).json(page);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a page and its sections
export const getPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await Page.findOne({ slug }).populate("sections").exec();
        if (!page) return res.status(404).json({ message: "Page not found" });
        res.json(page);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllPages = async (req, res) => {
    try {
        const pages = await Page.find().populate("sections").exec();
        res.json(pages);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Add a section to a page
export const addSectionToPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const { type, order, content } = req.body;
        const page = await Page.findOne({ slug });
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        const section = await Section.create({ page: page._id, type, order, content });
        await Page.findByIdAndUpdate(page._id, { $push: { sections: section._id } });

        res.status(201).json(section);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Update section
export const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Section.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete section
export const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await Section.findByIdAndDelete(id);
        if (section) {
            await Page.findByIdAndUpdate(section.page, { $pull: { sections: id } });
        }
        res.json({ message: "Section deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

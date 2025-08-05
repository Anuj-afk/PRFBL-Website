import Page from "../Schema/pageSchema.js";
import Section from "../Schema/sectionSchema.js";
// Create a new page

export const createPage = async (req, res) => {
    try {
        const { name, slug, URL} = req.body;
        const page = await Page.create({ name, slug, URL });
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

        // Sort populated sections by `order`
        const sortedSections = page.sections.sort((a, b) => a.order - b.order);

        // Replace the original sections with the sorted ones
        const sortedPage = {
            ...page.toObject(),
            sections: sortedSections,
        };

        res.json(sortedPage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllPages = async (req, res) => {
    try {
        const pages = await Page.find().populate("sections").exec();
        res.json(pages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Add a section to a page
export const addSectionToPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const { type, order, content } = req.body;
        const page = await Page.findOne({ slug });
        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }

        const section = await Section.create({
            page: page._id,
            type,
            order,
            content,
        });
        await Page.findByIdAndUpdate(page._id, {
            $push: { sections: section._id },
        });

        res.status(201).json(section);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updatePage = async (req, res) => {
    try {
        const { slug } = req.params;
        const { name, URL, activated } = req.body;
        const updatedPage = await Page.findOneAndUpdate(
            { slug },
            { name, slug, URL, activated },
            { new: true }
        );
        if (!updatedPage) {
            return res.status(404).json({ error: "Page not found" });
        }
        res.json(updatedPage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update section
export const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Section.findByIdAndUpdate(id, req.body, {
            new: true,
        });
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
            await Page.findByIdAndUpdate(section.page, {
                $pull: { sections: id },
            });
        }
        res.json({ message: "Section deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllSections = async (req, res) => {
    try {
        const sections = await Section.find().populate("page").exec();
        res.json(sections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deletePage = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await Page.findOneAndDelete({ slug });
        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }
        res.json({ message: "Page deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getSection = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await Section.findById(id).populate("page").exec();
        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }
        res.json(section);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const getSectionByPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await Page.findOne({ slug }).populate("sections").exec();
        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }
        res.json(page.sections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const removeSectionFromPage = async (req, res) => {
    try {
        const { slug, sectionId } = req.params;
        const page = await Page.findOne({ slug });
        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }
        await Section.findByIdAndDelete(sectionId);
        await Page.findByIdAndUpdate(page._id, {
            $pull: { sections: sectionId },
        });
        res.json({ message: "Section removed from page" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getSectionNotInPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await Page.findOne({ slug }).populate("sections").exec();
        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }
        const sections = await Section.find({ _id: { $nin: page.sections } });
        res.json(sections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
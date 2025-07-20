import Contact from "../Schema/Contact.js";

// Public: Create a new contact submission
export const submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required." });
    }

    const contact = new Contact({ name, email, subject, message });

    await contact.save();
    res.status(201).json({ message: "Contact form submitted successfully." });
};

// Admin: View all submissions
export const getAllContacts = async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
};

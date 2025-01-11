const Contact = require("../models/contact");

exports.getContact = (req, res) => {
  res.render("contact");
};

exports.postContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.redirect("/contact");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

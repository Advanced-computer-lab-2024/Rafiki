const Museum = require('../models/museum');

// Create a new museum
const createMuseum = async (req, res) => {
  const { name, description, pictures, location, openingHours, ticketPrices, tag } = req.body;

  try {
    const museum = await Museum.create({
      name,
      description,
      pictures,
      location,
      openingHours,
      ticketPrices,
      tag,
    });

    res.status(201).json(museum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single museum by ID
const getMuseum = async (req, res) => {
  const { id } = req.params;

  try {
    const museum = await Museum.findById(id);

    if (!museum) {
      return res.status(404).json({ error: 'Museum not found.' });
    }

    res.status(200).json(museum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all museums
const getMuseums = async (req, res) => {
  try {
    const museums = await Museum.find({});

    res.status(200).json(museums);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update museum details
const updateMuseum = async (req, res) => {
  const { id } = req.params;

  try {
    const museum = await Museum.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!museum) {
      return res.status(404).json({ error: 'Museum not found.' });
    }

    res.status(200).json(museum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a museum
const deleteMuseum = async (req, res) => {
  const { id } = req.params;

  try {
    const museum = await Museum.findByIdAndDelete(id);

    if (!museum) {
      return res.status(404).json({ error: 'Museum not found.' });
    }

    res.status(200).json({ message: 'Museum deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchMuseumbyName = async (req, res) => {
  const { name } = req.params; // Get the name from the request parameters
  try {
      const museums = await Museum.find({ name: { $regex: name, $options: 'i' } }); // Case-insensitive search
      if (museums.length === 0) {
          return res.status(404).json({ message: "No museums found with that name." });
      }
      res.status(200).json(museums);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const searchMuseumbyTag = async (req, res) => {
  const { tag } = req.params; // Get the name from the request parameters
  try {
      const museums = await Museum.find({ tag: { $regex: tag, $options: 'i' } }); // Case-insensitive search
      if (museums.length === 0) {
          return res.status(404).json({ message: "No museums found with that tag." });
      }
      res.status(200).json(museums);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};



module.exports = { createMuseum, getMuseum, getMuseums, updateMuseum, deleteMuseum ,searchMuseumbyName,searchMuseumbyTag};

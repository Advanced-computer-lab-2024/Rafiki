const Museum = require('../models/museum');

// Create a new museum
const createMuseum = async (req, res) => {
  const { name, description, pictures, location, openingHours, ticketPrices } = req.body;

  try {
    const museum = await Museum.create({
      name,
      description,
      pictures,
      location,
      openingHours,
      ticketPrices,
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
    const museums = await Museum.find({}).sort({ createdAt: -1 });

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

module.exports = { createMuseum, getMuseum, getMuseums, updateMuseum, deleteMuseum };

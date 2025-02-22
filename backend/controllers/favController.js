// controllers/favoritesController.js
const pool = require('../config/db');  // Import the shared pool

// Get the favorites for the authenticated user
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token

    const result = await pool.query('SELECT * FROM favorites WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(200).send('No tienes favoritos aún');  // Changed to 200 status and custom message
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).send('Error fetching favorites');
  }
};

// Add a product to the user's favorites
const addFavorite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // Get user ID from the token

  try {
    const result = await pool.query('INSERT INTO favorites (product_id, user_id) VALUES ($1, $2) RETURNING *', [productId, userId]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding favorite:', err);
    res.status(500).send('Error adding favorite');
  }
};

// Remove a product from the user's favorites
const removeFavorite = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Get user ID from the token

  try {
    const result = await pool.query('DELETE FROM favorites WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);

    if (result.rows.length === 0) {
      return res.status(404).send('Favorite not found or not yours');
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error removing favorite:', err);
    res.status(500).send('Error removing favorite');
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };

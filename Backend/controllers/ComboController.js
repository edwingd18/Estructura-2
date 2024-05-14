import ComboModel from "../models/ComboModel.js";

// Mostrar todas las peliculas
export const getAllCombos = async (req, res) => {
    try {
        const combos = await ComboModel.find().sort({ title: 1 });
        if (!combos) {
            return res.status(404).json({ message: "No se encontraron Combos." });
        }
        res.status(200).json(combos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva película
export const createCombo = async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        imageUrl,
  
      } = req.body;
  
      const newCombo = new ComboModel({
        title,
        description,
        price,
        imageUrl,
     
  
      });
  
      await newCombo.save();
      res.status(200).json({ message: 'Película creada correctamente' });
    } catch (error) {
      console.error('Error al crear la película:', error);
      res.status(500).json({ error: 'Error al crear la película' });
    }
  };

  // Eliminar una película
export const deleteCombo = async (req, res) => {
    try {
      const { id } = req.params;
  
      const combo = await ComboModel.findByIdAndDelete(id);
      if (!combo) {
        return res.status(404).json({ message: "Película no encontrada." });
      }
  
      res.status(200).json({ message: "Película eliminada correctamente." });
    } catch (error) {
      console.error('Error al eliminar la película:', error);
      res.status(500).json({ error: 'Error al eliminar la película' });
    }
  };

  export const updateCombo = async (req, res) => {
    try {
      const { id } = req.params; 
      const updates = req.body; 
  
      const combo = await ComboModel.findByIdAndUpdate(id, updates, { new: true });
  
      if (!combo) {
        return res.status(404).json({ message: "Película no encontrada." });
      }
  
      res.status(200).json({ message: "Película actualizada correctamente.", combo });
    } catch (error) {
      console.error('Error al actualizar la película:', error);
      res.status(500).json({ error: 'Error al actualizar la película' });
    }
  };
  
  export const getComboById = async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID de la película de los parámetros de la solicitud
  
      const combo = await ComboModel.findById(id); // Buscar la película en la base de datos por su ID
      if (!combo) {
        return res.status(404).json({ message: "Película no encontrada." });
      }
  
      res.status(200).json(combo); // Enviar los detalles de la película como respuesta
    } catch (error) {
      console.error('Error al obtener los detalles de la película:', error);
      res.status(500).json({ error: 'Error al obtener los detalles de la película' });
    }
  };
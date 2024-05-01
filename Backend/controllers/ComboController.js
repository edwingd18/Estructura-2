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
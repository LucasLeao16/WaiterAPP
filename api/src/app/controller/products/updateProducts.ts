import { Request, Response } from 'express';
import { Product } from '../../models/Product';
export async function updateProducts(req: Request, res: Response) {
    try {
        const imagePath = req.file?.filename;
        const { productId } = req.params;
        const { name, description, price, category, ingredients } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (!description) {
            return res.status(400).json({ error: 'Description is required' });
        }
        if (!price) {
            return res.status(400).json({ error: 'Price is required' });
        }
        if (!category) {
            return res.status(400).json({ error: 'category is required' });
        }
        if (!imagePath) {
            return res.status(400).json({ error: 'ImagePath is required' });
        }
        const prod = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            imagePath,
            price: Number(price),
            category,
            ingredients: ingredients ? JSON.parse(ingredients) : [],
        });
        res.json(prod);
    } catch {
        res.status(500).json({ error: 'Internal server error' });
    }
}

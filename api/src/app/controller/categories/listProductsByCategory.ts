import { Request, Response } from 'express';
import { Product } from '../../models/Product';
export async function listProductsByCategory(req: Request, res: Response) {
    try {
        const { categoryId } = req.params;
        const categories = await Product.find()
            .where('category')
            .equals(categoryId);
        res.json(categories);
    } catch {
        res.status(500).json({ error: 'Internal server error' });
    }
}

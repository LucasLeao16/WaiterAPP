import { Request, Response } from 'express';
import { Category } from '../../models/Category';
export async function updateCategory(req: Request, res: Response) {
    try {
        const { icon, name } = req.body;
        const { categoryId } = req.params;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (!icon) {
            return res.status(400).json({ error: 'Icon is required' });
        }

        await Category.findByIdAndUpdate(categoryId, { icon, name });
        res.sendStatus(204);
    } catch {
        res.status(500).json({ error: 'Internal server error' });
    }
}

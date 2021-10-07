import { Router, Request, Response } from 'express';
import { productInstance } from "../../models/product";
import {Op} from 'sequelize';
const router = Router();

//? GetAll
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await productInstance.findAll();
        res.json({ status: 200, result: result })
    }
    catch (err) {
        res.json({ status: 404, result: "Not Found" })
    }
});

//? Get By Keyword
router.post('/serach', async (req: Request, res: Response) => {
    try {
        const result = await productInstance.findAll({ where: {name: {[Op.like]: `%${req.body.name}%`}}});
        res.json({ status: 200, result: result })
    }
    catch (err) {
        res.json({ status: 404, result: "Not Found" })
    }
});


//? Create Product
router.post('/create', async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const result = await productInstance.create(req.body);
        res.json({ status: 200, result: result })
    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});


//? Update Product
router.put(`/update/:id`, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await productInstance.findOne({ where: { id } });

        if (!result) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        const updatedRecord = await result.update(req.body);
        return res.json({status: 200 , result: updatedRecord });
    }
    catch (err) {
    return res.json({ status: 404, result: err });
}
    
});

//? Delete Product
router.delete(`/delete/:id`, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await productInstance.findOne({ where: { id } });

        if (!result) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        const deletedRecord = await result.destroy(req.body);
        return res.json({status: 200 , result: deletedRecord });
    }
    catch (err) {
    return res.json({ status: 404, result: err });
}
    
});

export default router;
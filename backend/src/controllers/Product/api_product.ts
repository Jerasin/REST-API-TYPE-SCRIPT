import { Router, Request, Response } from 'express';
import { productInstance } from "../../models/product";
import { Op } from 'sequelize';
import { authorizationAdmin, authorization } from '../../middleware/authorize-jwt'
const router = Router();

//? GetAll
router.get('/', authorization, async (req: Request, res: Response) => {
    try {
        const result = await productInstance.findAll();
        return res.json({ status: 200, result: result })
    }
    catch (err) {
        return res.json({ status: 404, result: "Not Found" })
    }
});

//? Get By Keyword
router.post('/serach', authorization, async (req: Request, res: Response) => {
    try {
        const { product_name, product_code } = req.body;

        const result = await productInstance.findAll({ where: { product_name: { [Op.like]: `%${product_name}%` } } });
        return res.json({ status: 200, result: result })

    }
    catch (err) {
        return res.json({ status: 404, result: "Not Found" })
    }
});


//? Create Product
router.post('/create', authorizationAdmin, async (req: Request, res: Response) => {
    try {
        const { product_code, product_name } = req.body;

        const getProductCode = await productInstance.findOne({ where: { product_code } });

        if (getProductCode) {
            return res.json({ status: 200, result: "Product Code Duplicate" })
        }

        const getProductName = await productInstance.findOne({ where: { product_name } });

        if (getProductName) {
            return res.json({ status: 200, result: "Product Name Duplicate" })
        }
        const result = await productInstance.create(req.body);
        return res.json({ status: 200, result: result })
    }
    catch (err) {
        return res.json({ status: 404, result: err })
    }
});


//? Update Product
router.put(`/update/:id`, authorizationAdmin, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await productInstance.findOne({ where: { id } });

        if (!result) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }
        req.body.updatedAt = Date.now();
        const updatedRecord = await result.update(req.body);
        return res.json({ status: 200, result: updatedRecord });
    }
    catch (err) {
        return res.json({ status: 404, result: err });
    }

});

//? Delete Product Role Admin
router.delete(`/delete/:id`, authorizationAdmin, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await productInstance.findOne({ where: { id } });

        if (!result) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        const deletedRecord = await result.destroy();
        return res.json({ status: 200, result: deletedRecord });
    }
    catch (err) {
        return res.json({ status: 404, result: err });
    }

});

export default router;
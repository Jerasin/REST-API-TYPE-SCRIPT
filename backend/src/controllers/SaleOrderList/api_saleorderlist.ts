import { Router, Request, Response } from 'express';
import {saleOrderListInstance} from '../../models/saleorderlist'
import {Op} from 'sequelize';
import {authorizationAdmin , authorization} from '../../middleware/authorize-jwt'
const router = Router();


//? Get All
router.get('/', authorization ,async (req: Request, res: Response) => {
    try {
        const result = await saleOrderListInstance.findAll();
        res.json({ status: 200, result: result })
    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});

//? Get By Id
router.get('/saleorderlist/:id', authorization, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await saleOrderListInstance.findAll({ where: { saleOrderId:id } });
        res.json({ status: 200, result: result })
    }
    catch (err) {
        res.json({ status: 404, result: "Not Found" })
    }
});

//? Delete SaleOrderList Role Admin
router.delete('/delete/:id', authorizationAdmin, async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const getsaleOrderListId = await saleOrderListInstance.findOne({ where: { saleOrderId: id } });

        if (!getsaleOrderListId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

    

        const deleteRecord = await getsaleOrderListId.destroy();


        res.json({ status: 200, result: "Delete SaleOrderList Success" });
    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});


export default router;
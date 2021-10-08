import { Router, Request, Response } from 'express';
import { saleOrderInstance } from "../../models/saleorder";
import { productInstance } from '../../models/product'
import { saleOrderListInstance } from '../../models/saleorderlist'
import { Op } from 'sequelize';
import { authorizationAdmin, authorization } from '../../middleware/authorize-jwt'
const router = Router();
let saleOrderId = Math.floor(Math.random() * 10000);

//? Get SaleOrders All
router.get('/', authorization, async (req: Request, res: Response) => {
    try {
        const result = await saleOrderInstance.findAll();
        return res.json({ status: 200, result: result })
    }
    catch (err) {
        return res.json({ status: 404, result: "Not Found" })
    }
});

//? Get By Id
router.get('/saleorders/:id', authorization, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await saleOrderInstance.findAll({ where: { saleOrderId:id } });
        res.json({ status: 200, result: result })
    }
    catch (err) {
        res.json({ status: 404, result: "Not Found" })
    }
});


//? Create SaleOrder
router.post('/create_saleorder', authorization, async (req: Request, res: Response) => {
    try {
        let result:any;
        let qtyTotal:number = 0;
        let priceTotal:number = 0;
        let doc_status:string = '';
        let createdBy:string = '';
        const getsaleOrderId = await saleOrderInstance.findAll({ where: { saleOrderId } });

        if (getsaleOrderId.length > 0) {
            return res.json({ status: 200, result: "SaleOrder Id Duplicate" })
        }

        for (let index = 0; index < req.body.length; index++) {
            req.body[index].saleOrderId = saleOrderId;
            req.body[index].doc_status = "pending";
            qtyTotal = qtyTotal + req.body[index].qty
            priceTotal = priceTotal + req.body[index].price
            createdBy = req.body[index].createdBy
            doc_status = "pending";
        }

        let data: any = {};
        data.saleOrderId = saleOrderId;
        data.qtyTotal = qtyTotal
        data.priceTotal = priceTotal
        data.doc_status = doc_status
        data.createdBy = createdBy
        const createOrderlist = await saleOrderListInstance.create(data);

        for (let index = 0; index < req.body.length; index++) {
            result = await createOrderlist.createSaleOrder(req.body[index]);

        }

        res.json({ status: 200, result: "Create SaleOrder Success" });
    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});

//? Change Status In-Progrss Admin
router.put('/status_in_progrss/:id', authorizationAdmin, async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const getsaleOrderId = await saleOrderInstance.findAll({ where: { saleOrderId: id } });


        req.body.doc_status = "in-progrss"
        if (!getsaleOrderId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        for (let index = 0; index < getsaleOrderId.length; index++) {
            const updatedSaleOrder = await getsaleOrderId[index].update(req.body);
        }

        const getsaleOrderListId = await saleOrderListInstance.findOne({ where: { saleOrderId: id } });

        if (!getsaleOrderListId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        const updatedSaleOrderList = await getsaleOrderListId.update(req.body);

        res.json({ status: 200, result: " Change Status in-progrss Success" });
    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});

//? Change Status Done Role Admin
router.put('/status_done/:id', authorizationAdmin, async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const getsaleOrderId = await saleOrderInstance.findAll({ where: { saleOrderId: id } });
        req.body.doc_status = "done"
        if (!getsaleOrderId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        for (let index = 0; index < getsaleOrderId.length; index++) {
            const updatedSaleOrder = await getsaleOrderId[index].update(req.body);
        }

        const getsaleOrderListId = await saleOrderListInstance.findOne({ where: { saleOrderId: id } });

        if (!getsaleOrderListId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        const updatedSaleOrderList = await getsaleOrderListId.update(req.body);

        res.json({ status: 200, result: "Update SaleOrder Success" });
    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});

//? Change Status Cancel Role Admin
router.put('/status_cancel_admin/:id', authorizationAdmin, async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const getsaleOrderId = await saleOrderInstance.findAll({ where: { saleOrderId: id } });
        req.body.doc_status = "cancel-by-admin"
        if (!getsaleOrderId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        for (let index = 0; index < getsaleOrderId.length; index++) {
            // if (getsaleOrderId[index].doc_status == 'done') {
            //     return res.json({ status: 200, result: "Documents is Status Done" });
            // }
            const updatedSaleOrder = await getsaleOrderId[index].update(req.body);

        }

        const getsaleOrderListId = await saleOrderListInstance.findOne({ where: { saleOrderId: id } });

        if (!getsaleOrderListId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        const updatedSaleOrderList = await getsaleOrderListId.update(req.body);

        res.json({ status: 200, result: "Update SaleOrder Success" });
    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});

//? Change Status Cancel Role User and Admin
router.put('/status_cancel_user/:id', authorization, async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const getsaleOrderId = await saleOrderInstance.findAll({ where: { saleOrderId: id } });
        req.body.doc_status = "cancel-by-user"
        if (!getsaleOrderId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        for (let index = 0; index < getsaleOrderId.length; index++) {
            if (getsaleOrderId[index].doc_status == 'cancel-by-admin' || getsaleOrderId[index].doc_status == 'done') {

                return res.json({ status: 200, result: "Can not Reject" })
            }
            const updatedSaleOrder = await getsaleOrderId[index].update(req.body);

            const getsaleOrderListId = await saleOrderListInstance.findOne({ where: { saleOrderId: id } });

            if (!getsaleOrderListId) {
                return res.json({ status: 404, result: "Can not find existing record" });
            }

            const updatedSaleOrderList = await getsaleOrderListId.update(req.body);

            res.json({ status: 200, result: "Cancel SaleOrder Success" });

        }

    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});


//? Delete SaleOrder Role Admin
router.delete('/delete/:id', authorizationAdmin, async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const getsaleOrderId = await saleOrderInstance.findAll({ where: { saleOrderId: id } });

        if (!getsaleOrderId) {
            return res.json({ status: 404, result: "Can not find existing record" });
        }

        for (let index = 0; index < getsaleOrderId.length; index++) {

            const deleteRecord = await getsaleOrderId[index].destroy();

        }

        res.json({ status: 200, result: "Delete SaleOrder Success" });
    }
    catch (err) {
        res.json({ status: 404, result: err })
    }
});





export default router;
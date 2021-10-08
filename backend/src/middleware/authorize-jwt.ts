import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import endpoint from '../endpoints.config'
dotenv.config();
import { Request, Response, NextFunction } from 'express'


export const authorizationAdmin = ((req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers['authorization']
    if (authorization === undefined) return res.status(401).json({
        "status": 401,
        "message": "Unauthorized Header"
    })

    const token = authorization.split(' ')[1]
    if (token === undefined) return res.status(401).json({
        "status": 401,
        "message": "Unauthorized Token"
    })


    jwt.verify(token, endpoint.JWT_SECRET, function (error, decoded) {
        if (error) return res.status(401).json({ // หาก error ไม่ผ่าน
            "status": 401,
            "message": "Unauthorized JWT",
            "LogError": error,
        })


        if (decoded?.userRole === undefined || decoded?.userRole !== 'admin') return res.status(403).json({
            "status": 403,
            "message": "Forbidden"
        })

        // ถ้าทุกอย่างผ่าน ทุกเงื่อนไข ก็ไปทำ middleware ฟังก์ชั่นในลำดับถัดไป
        next()
    })
})


export const authorization = ((req: Request, res: Response, next: NextFunction) => {


    // ? ดึงข้อมูล authorization ใน header
    const authorization = req.headers['authorization']
    // ? ถ้าไม่มีการส่งค่ามา ส่ง ข้อความ json พร้อม status 401 Unauthorized
    if (authorization === undefined) return res.status(401).json({
        "status": 401,
        "message": "Unauthorized Header"
    })

    const token = authorization.split(' ')[1]
    if (token === undefined) return res.status(401).json({
        "status": 401,
        "message": "Unauthorized Token"
    })


    // ทำการยืนยันความถูกต้องของ token
    jwt.verify(token, endpoint.JWT_SECRET, function (error, decoded) {
        if (error) return res.status(401).json({ // หาก error ไม่ผ่าน
            "status": 401,
            "message": "Unauthorized JWT",
            "LogError": error,
        })

        next()
    })
})

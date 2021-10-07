import { Router, Request, Response } from 'express';
import { userInstance } from "../../models/user";
import bcryptjs from 'bcryptjs'
import { createToken } from '../../middleware/genrate-token'
const router = Router();



router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const getUser = await userInstance.findOne({ where: { email } });

    if (!getUser) {
      return res.json({ status: 200, result: "Not Found" })
    }

    let result = bcryptjs.compareSync(password, getUser.password);
    if (result) {
      const token = createToken(getUser.email, "user")
      return res.json({ status: 200, result: token })
    }

    return res.json({ status: 200, result: "Not Found" })


  }
  catch (err) {
    return res.json({ status: 404, result: "Not Found" })
  }
});

router.post('/register', (req: Request, res: Response) => {
  console.log(req.body)
  try {
    bcryptjs.hash(req.body.password, 8, async (err, hash) => {
      req.body.password = hash;
      const result = await userInstance.create(req.body);
      return res.json({ status: 200, result: result })
    }
    )
  }
  catch (err) {
    return res.json({ status: 404, result: err })
  }
});

export default router;
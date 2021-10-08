import { Router, Request, Response } from 'express';
import { userInstance } from "../../models/user";
import bcryptjs from 'bcryptjs'
import { createToken } from '../../middleware/genrate-token'
import { authorizationAdmin, authorization } from '../../middleware/authorize-jwt'
const router = Router();


//? Get All Users
router.get('/', authorization, async (req: Request, res: Response) => {
  try {
    const getUsers = await userInstance.findAll();
    return res.json({ status: 200, result: getUsers })
  }
  catch (err) {
    return res.json({ status: 404, result: err })
  }
})

//? Get All User By Id
router.get('/user/:id', authorization, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getUser = await userInstance.findOne({ where: { id } });
    if (!getUser) {
      return res.json({ status: 200, result: "Not Found" })
    }
    return res.json({ status: 200, result: getUser })
  }
  catch (err) {
    return res.json({ status: 404, result: err })
  }
})


//? Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const getUser = await userInstance.findOne({ where: { email } });

    if (!getUser) {
      return res.json({ status: 200, result: "Not Found Email" })
    }

    const result = bcryptjs.compareSync(password, getUser.password);
    if (result) {
      const token = createToken(getUser.email, getUser.user_role)
      return res.json({ status: 200, result: token })
    } else {
      return res.json({ status: 200, result: "Not Found Password" })
    }


  }
  catch (err) {
    return res.json({ status: 404, result: err })
  }
});


//? Create User Role User
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const getUser = await userInstance.findOne({ where: { email } });

    if (getUser) {
      return res.json({ status: 200, result: "Duplicate User" })
    }

    bcryptjs.hash(req.body.password, 8, async (err, hash) => {
      req.body.password = hash;
      req.body.user_role = "user";
      const result = await userInstance.create(req.body);
      return res.json({ status: 200, result: result })
    }
    )
  }
  catch (err) {
    return res.json({ status: 404, result: err })
  }
});

//? Create User Role Admin
router.post('/register/superuser', async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;
    const getUser = await userInstance.findOne({ where: { email } });
    if (getUser) {
      return res.json({ status: 200, result: "Duplicate User" })
    }

    bcryptjs.hash(req.body.password, 8, async (err, hash) => {
      req.body.password = hash;
      req.body.user_role = "admin";
      const result = await userInstance.create(req.body);
      return res.json({ status: 200, result: result })
    }
    )
  }
  catch (err) {
    return res.json({ status: 404, result: err })
  }
});

//? Update User
router.put('/update/:id', authorizationAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { updatedBy } = req.body;

    if (!updatedBy) {
      return res.json({ status: 200, result: "Not Found UpdatedBy from Request" })
    }

    req.body.updatedAt = Date.now();

    const getUser = await userInstance.findOne({ where: { id } })

    if (!getUser) {
      return res.json({ status: 200, result: "Not Found" })
    }

    const updatedUser = await getUser.update(req.body);

    return res.json({ status: 200, result: "Update Success" })
  }
  catch (err) {
    return res.json({ status: 404, result: err })
  }
})

//? Delete User
router.delete('/delete/:id', authorizationAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getUser = await userInstance.findOne({ where: { id } })

    if (!getUser) {
      return res.json({ status: 200, result: "Not Found" })
    }

    const deletedUser = await getUser.destroy();

    return res.json({ status: 200, result: "Delete Success" })
  }
  catch (err) {
    return res.json({ status: 404, result: err })
  }
})

export default router;
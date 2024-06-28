import express from 'express'
import { getData, addData,deleteData,updateData } from "../controllers/dataController.js";

const router = express.Router();

router.get('/getData',getData)
router.post('/addData',addData)
router.patch('/updateData/:id',updateData)
router.delete('/deleteData/:id',deleteData)

export default router;


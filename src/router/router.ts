import { Router } from "express";
import * as studentController from "../controller/students"

const studentRouter:Router = Router()


studentRouter.get('/',studentController.getAllList)
studentRouter.get('/addNewStudent',studentController.addStudent);
studentRouter.post("/verifyStudent",studentController.verifyStudent);


studentRouter.get('/editStudent',studentController.editStudent);
studentRouter.put('/updateStudent',studentController.updateStudent);








export default studentRouter;
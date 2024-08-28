import express from "express"
import { createNewMenu, deleteMenu, getMenu, getMenuById, updateMenu} from "../controller/menuController.js"


const router = express.Router()

router.get("/", getMenu)
router.get("/find/:id", getMenuById)
router.post("/create", createNewMenu)
router.put("/edit/:id", updateMenu)
router.delete("/delete/:id", deleteMenu)

export default router
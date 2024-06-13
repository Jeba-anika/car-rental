import express from "express";
const router = express.Router();

router.post("/");
router.get("/:id");
router.put("/:id");
router.delete("/:id");
router.put("/return");
router.get("/");

export const CarRoutes = router;
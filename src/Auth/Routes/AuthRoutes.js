const express = require("express");
const router = express.Router();
const AuthController = require('../Controller/AuthController')


router.get("/", async (req, res) => {
  try {
    await AuthController.Init(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Err "+error });
  }
});

router.post("/login", async(req, res)=>{
    try {
        await AuthController.Login(req, res)
    } catch (error) {
        
    }
})

module.exports = router;

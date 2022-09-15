import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => { // hostname/example
    res.status(200).send("Example Route");
});

router.post("/test", (req, res) => { // hostname/example/test
    res.status(200).json({
        message: "Hello World",
        code: 200,
    });
})

export default router;
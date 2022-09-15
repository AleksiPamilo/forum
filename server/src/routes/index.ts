import express from "express";
import exampleRoute from "./example";

const router = express.Router();

const routes = [
    {
        path: "/example",
        route: exampleRoute,
    }
]

routes.map((route) => {
    router.use(route.path, route.route);
});

export default router;
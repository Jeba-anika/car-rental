import { Router } from "express";
import { CarRoutes } from "../modules/car/car.router";
import { UserRouter } from "../modules/user/user.router";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: UserRouter,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

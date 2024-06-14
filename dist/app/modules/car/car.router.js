"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const car_controller_1 = require("./car.controller");
const car_validation_1 = require("./car.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.CarValidations.createCarValidation), car_controller_1.CarController.createCar);
router.get('/:id', car_controller_1.CarController.getSingleCar);
router.put('/return', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.CarValidations.returnCarValidation), car_controller_1.CarController.returnCar);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.CarValidations.updateCarValidation), car_controller_1.CarController.updateCar);
router.delete('/:id', (0, auth_1.default)('admin'), car_controller_1.CarController.deleteCar);
router.get('/', car_controller_1.CarController.getAllCars);
exports.CarRoutes = router;

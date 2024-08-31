"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.userSignupValidation), user_controller_1.UserController.createUser);
router.post('/signin', (0, validateRequest_1.default)(user_validation_1.UserValidation.userSignInValidation), user_controller_1.UserController.userSignIn);
router.post('/refresh-token', (0, validateRequest_1.default)(user_validation_1.UserValidation.refreshTokenValidationSchema), user_controller_1.UserController.refreshToken);
router.put('/update-profile', (0, auth_1.default)('user', 'admin'), user_controller_1.UserController.updateProfile);
router.get('/profile', (0, auth_1.default)('user', 'admin'), user_controller_1.UserController.getProfile);
router.get('/users', (0, auth_1.default)('admin'), user_controller_1.UserController.getUsers);
exports.UserRouter = router;

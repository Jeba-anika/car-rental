"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAddCarReq = exports.calcTotalDuration = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const calcTotalDuration = (startTime, endTime) => {
    const startHourAndMin = startTime.split(':');
    const endHourAndMin = endTime.split(':');
    const startHour = Number(startHourAndMin[0]);
    const startMin = Number(startHourAndMin[1]);
    const endHour = Number(endHourAndMin[0]);
    const endMin = Number(endHourAndMin[1]);
    let timeDiff = 0;
    const hourDiff = endHour - startHour;
    if (endMin - startMin === 0) {
        timeDiff = hourDiff;
    }
    else if (startMin > endMin) {
        const minDiff = startMin - endMin;
        timeDiff = hourDiff - 1 + minDiff / 60;
    }
    else if (startMin < endMin) {
        const minDiff = endMin - startMin;
        timeDiff = hourDiff + Number((minDiff / 60).toFixed(2));
    }
    return timeDiff;
};
exports.calcTotalDuration = calcTotalDuration;
exports.convertAddCarReq = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        const data = JSON.parse(req.body.data);
        const newData = Object.assign(Object.assign({}, data), { images: req.files.map((file) => ({
                altText: file === null || file === void 0 ? void 0 : file.filename,
                url: file === null || file === void 0 ? void 0 : file.path,
            })) });
        req.body = newData;
        next();
    }
    else {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Please upload at least one image');
    }
}));

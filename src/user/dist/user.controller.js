"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var get_user_decorator_1 = require("src/auth/decorator/get-user.decorator");
var guard_1 = require("src/auth/guard");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    UserController.prototype.getMe = function (user, email) {
        console.log(email);
        return user;
    };
    __decorate([
        common_1.UseGuards(guard_1.JwtGuard),
        common_1.Get('me'),
        __param(0, get_user_decorator_1.GetUser()), __param(1, get_user_decorator_1.GetUser('email'))
    ], UserController.prototype, "getMe");
    UserController = __decorate([
        common_1.Controller('users')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;

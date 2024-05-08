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
exports.ProjectsController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var common_1 = require("@nestjs/common");
var get_user_decorator_1 = require("src/auth/decorator/get-user.decorator");
var guard_1 = require("src/auth/guard");
var ProjectsController = /** @class */ (function () {
    function ProjectsController(projectService) {
        this.projectService = projectService;
    }
    ProjectsController.prototype.getMe = function (id) {
        return this.projectService.getProject(id);
    };
    ProjectsController.prototype.createProject = function (id, dto) {
        return this.projectService.createProject(id, dto);
    };
    ProjectsController.prototype.editProject = function (userId, projectId, dto) {
        return this.projectService.editProjectById(userId, projectId, dto);
    };
    __decorate([
        common_1.UseGuards(guard_1.JwtGuard),
        common_1.Get(),
        __param(0, get_user_decorator_1.GetUser('id'))
    ], ProjectsController.prototype, "getMe");
    __decorate([
        common_1.UseGuards(guard_1.JwtGuard),
        common_1.Post('create'),
        __param(0, get_user_decorator_1.GetUser('id')), __param(1, common_1.Body())
    ], ProjectsController.prototype, "createProject");
    __decorate([
        common_1.UseGuards(guard_1.JwtGuard),
        common_1.Patch(':id'),
        __param(0, get_user_decorator_1.GetUser('id')),
        __param(1, common_1.Param('id', common_1.ParseIntPipe)),
        __param(2, common_1.Body())
    ], ProjectsController.prototype, "editProject");
    ProjectsController = __decorate([
        common_1.Controller('projects')
    ], ProjectsController);
    return ProjectsController;
}());
exports.ProjectsController = ProjectsController;

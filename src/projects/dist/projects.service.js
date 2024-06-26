"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProjectsService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var common_1 = require("@nestjs/common");
var ProjectsService = /** @class */ (function () {
    function ProjectsService(prisma) {
        this.prisma = prisma;
    }
    ProjectsService.prototype.getProject = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prisma.project.findMany({
                        where: {
                            OR: [
                                {
                                    creatorId: userId
                                },
                                {
                                    users: {
                                        some: {
                                            id: userId
                                        }
                                    }
                                },
                            ]
                        },
                        include: {
                            users: true
                        }
                    })];
            });
        });
    };
    ProjectsService.prototype.createProject = function (id, dto) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var project, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prisma.project.create({
                                data: {
                                    title: dto.title,
                                    progress: dto.progress,
                                    creatorId: id,
                                    users: {
                                        // Map the array of userIds to an array of user objects
                                        connect: (_a = dto.users) === null || _a === void 0 ? void 0 : _a.map(function (userId) { return ({ id: userId }); })
                                    }
                                },
                                include: {
                                    users: true
                                }
                            })];
                    case 1:
                        project = _b.sent();
                        return [2 /*return*/, project];
                    case 2:
                        error_1 = _b.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectsService.prototype.editProjectById = function (userId, projectId, dto) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var project, usersOfProject, isCreator, isUserIdPresent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.prisma.project.findUnique({
                            where: {
                                id: projectId
                            },
                            include: {
                                users: {
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        project = _b.sent();
                        if (!project) {
                            throw new common_1.ForbiddenException('This project Not exist !', '404');
                        }
                        usersOfProject = project.users;
                        console.log(usersOfProject, 'users of project');
                        isCreator = project.creatorId === userId;
                        isUserIdPresent = usersOfProject.some(function (user) { return user.id === userId; });
                        if (!isCreator && !isUserIdPresent) {
                            throw new common_1.ForbiddenException('Not permission to Update!', '403');
                        }
                        return [2 /*return*/, this.prisma.project.update({
                                where: {
                                    id: projectId
                                },
                                data: {
                                    title: dto.title,
                                    progress: dto.progress,
                                    users: {
                                        // Map the array of userIds to an array of user objects
                                        connect: (_a = dto.users) === null || _a === void 0 ? void 0 : _a.map(function (userId) { return ({ id: userId }); })
                                    }
                                },
                                include: {
                                    users: true
                                }
                            })];
                }
            });
        });
    };
    ProjectsService = __decorate([
        common_1.Injectable()
    ], ProjectsService);
    return ProjectsService;
}());
exports.ProjectsService = ProjectsService;

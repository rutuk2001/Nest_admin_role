"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const authenticated_guard_1 = require("../auth/authenticated.guard");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async createGroupAndAssignAdmin(groupName, adminEmail, req) {
        const role = req.user.role;
        try {
            const group = await this.groupService.createGroupAndAssignAdmin(groupName, adminEmail, role);
            return { success: true, group };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async addUsersToGroup(groupId, userEmails, req) {
        const role = req.user.role;
        try {
            const group = await this.groupService.addUsersToGroup(groupId, userEmails, role);
            return { success: true, group };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async getAllGroups(req) {
        const role = req.user.role;
        try {
            const groups = await this.groupService.getAllGroups(role);
            return { success: true, groups };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async getGroupById(groupId, req) {
        const role = req.user.role;
        try {
            const group = await this.groupService.getGroupById(groupId, role);
            return { success: true, group };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)("groupName")),
    __param(1, (0, common_1.Body)("adminEmail")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createGroupAndAssignAdmin", null);
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Post)(":groupId/users"),
    __param(0, (0, common_1.Param)("groupId")),
    __param(1, (0, common_1.Body)("userEmails")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "addUsersToGroup", null);
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getAllGroups", null);
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Get)(":groupId"),
    __param(0, (0, common_1.Param)("groupId")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroupById", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)("group"),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
//# sourceMappingURL=group.controller.js.map
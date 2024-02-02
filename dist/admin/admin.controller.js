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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./admin.dto");
const authenticated_guard_1 = require("../auth/authenticated.guard");
const email_service_1 = require("../helper/email.service");
let AdminController = class AdminController {
    constructor(adminService, emailService) {
        this.adminService = adminService;
        this.emailService = emailService;
    }
    create(createadminDto) {
        try {
            return this.adminService.create(createadminDto);
        }
        catch (error) {
            throw new common_1.HttpException({ message: "Validation failed", errors: error.response.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createUser(req, createadminDto) {
        const role = req.user.role;
        if (role === "ADMIN") {
            console.log(createadminDto.email, "??????????????????");
            const otp = this.emailService.generateOtp();
            console.log(otp);
            await this.emailService.sendOtpEmail(createadminDto.email, otp);
            return this.adminService.create(createadminDto);
        }
        else {
            return "You are not an authorised person";
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Post)("/create_user"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createUser", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        email_service_1.EmailService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map
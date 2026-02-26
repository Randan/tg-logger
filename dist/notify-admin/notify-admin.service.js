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
exports.NotifyAdminService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_telegraf_1 = require("nestjs-telegraf");
let NotifyAdminService = class NotifyAdminService {
    constructor(bot, config) {
        this.bot = bot;
        this.config = config;
    }
    send(message, options) {
        const adminId = this.config.get('ADMIN_TELEGRAM_ID');
        if (!adminId) {
            return;
        }
        this.bot.telegram.sendMessage(adminId, message, options || {}).catch(err => {
            console.error('Failed to send admin notification:', err);
        });
    }
};
exports.NotifyAdminService = NotifyAdminService;
exports.NotifyAdminService = NotifyAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [Function, Function])
], NotifyAdminService);
//# sourceMappingURL=notify-admin.service.js.map
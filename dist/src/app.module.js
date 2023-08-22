"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const message_service_1 = require("../services/message.service");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("@nestjs/axios");
const cron_module_1 = require("./cron/cron.module");
const watch_list_module_1 = require("./watch-list/watch-list.module");
const videos_module_1 = require("./videos/videos.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            schedule_1.ScheduleModule.forRoot(),
            axios_1.HttpModule,
            cron_module_1.CronModule,
            watch_list_module_1.WatchListModule,
            videos_module_1.VideosModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, message_service_1.MessageService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const global_exception_handler_1 = require("../core/exception-handlers/global-exception-handler");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const port = process.env.PORT || 8082;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new global_exception_handler_1.GlobalExceptionHandler());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    await app.listen(port).then(() => {
        console.log(`App is running on ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
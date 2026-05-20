"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArquivoController = exports.TamanhoArquivoFilter = void 0;
const common_1 = require("@nestjs/common");
const arquivo_service_1 = require("./arquivo.service");
const update_arquivo_dto_1 = require("./dto/update-arquivo.dto");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const fs = __importStar(require("fs"));
let TamanhoArquivoFilter = class TamanhoArquivoFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        response.status(413).json({
            message: 'O arquivo ultrapassa o limite permitido de 5MB.',
            error: 'Payload Too Large',
            statusCode: 413,
        });
    }
};
exports.TamanhoArquivoFilter = TamanhoArquivoFilter;
exports.TamanhoArquivoFilter = TamanhoArquivoFilter = __decorate([
    (0, common_1.Catch)(common_1.PayloadTooLargeException)
], TamanhoArquivoFilter);
let ArquivoController = class ArquivoController {
    arquivoService;
    constructor(arquivoService) {
        this.arquivoService = arquivoService;
    }
    uploadFile(file) {
        return { message: 'Upload realizado com sucesso!', arquivo: file.filename };
    }
    findAll() {
        return this.arquivoService.findAll();
    }
    findOne(id) {
        return this.arquivoService.findOne(+id);
    }
    update(id, updateArquivoDto) {
        return this.arquivoService.update(+id, updateArquivoDto);
    }
    remove(nome) {
        const nomeSeguro = (0, path_1.basename)(nome);
        const caminhoArquivo = `./drive/${nomeSeguro}`;
        if (!fs.existsSync(caminhoArquivo)) {
            throw new common_1.NotFoundException('O arquivo solicitado não foi encontrado no servidor.');
        }
        fs.unlinkSync(caminhoArquivo);
        return { message: 'Arquivo removido com sucesso!' };
    }
};
exports.ArquivoController = ArquivoController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseFilters)(new TamanhoArquivoFilter()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './drive',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: {
            fileSize: 5 * 1024 * 1024
        },
        fileFilter: (req, file, callback) => {
            const formatosPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
            if (!formatosPermitidos.includes(file.mimetype)) {
                return callback(new common_1.BadRequestException('O formato de arquivo é inadequado, envie apenas arquivos png, jpeg, jpg e tiff'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_arquivo_dto_1.UpdateArquivoDto]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':nome'),
    __param(0, (0, common_1.Param)('nome')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "remove", null);
exports.ArquivoController = ArquivoController = __decorate([
    (0, common_1.Controller)('arquivo'),
    __metadata("design:paramtypes", [arquivo_service_1.ArquivoService])
], ArquivoController);
//# sourceMappingURL=arquivo.controller.js.map
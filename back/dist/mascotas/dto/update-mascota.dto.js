"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMascotaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mascota_dto_1 = require("./create-mascota.dto");
class UpdateMascotaDto extends (0, mapped_types_1.PartialType)(create_mascota_dto_1.CreateMascotaDto) {
}
exports.UpdateMascotaDto = UpdateMascotaDto;
//# sourceMappingURL=update-mascota.dto.js.map
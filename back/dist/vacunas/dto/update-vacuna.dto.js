"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVacunaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vacuna_dto_1 = require("./create-vacuna.dto");
class UpdateVacunaDto extends (0, mapped_types_1.PartialType)(create_vacuna_dto_1.CreateVacunaDto) {
}
exports.UpdateVacunaDto = UpdateVacunaDto;
//# sourceMappingURL=update-vacuna.dto.js.map
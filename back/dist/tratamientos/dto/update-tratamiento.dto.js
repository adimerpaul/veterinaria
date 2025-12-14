"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTratamientoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tratamiento_dto_1 = require("./create-tratamiento.dto");
class UpdateTratamientoDto extends (0, mapped_types_1.PartialType)(create_tratamiento_dto_1.CreateTratamientoDto) {
}
exports.UpdateTratamientoDto = UpdateTratamientoDto;
//# sourceMappingURL=update-tratamiento.dto.js.map
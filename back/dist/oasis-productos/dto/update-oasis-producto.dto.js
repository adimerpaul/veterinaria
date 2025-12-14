"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOasisProductoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_oasis_producto_dto_1 = require("./create-oasis-producto.dto");
class UpdateOasisProductoDto extends (0, mapped_types_1.PartialType)(create_oasis_producto_dto_1.CreateOasisProductoDto) {
}
exports.UpdateOasisProductoDto = UpdateOasisProductoDto;
//# sourceMappingURL=update-oasis-producto.dto.js.map
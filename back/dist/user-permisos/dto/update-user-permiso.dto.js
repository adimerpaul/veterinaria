"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPermisoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_permiso_dto_1 = require("./create-user-permiso.dto");
class UpdateUserPermisoDto extends (0, mapped_types_1.PartialType)(create_user_permiso_dto_1.CreateUserPermisoDto) {
}
exports.UpdateUserPermisoDto = UpdateUserPermisoDto;
//# sourceMappingURL=update-user-permiso.dto.js.map
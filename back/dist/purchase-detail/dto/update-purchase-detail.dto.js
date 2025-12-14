"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchaseDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_purchase_detail_dto_1 = require("./create-purchase-detail.dto");
class UpdatePurchaseDetailDto extends (0, mapped_types_1.PartialType)(create_purchase_detail_dto_1.CreatePurchaseDetailDto) {
}
exports.UpdatePurchaseDetailDto = UpdatePurchaseDetailDto;
//# sourceMappingURL=update-purchase-detail.dto.js.map
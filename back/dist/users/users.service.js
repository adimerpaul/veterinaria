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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const class_transformer_1 = require("class-transformer");
const producto_entity_1 = require("../productos/entities/producto.entity");
const path_1 = require("path");
const fs_1 = require("fs");
let UsersService = class UsersService {
    usersRepository;
    productosRepository;
    jwtService;
    constructor(usersRepository, productosRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.productosRepository = productosRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: {
                username: createUserDto.username,
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Usuario ya existe');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        this.usersRepository.save(user);
        const sanitizedUser = (0, class_transformer_1.plainToInstance)(user_entity_1.User, user);
        return sanitizedUser;
    }
    async login(body) {
        const user = await this.usersRepository.findOne({
            where: {
                username: body.username,
            },
            relations: {
                userPermisos: {
                    permiso: true,
                },
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
        if (!isPasswordCorrect) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        const payload = {
            username: user.username,
            sub: user.id,
        };
        const token = this.jwtService.sign(payload);
        const userPayload = (0, class_transformer_1.plainToInstance)(user_entity_1.User, user);
        return { token, user: userPayload };
    }
    async me(req) {
        const user = await this.usersRepository.findOne({
            where: {
                id: req.user.userId,
            },
            relations: {
                userPermisos: {
                    permiso: true,
                },
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const userPayload = (0, class_transformer_1.plainToInstance)(user_entity_1.User, user);
        return userPayload;
    }
    async migracion() {
        await this.usersRepository.query('TRUNCATE TABLE users;');
        const hashedPassword = bcrypt.hashSync('123456', 10);
        const users = [
            {
                name: 'ING. ADIMER PAUL CHAMBI AJATA',
                username: 'Adimer',
                role: 'Admin',
            },
            {
                name: 'MVZ. ROGER PAUL HUARACHI TITO',
                username: 'Roger',
                role: 'Admin',
            },
            {
                name: 'LIC. MARLENE CANAVIRI JORGE',
                username: 'Marlene',
                role: 'Vendedor',
            },
            {
                name: 'LIC. PAMELA ELIZABETH CUEVAS VARGAS',
                username: 'Pamela',
                role: 'Vendedor',
            },
            {
                name: 'MVZ. LUZ NAYRA CONDORI PITA',
                username: 'Luz',
                role: 'Vendedor',
            },
            {
                name: 'MVZ. ADALID ARTURO HUAYLLAS LOPEZ',
                username: 'Adalid',
                role: 'Vendedor',
            },
            {
                name: 'TVZ. REBECA CATALINA LOPEZ MENDIZABAL',
                username: 'Rebeca',
                role: 'Vendedor',
            },
            {
                name: 'TVZ. JUDITH CINTIA FLORES CHOQUE',
                username: 'Judith',
                role: 'Vendedor',
            },
        ];
        await this.usersRepository.save(users.map((user) => ({
            ...user,
            password: hashedPassword,
        })));
        await this.productosRepository.query('TRUNCATE TABLE productos;');
        const basePath = __dirname.includes('dist')
            ? (0, path_1.join)(__dirname, '..', '..', 'src', 'users')
            : (0, path_1.join)(__dirname, 'users');
        const sqlPath = (0, path_1.join)(basePath, 'productos_202503120545.sql');
        try {
            const sqlScript = (0, fs_1.readFileSync)(sqlPath, 'utf8');
            await this.productosRepository.query(sqlScript);
            console.log('Migración de productos completada.');
        }
        catch (error) {
            console.error('Error al leer el archivo SQL:', error.message);
        }
        return users;
    }
    async findAll() {
        const users = await this.usersRepository.find({
            relations: {
                userPermisos: {
                    permiso: true,
                },
            },
            order: {
                id: 'DESC',
            },
        });
        const sanitizedUsers = users.map((user) => (0, class_transformer_1.plainToInstance)(user_entity_1.User, user));
        return sanitizedUsers;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    async update(id, body) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        user.name = body.name;
        user.role = body.role;
        user.username = body.username;
        user.agencia = body.agencia;
        await this.usersRepository.save(user);
    }
    async remove(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        await this.usersRepository.remove(user);
    }
    async updatePassword(id, body) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const hashedPassword = await bcrypt.hash(body.newPassword, 10);
        user.password = hashedPassword;
        await this.usersRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map
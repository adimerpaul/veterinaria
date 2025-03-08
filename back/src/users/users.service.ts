import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { Producto } from '../productos/entities/producto.entity';
import { join } from 'path';
import { readFileSync } from 'fs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (existingUser) {
      throw new ConflictException('Usuario ya existe');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    this.usersRepository.save(user);
    const sanitizedUser = plainToInstance(User, user);
    return sanitizedUser;
  }

  async login(body) {
    const user = await this.usersRepository.findOne({
      where: {
        username: body.username,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const payload = {
      username: user.username,
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);
    const userPayload = plainToInstance(User, user);
    return { token, user: userPayload };
  }
  async me(req) {
    const user = await this.usersRepository.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const userPayload = plainToInstance(User, user);
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

    // Insertar usuarios en la base de datos
    await this.usersRepository.save(
      users.map((user) => ({
        ...user,
        password: hashedPassword,
      })),
    );

    await this.productosRepository.query('TRUNCATE TABLE productos;');
    const basePath = __dirname.includes('dist')
      ? join(__dirname, '..', '..', 'src', 'users') // Para producción (dentro de dist)
      : join(__dirname, 'users'); // Para desarrollo

    const sqlPath = join(basePath, 'productos_202502280621.sql');

    try {
      const sqlScript = readFileSync(sqlPath, 'utf8');
      await this.productosRepository.query(sqlScript);
      console.log('Migración de productos completada.');
    } catch (error) {
      console.error('Error al leer el archivo SQL:', error.message);
    }
    return users;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    const sanitizedUsers = users.map((user) => plainToInstance(User, user));
    return sanitizedUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

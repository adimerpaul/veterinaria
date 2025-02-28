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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    const accessToken = this.jwtService.sign(payload);
    const sanitizedUser = plainToInstance(User, user);
    return { accessToken, sanitizedUser };
  }
  async migracion() {
    await this.usersRepository.query('TRUNCATE TABLE users;');

    const hashedPassword = bcrypt.hashSync('123456', 10);

    const users = [
      {
        name: 'ING. ADIMER PAUL CHAMBI AJATA',
        username: 'Adimer',
        role: 'Administrador',
      },
      {
        name: 'MVZ. ROGER PAUL HUARACHI TITO',
        username: 'Roger',
        role: 'Administrador',
      },
      {
        name: 'LIC. MARLENE CANAVIRI JORGE',
        username: 'Marlene',
        role: 'Administrador',
      },
      {
        name: 'LIC. PAMELA ELIZABETH CUEVAS VARGAS',
        username: 'Pamela',
        role: 'Administrador',
      },
      {
        name: 'MVZ. LUZ NAYRA CONDORI PITA',
        username: 'Luz',
        role: 'Administrador',
      },
      {
        name: 'MVZ. ADALID ARTURO HUAYLLAS LOPEZ',
        username: 'Adalid',
        role: 'Administrador',
      },
      {
        name: 'TVZ. REBECA CATALINA LOPEZ MENDIZABAL',
        username: 'Rebeca',
        role: 'Administrador',
      },
      {
        name: 'TVZ. JUDITH CINTIA FLORES CHOQUE',
        username: 'Judith',
        role: 'Administrador',
      },
    ];

    // Insertar usuarios en la base de datos
    await this.usersRepository.save(
      users.map((user) => ({
        ...user,
        password: hashedPassword,
      })),
    );
    return users;
  }

  findAll() {
    return `This action returns all users`;
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

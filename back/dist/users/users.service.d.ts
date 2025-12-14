import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Producto } from '../productos/entities/producto.entity';
export declare class UsersService {
    private usersRepository;
    private productosRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, productosRepository: Repository<Producto>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    login(body: any): Promise<{
        token: string;
        user: User;
    }>;
    me(req: any): Promise<User>;
    migracion(): Promise<{
        name: string;
        username: string;
        role: string;
    }[]>;
    findAll(): Promise<User[]>;
    findOne(id: number): string;
    update(id: number, body: any): Promise<void>;
    remove(id: number): Promise<void>;
    updatePassword(id: number, body: any): Promise<void>;
}

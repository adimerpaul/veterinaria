import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    migracion(): Promise<{
        name: string;
        username: string;
        role: string;
    }[]>;
    login(body: any): Promise<{
        token: string;
        user: import("./entities/user.entity").User;
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    me(req: Request): Promise<import("./entities/user.entity").User>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): Promise<void>;
    remove(id: string): Promise<void>;
    updatePassword(id: string, req: Request, body: any): Promise<void>;
}

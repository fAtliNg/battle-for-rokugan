import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 15;
const MIN_LOGIN_LENGTH = 4;
const MAX_LOGIN_LENGTH = 15;

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username, password) {
        const user = await this.usersService.findOne(username);
        if (!user || user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(username, password) {
        if (username?.length < MIN_LOGIN_LENGTH) {
            throw new BadRequestException('Ошибка регистрации', { cause: new Error(), description: `Имя пользователя должно быть не меньше ${MIN_LOGIN_LENGTH} символов` })
        }
        if (username?.length > MAX_LOGIN_LENGTH) {
            throw new BadRequestException('Ошибка регистрации', { cause: new Error(), description: `Имя пользователя должно быть не больше ${MAX_LOGIN_LENGTH} символов` })
        }
        if (password?.length < MIN_PASSWORD_LENGTH) {
            throw new BadRequestException('Ошибка регистрации', { cause: new Error(), description: `Пароль должен быть не меньше ${MIN_PASSWORD_LENGTH} символов` })
        }
        if (password?.length > MAX_PASSWORD_LENGTH) {
            throw new BadRequestException('Ошибка регистрации', { cause: new Error(), description: `Пароль должен быть не больше ${MAX_PASSWORD_LENGTH} символов` })
        }
        const user = await this.usersService.findOne(username);
        if (user) {
            throw new BadRequestException('Ошибка регистрации', { cause: new Error(), description: `Пользователь ${username} уже зарегистрирован` })
        }
        const newUser = await this.usersService.create(username, password);

        if (!newUser) {
            throw new UnauthorizedException();
        }
        const payload = { username: newUser.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

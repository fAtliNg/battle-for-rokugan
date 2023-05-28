import { Injectable } from '@nestjs/common';
// import {Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(username: string): Promise<User | undefined> {
        const res = await this.prisma.user.findFirst({
            where: {
                login: { in: [username] },
            }
        })
        return res;
    }
}

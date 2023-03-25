import { ConfigService } from '@nestjs/config';
import { JwtDecodedData } from '@app/infrastructure/types/jwt.types';
import { UserService } from '@app/user/user.service';
import { User } from '@domain/user/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(data: JwtDecodedData): Promise<User>;
}
export {};

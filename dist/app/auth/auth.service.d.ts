import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { KakaoUserInfo, UserRequestCommand } from '@app/auth/commands/kakao.command';
import { TokenResponse } from '@app/auth/dto/token.response';
import { Request } from '@app/infrastructure/types/request.types';
import { UserService } from '@app/user/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly httpService;
    constructor(jwtService: JwtService, userService: UserService, httpService: HttpService);
    kakaoLogin(data: UserRequestCommand): Promise<KakaoUserInfo>;
    login(id: string): Promise<TokenResponse>;
    refresh(req: Request): Promise<TokenResponse>;
    logout(req: Request, res: any): boolean;
    protected generateAccessToken(userId: string): Promise<string>;
    protected generateRefreshToken(userId: string): Promise<string>;
}

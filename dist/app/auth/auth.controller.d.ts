import { AuthService } from '@app/auth/auth.service';
import { KakaoAuthRequest } from '@app/auth/dto/kakao-auth.request';
import { TokenResponse } from '@app/auth/dto/token.response';
import { Request } from '@app/infrastructure/types/request.types';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { UserService } from '@app/user/user.service';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    getMyProfile({ userData }: Request): Promise<UserProfileResponse>;
    kakaoLogin(accountRequestInfo: KakaoAuthRequest): Promise<TokenResponse>;
    refresh(req: Request): Promise<TokenResponse>;
    logout(req: Request, res: any): Promise<boolean>;
    getToken(userId: string): Promise<TokenResponse>;
    googleLogin(): void;
    googleLoginCallback(req: any): any;
}

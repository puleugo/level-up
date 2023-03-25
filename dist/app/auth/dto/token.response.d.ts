import { loginResponse } from '@app/auth/commands/login.response';
export declare class TokenResponse {
    accessToken: string;
    refreshToken?: string;
    constructor(tokens: loginResponse);
}

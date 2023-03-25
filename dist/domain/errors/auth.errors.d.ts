import { BadRequestException, UnauthorizedException } from '@nestjs/common';
export declare const AUTH_ERRORS: {
    TOKEN_INVALID: string;
    UNAUTHORIZED: string;
    KAKAO_API_FAILED: string;
};
export declare class InvalidTokenException extends BadRequestException {
    constructor();
}
export declare class NeedAuthenticationException extends UnauthorizedException {
    constructor();
}
export declare class KakaoApiFailedException extends BadRequestException {
    constructor();
}

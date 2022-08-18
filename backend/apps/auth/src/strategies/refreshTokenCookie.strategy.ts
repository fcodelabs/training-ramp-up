import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenCookieStrategy extends PassportStrategy(Strategy, 'jwt-refresh-cookie') {
    constructor() {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let refreshToken = request?.cookies["refresh-token"];
                if (!refreshToken) {
                    return null;
                }
                return refreshToken;
            }]),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        })
    }

    async validate(req: Request, payload: any) {

        if (payload === null) {
            throw new UnauthorizedException();
        }
        const refreshToken = req.cookies['refresh-token'];
        return { ...payload, refreshToken };
    }
}
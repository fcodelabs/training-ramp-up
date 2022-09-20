import jwt from 'jsonwebtoken';

export function verifyJWT(token :string){
    try{
        const decoded: any = jwt.verify(token,"NavyPenguinMariachi");
        return {payload:decoded, expired: false};
    }catch(error){
        return { payload: null, expired: true};
    }
}
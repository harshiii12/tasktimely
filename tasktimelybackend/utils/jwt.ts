import jwt from 'jsonwebtoken'

export type TJwtPayload = {
    id: string,
}

export function signJwt(payload : TJwtPayload ){
    const signed = jwt.sign(payload, "secret")
    return signed
}
export function readJwt(token : string ){
    const _payload = jwt.verify(token, "secret")
    // @ts-ignore
    return _payload.id
}

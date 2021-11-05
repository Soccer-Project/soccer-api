import { Request } from "express";
import { Params } from 'express-serve-static-core';

export function makeMockRequest({ 
    params, query, playerId, admin, userId }: 
    { params?: Params, query?: Params, playerId?: string, admin?: string, userId?: string}): Request{
    const request =  {
        params: params || {},
        query: query || {},
        playerId: playerId,
        admin: admin,
        userId: userId
    } as unknown;

    return request as Request;
}

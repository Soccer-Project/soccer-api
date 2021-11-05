import { Request } from "express";
import { Params } from 'express-serve-static-core';

export function makeMockRequest({ params, query, playerId, admin }: { params?: Params, query?: Params, playerId?: string, admin?: boolean}): Request{
    const request =  {
        params: params || {},
        query: query || {},
        playerId: playerId,
        admin: admin
    } as unknown;

    return request as Request;
}

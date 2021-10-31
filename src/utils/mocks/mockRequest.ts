import { Request } from "express";
import { Params } from 'express-serve-static-core';

export function makeMockRequest({ params, query, playerId }: { params?: Params, query?: Params, playerId?: string}): Request{
    const request =  {
        params: params || {},
        query: query || {},
        playerId: playerId
    } as unknown;

    return request as Request;
}

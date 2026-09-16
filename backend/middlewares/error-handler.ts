import { Request, Response, NextFunction } from 'express'
import { isCelebrateError } from 'celebrate'


export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err instanceof Error && 'statusCode' in err
        && typeof err.statusCode === 'number'
        ? err.statusCode
        : 500

    const message = err instanceof Error && statusCode !== 500
        ? err.message
        : 'На сервере произошла ошибка'

        if(isCelebrateError(err)) {
            return res.status(400).send({message: err.message})
        }

    res.status(statusCode).send({
        message
    })
}

export default errorHandler
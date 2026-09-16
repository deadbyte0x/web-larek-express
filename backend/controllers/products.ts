import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from 'mongoose'
import Product from "../models/product";
import BadRequestError from '../errors/bad-request-error'
import ConflictError from '../errors/conflict-error'

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const products = await Product.find({})
    res.send({items: products, total: products.length})
    } catch(error) {
       return next(error)
    }
}

export const postProducts = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const product = await Product.create(req.body)

        res.status(201).send(product)
    } catch(error) {
        if (error instanceof Error && error.message.includes('E11000')) {
            return next(new ConflictError('Товар с таким названием уже существует'))
        }

        if (error instanceof MongooseError.ValidationError) {
            return next(new BadRequestError(error.message))
        }

       return next(error)
    }
}
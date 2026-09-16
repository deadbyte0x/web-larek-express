import { NextFunction, Request, Response } from 'express'
import { faker } from '@faker-js/faker'
import Product from '../models/product'
import BadRequestError from '../errors/bad-request-error'

export const postOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            payment,
            email,
            phone,
            address,
            total,
            items
        } = req.body

        if (
            !payment ||
            !email ||
            !phone ||
            !address ||
            total === undefined ||
            !items
        ) {
            return next(
                new BadRequestError(
                    'Ошибка валидации данных при создании заказа'
                )
            )
        }

        if (payment !== 'card' && payment !== 'online') {
            return next(
                new BadRequestError(
                    'Ошибка валидации данных при создании заказа'
                )
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            return next(
                new BadRequestError(
                    'Ошибка валидации данных при создании заказа'
                )
            )
        }

        if (!Array.isArray(items) || items.length === 0) {
            return next(
                new BadRequestError(
                    'Ошибка валидации данных при создании заказа'
                )
            )
        }

        const products = await Product.find({
            _id: { $in: items }
        })

        if (products.length !== items.length) {
            return next(
                new BadRequestError(
                    'Ошибка валидации данных при создании заказа'
                )
            )
        }

        const unavailableProduct = products.find(
            product => product.price === null
        )

        if (unavailableProduct) {
            return next(
                new BadRequestError(
                    'Ошибка валидации данных при создании заказа'
                )
            )
        }

        const calculatedTotal = products.reduce(
            (sum, product) => sum + product.price!,
            0
        )

        if (calculatedTotal !== total) {
            return next(
                new BadRequestError(
                    'Ошибка валидации данных при создании заказа'
                )
            )
        }

        const id = faker.string.uuid()

        res.status(200).json({
            id,
            total: calculatedTotal
        })
    } catch (error) {
       return next(error)
    }
}
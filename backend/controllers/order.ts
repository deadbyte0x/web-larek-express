import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export const postOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { total, items } = req.body;

    const products = await Product.find({
      _id: { $in: items },
    });

    if (products.length !== items.length) {
      return next(
        new BadRequestError('Ошибка валидации данных при создании заказа'),
      );
    }

    const unavailableProduct = products.find(
      (product) => product.price === null,
    );

    if (unavailableProduct) {
      return next(
        new BadRequestError('Ошибка валидации данных при создании заказа'),
      );
    }

    const calculatedTotal = products.reduce(
      (sum, product) => sum + product.price!,
      0,
    );

    if (calculatedTotal !== total) {
      return next(
        new BadRequestError('Ошибка валидации данных при создании заказа'),
      );
    }

    const id = faker.string.uuid();

    res.status(200).json({
      id,
      total: calculatedTotal,
    });
  } catch (error) {
    return next(error);
  }
};

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import { PORT, DB_ADDRESS } from './config';
import productRouter from '../routes/product';
import orderRouter from '../routes/order';
import { errorHandler } from '../middlewares/error-handler';
import { notFound } from '../middlewares/not-found';
import { productRouteValidator } from '../middlewares/validations';
import { requestLogger, errorLogger } from '../middlewares/logger';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(process.cwd(), 'public')));

mongoose.connect(DB_ADDRESS).then(() => console.log('DB connected successful')).catch((err) => console.log(err));
app.use(requestLogger);

app.use('/product', productRouteValidator, productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);

app.use(errors());
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening ${PORT} PORT`));

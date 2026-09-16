import { model, Schema } from 'mongoose'


export interface IProduct {
    title: string
    image: {
        fileName: string
        originalName: string
    }
    category: string
    description: string
    price?: number
}

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        unique: true,
        required: [true, 'Поле "title" должно быть заполнено'],
        minlength: [2, 'Минимальная длина поля "title" - 2'],
        maxlength: [30, 'Максимальная длина поля "title" - 30']
    },
    image: {
        fileName: {
            type: String,
            required: [true, 'Поле "fileName" должно быть заполнено']
        },
        originalName: {
            type: String,
            required: [true, 'Поле "originalName" должно быть заполнено']
        }
    },
    category: {
        type: String,
        required: [true, 'Поле "category" должно быть заполнено']
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false,
        default: null
    }
})

export default model<IProduct>('product', productSchema)
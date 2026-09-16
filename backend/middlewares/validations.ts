import { celebrate, Joi, Segments } from 'celebrate';


export const productValidationSchema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            'any.required': 'Поле "title" должно быть заполнено',
            'string.empty': 'Поле "title" должно быть заполнено',
            'string.min': 'Минимальная длина поля "title" - 2',
            'string.max': 'Максимальная длина поля "title" - 30'
        }),

    image: Joi.object({
        fileName: Joi.string()
            .required()
            .messages({
                'any.required': 'Поле "fileName" должно быть заполнено',
                'string.empty': 'Поле "fileName" должно быть заполнено'
            }),

        originalName: Joi.string()
            .required()
            .messages({
                'any.required': 'Поле "originalName" должно быть заполнено',
                'string.empty': 'Поле "originalName" должно быть заполнено'
            })
    }).required(),

    category: Joi.string()
        .required()
        .messages({
            'any.required': 'Поле "category" должно быть заполнено',
            'string.empty': 'Поле "category" должно быть заполнено'
        }),

    description: Joi.string()
        .optional(),

    price: Joi.number()
        .optional()
        .allow(null)
})

export const productRouteValidator = celebrate({[Segments.BODY]: productValidationSchema})
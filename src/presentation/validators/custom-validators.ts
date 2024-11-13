import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsMimeType(
  mimeTypes: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMimeType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: mimeTypes,
      options: validationOptions,
      validator: {
        validate(value: Express.Multer.File, args: ValidationArguments) {
          const [allowedMimeTypes] = args.constraints;
          return allowedMimeTypes.includes(value.mimetype);
        },
        defaultMessage(args: ValidationArguments) {
          const [allowedMimeTypes] = args.constraints;
          return `O arquivo deve estar em um dos seguintes formatos: ${allowedMimeTypes.join(', ')}`;
        },
      },
    });
  };
}

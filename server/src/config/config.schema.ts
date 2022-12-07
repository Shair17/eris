import {Type, Static} from '@sinclair/typebox';

export const ConfigSchema = Type.Strict(
  Type.Object(
    {
      PORT: Type.Number(),
      NODE_ENV: Type.Optional(
        Type.Union([
          Type.Literal('development'),
          Type.Literal('production'),
          Type.Literal('test'),
        ]),
      ),
      DATABASE_URL: Type.String(),
      JWT_SECRET: Type.String(),
      JWT_SECRET_EXPIRES_IN: Type.String(),
      JWT_REFRESH_SECRET: Type.String(),
      JWT_REFRESH_SECRET_EXPIRES_IN: Type.String(),
      JWT_FORGOT_PASSWORD_SECRET: Type.String(),
      JWT_FORGOT_PASSWORD_SECRET_EXPIRES_IN: Type.String(),
      CLOUDINARY_CLOUD_NAME: Type.String(),
      CLOUDINARY_API_KEY: Type.String(),
      CLOUDINARY_API_SECRET: Type.String(),
    },
    {
      additionalProperties: false,
    },
  ),
);
export type ConfigSchemaType = Static<typeof ConfigSchema>;

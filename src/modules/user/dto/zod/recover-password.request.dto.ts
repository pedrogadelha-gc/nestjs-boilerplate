import { z } from 'zod';

export const RecoverPasswordRequestDto = z.object({
  email: z
    .string({ message: 'Informe um e-mail.' })
    .email({ message: 'Informe um e-mail válido.' }),
});

export type RecoverPasswordRequestDto = z.infer<
  typeof RecoverPasswordRequestDto
>;

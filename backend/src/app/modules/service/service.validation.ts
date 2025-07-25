import { z } from 'zod';

const createService= z.object({
  body: z.object({
      title: z.string({ required_error: 'title is required' }),
      description: z.string({ required_error: 'description is required' }),
      price: z.number({ required_error: 'Price is required' }),
      duration : z.number({ required_error: 'Duration  is required' }),
  
  }),
});


export const serviceValidations = {
createService
}
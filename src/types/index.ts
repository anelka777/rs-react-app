import type { z } from 'zod';

import type { createFormSchema } from '../schemas/formSchema';

export type FormData = z.infer<ReturnType<typeof createFormSchema>>;

export interface Submission extends FormData {
  id: string;
  submittedAt: string;
  isNew?: boolean;
}

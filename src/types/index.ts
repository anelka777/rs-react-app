import type { FormData } from '../schemas/formSchema';

export type { FormData };

export interface Submission extends FormData {
  id: string;
  submittedAt: string;
  isNew?: boolean;
}

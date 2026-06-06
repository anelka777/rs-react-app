export interface FormData {
  name: string;
  email: string;
  gender: 'male' | 'female';
  termsAccepted: boolean;
  image: string;
  password: string;
  confirmPassword: string;
  country: string;
}

export interface Submission extends FormData {
  id: string;
  submittedAt: string;
  isNew?: boolean;
}

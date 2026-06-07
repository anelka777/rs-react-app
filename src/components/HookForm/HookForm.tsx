import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactElement, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { addSubmission } from '../../store/submissionsSlice';
import { formSchema } from '../../schemas/formSchema';
import { getPasswordStrength } from '../../utils/passwordStrength';
import imageToBase64 from '../../utils/imageToBase64';
import type { PasswordStrength } from '../../utils/passwordStrength';
import type { FormData } from '../../types';

import styles from './HookForm.module.css';

const HookForm = ({ onClose }: { onClose: () => void }): ReactElement => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.countries);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    dispatch(
      addSubmission({
        ...data,
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        isNew: true,
      })
    );

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label htmlFor="hf-name">Name</label>
        <input
          id="hf-name"
          type="text"
          placeholder="Enter your name"
          {...register('name')}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-age">Age</label>
        <input
          id="hf-age"
          type="number"
          placeholder="Enter your age"
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && (
          <span className={styles.error}>{errors.age.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="hf-email">Email</label>
        <input
          id="hf-email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-gender">Gender</label>
        <select id="hf-gender" {...register('gender')}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <span className={styles.error}>{errors.gender.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="hf-password">Password</label>
        <input
          id="hf-password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          onChange={(e) => {
            void register('password').onChange(e);
            setPasswordStrength(getPasswordStrength(e.target.value));
          }}
        />
        {passwordStrength && (
          <div className={styles.strength}>
            <span>Strength: </span>
            <span className={styles[`strength${passwordStrength.score}`]}>
              {passwordStrength.score === 0 && 'Very weak'}
              {passwordStrength.score === 1 && 'Weak'}
              {passwordStrength.score === 2 && 'Fair'}
              {passwordStrength.score === 3 && 'Good'}
              {passwordStrength.score === 4 && 'Strong'}
            </span>
            <ul className={styles.strengthList}>
              <li
                className={
                  passwordStrength.hasNumber ? styles.met : styles.unmet
                }
              >
                1 number
              </li>
              <li
                className={
                  passwordStrength.hasUppercase ? styles.met : styles.unmet
                }
              >
                1 uppercase
              </li>
              <li
                className={
                  passwordStrength.hasLowercase ? styles.met : styles.unmet
                }
              >
                1 lowercase
              </li>
              <li
                className={
                  passwordStrength.hasSpecialChar ? styles.met : styles.unmet
                }
              >
                1 special character
              </li>
            </ul>
          </div>
        )}
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-confirmPassword">Confirm Password</label>
        <input
          id="hf-confirmPassword"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="hf-country">Country</label>
        <input
          id="hf-country"
          type="text"
          placeholder="Enter your country"
          list="hf-countries-list"
          {...register('country')}
        />
        <datalist id="hf-countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <span className={styles.error}>{errors.country.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-image">Profile Image</label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input
              id="hf-image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const base64 = await imageToBase64(file);
                  field.onChange(base64);
                }
              }}
            />
          )}
        />
        {errors.image && (
          <span className={styles.error}>{errors.image.message}</span>
        )}
      </div>
      <div className={styles.fieldCheckbox}>
        <input id="hf-terms" type="checkbox" {...register('termsAccepted')} />
        <label htmlFor="hf-terms">I accept the Terms and Conditions</label>
        {errors.termsAccepted && (
          <span className={styles.error}>{errors.termsAccepted.message}</span>
        )}
      </div>

      <button type="submit" className={styles.submitButton} disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;

import { type FormEvent, useRef, useState } from 'react';
import type { ReactElement } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { addSubmission } from '../../store/submissionsSlice';
import { formSchema } from '../../schemas/formSchema';
import { getPasswordStrength } from '../../utils/passwordStrength';
import imageToBase64 from '../../utils/imageToBase64';
import type { PasswordStrength } from '../../utils/passwordStrength';

import styles from './UncontrolledForm.module.css';

const UncontrolledForm = ({
  onClose,
}: {
  onClose: () => void;
}): ReactElement => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const imageFile = imageRef.current?.files?.[0];
    let imageBase64 = '';

    if (imageFile) {
      imageBase64 = await imageToBase64(imageFile);
    }

    const rawData = {
      name: nameRef.current?.value ?? '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      termsAccepted: termsRef.current?.checked ?? false,
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value ?? '',
      country: countryRef.current?.value ?? '',
      image: imageBase64,
    };

    const result = formSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    dispatch(
      addSubmission({
        ...result.data,
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        isNew: true,
      })
    );

    onClose();
  };

  const handlePasswordChange = (): void => {
    const password = passwordRef.current?.value ?? '';
    setPasswordStrength(getPasswordStrength(password));
  };
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="uc-name">Name</label>
        <input
          id="uc-name"
          ref={nameRef}
          type="text"
          placeholder="Enter your name"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="uc-age">Age</label>
        <input
          id="uc-age"
          ref={ageRef}
          type="number"
          placeholder="Enter your age"
        />
        {errors.age && <span className={styles.error}>{errors.age}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-email">Email</label>
        <input
          id="uc-email"
          ref={emailRef}
          type="email"
          placeholder="Enter your email"
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-gender">Gender</label>
        <select id="uc-gender" ref={genderRef}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-password">Password</label>
        <input
          id="uc-password"
          ref={passwordRef}
          type="password"
          placeholder="Enter your password"
          onChange={handlePasswordChange}
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
          <span className={styles.error}>{errors.password}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-confirmPassword">Confirm Password</label>
        <input
          id="uc-confirmPassword"
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="uc-country">Country</label>
        <input
          id="uc-country"
          ref={countryRef}
          type="text"
          placeholder="Enter your country"
          list="uc-countries-list"
        />
        <datalist id="uc-countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <span className={styles.error}>{errors.country}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="uc-image">Profile Image</label>
        <input
          id="uc-image"
          ref={imageRef}
          type="file"
          accept="image/png, image/jpeg"
        />
        {errors.image && <span className={styles.error}>{errors.image}</span>}
      </div>
      <div className={styles.fieldCheckbox}>
        <input id="uc-terms" ref={termsRef} type="checkbox" />
        <label htmlFor="uc-terms">I accept the Terms and Conditions</label>
        {errors.termsAccepted && (
          <span className={styles.error}>{errors.termsAccepted}</span>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;

import { useEffect } from 'react';
import type { ReactElement } from 'react';

import { useAppDispatch } from '../../store';
import { markAsOld } from '../../store/submissionsSlice';
import type { Submission } from '../../types';

import styles from './SubmissionCard.module.css';

interface SubmissionCardProps {
  submission: Submission;
}

const SubmissionCard = ({ submission }: SubmissionCardProps): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (submission.isNew) {
      const timer = setTimeout(() => {
        dispatch(markAsOld(submission.id));
      }, 3000);
      return (): void => clearTimeout(timer);
    }
  }, [submission.id, submission.isNew, dispatch]);

  return (
    <div className={`${styles.card} ${submission.isNew ? styles.cardNew : ''}`}>
      {submission.image && (
        <div className={styles.imageWrapper}>
          <img src={submission.image} alt="avatar" className={styles.image} />
        </div>
      )}
      <div className={styles.info}>
        <h3 className={styles.name}>{submission.name}</h3>
        <div className={styles.row}>
          <span className={styles.label}>Age</span>
          <span>{submission.age}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <span>{submission.email}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Gender</span>
          <span className={styles.capitalize}>{submission.gender}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Country</span>
          <span>{submission.country}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>T&C</span>
          <span>
            {submission.termsAccepted ? '✓ Accepted' : '✗ Not accepted'}
          </span>
        </div>
        <div className={styles.date}>
          {new Date(submission.submittedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;

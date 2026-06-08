import { useState } from 'react';
import { type ReactElement } from 'react';

import Modal from './components/Modal/Modal';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import HookForm from './components/HookForm/HookForm';
import SubmissionCard from './components/SubmissionCard/SubmissionCard';
import { useAppSelector } from './store';
import styles from './App.module.css';

const App = (): ReactElement => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isHookFormOpen, setIsHookFormOpen] = useState(false);
  const submissions = useAppSelector((state) => state.submissions.submissions);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>React Forms</h1>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => setIsUncontrolledOpen(true)}
        >
          Uncontrolled Form
        </button>
        <button
          className={styles.button}
          onClick={() => setIsHookFormOpen(true)}
        >
          React Hook Form
        </button>
      </div>

      <section>
        <h2 className={styles.sectionTitle}>Submissions</h2>
        {submissions.length === 0 ? (
          <p className={styles.empty}>No submissions yet.</p>
        ) : (
          <div className={styles.grid}>
            {submissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        )}
      </section>

      <Modal
        isOpen={isUncontrolledOpen}
        onClose={() => setIsUncontrolledOpen(false)}
        title="Uncontrolled Form"
      >
        <UncontrolledForm onClose={() => setIsUncontrolledOpen(false)} />
      </Modal>

      <Modal
        isOpen={isHookFormOpen}
        onClose={() => setIsHookFormOpen(false)}
        title="React Hook Form"
      >
        <HookForm onClose={() => setIsHookFormOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;

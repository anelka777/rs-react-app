import { useState } from 'react';
import { type ReactElement } from 'react';

import Modal from './components/Modal/Modal';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import HookForm from './components/HookForm/HookForm';

const App = (): ReactElement => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isHookFormOpen, setIsHookFormOpen] = useState(false);

  return (
    <div>
      <h1>React Forms</h1>
      <button onClick={() => setIsUncontrolledOpen(true)}>
        Uncontrolled Form
      </button>
      <button onClick={() => setIsHookFormOpen(true)}>React Hook Form</button>

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

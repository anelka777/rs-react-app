import { useState } from 'react';
import { type ReactElement } from 'react';

import Modal from './components/Modal/Modal';

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
        <p>Uncontrolled form will be here</p>
      </Modal>

      <Modal
        isOpen={isHookFormOpen}
        onClose={() => setIsHookFormOpen(false)}
        title="React Hook Form"
      >
        <p>Hook form will be here</p>
      </Modal>
    </div>
  );
};

export default App;

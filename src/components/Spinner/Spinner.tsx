import React from 'react';

import styles from './Spinner.module.css';

class Spinner extends React.Component {
  render(): React.ReactElement {
    return (
      <div className={styles.spinner_container} data-testid="spinner">
        <div className={styles.spinner}></div>
      </div>
    );
  }
}

export default Spinner;

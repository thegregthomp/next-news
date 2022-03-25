import React from 'react';
import styles from './Loader.module.css';

type Props = {};

function Loader({}: Props) {
  return <div className={styles.loader}>Loading...</div>;
}

export default Loader;

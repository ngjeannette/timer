import React from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import photo from '../images/labtop.png';

export default function Home(): JSX.Element {
  const history = useHistory();

  return (
    <div className={styles.container} data-tid="container">
      <h2>Timer App</h2>
      <div className={styles.intro}>
        <h3>Time your Productivity. Work • Rest • Repeat </h3>
      </div>
      <div className={styles.photo}>
        <img src={photo} />
      </div>
      <div className={styles.timerbutton}>
        <button onClick={() => {
          history.push(routes.TIMER);}}>Start</button>
      </div>
    </div>
  );
}

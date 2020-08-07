import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styles from './Timer.css';
import routes from '../../constants/routes.json';

import {
    increment,
    selectCount
} from './timerSlice';

export default function Timer() {
    const value = useSelector(selectCount);
    const history = useHistory();
    const dispatch = useDispatch();
    const [workTimer, setWorkTimer] = useState(0);
    const [restTimer, setRestTimer] = useState(0);
    const [interval, setInterval] = useState(0);
    const [message, setMessage] = useState(null);

    const updateInputValue = () => {
        if((Number(workTimer) && workTimer > 0) || (Number(restTimer) && restTimer > 0) || Number(interval)){
            const passObj = {workTimer, restTimer, interval};
            dispatch(increment(passObj));
            history.push(routes.STARTTIMER);
        }else {
            setMessage('Invalid Time')
        }
        
    }
    useEffect(() => { }, [selectCount])
    return(
        <div>
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.HOME}>
                    <i className="fa fa-arrow-left fa-3x" />
                </Link>
            </div>

            <div className={styles.setTimerButtons}>
                <div className={styles.workTimerContainer}>
                    <h2>Work</h2>
                    <div className={styles.workTimer}>
                        <input min="0" type="number" onChange={(e) => { setWorkTimer(e.target.value) }} value={workTimer} />
                    </div>
                </div>
                <div className={styles.workTimerContainer}>
                    <h2>Rest</h2>
                    <div className={styles.workTimer}>
                        <input min="0" type="number" onChange={(e) => { setRestTimer(e.target.value) }} value={restTimer} />
                    </div>
                </div>
                <div className={styles.workTimerContainer}>
                    <h2>Interval</h2>
                    <div className={styles.workTimer}>
                        <input min="0" type="number" onChange={(e) => { setInterval(e.target.value) }} value={interval} />
                    </div>
                </div>
            </div>
            <div className={styles.timerbutton}>
                <button onClick={() => { updateInputValue()}} >Start</button>
            </div>
            {message && 
                <div className={styles.notification}>
                    <p>{message}</p>
                </div>
            }
        </div>
    )
}
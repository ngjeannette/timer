import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// import styles from '../timer/Timer.css';

import styles from './StartTimer.css';
import routes from '../../constants/routes.json';

import {
    selectCount,
} from '../timer/timerSlice';

export default function StartTimer() {
    const history = useHistory();
    const audio = new Audio("./images/ring.mp3")
    const value = useSelector(selectCount);
    const [displayWorkTimer, setDisplayWorkTimer] = useState(0);
    const [displayRestTimer, setDisplayRestTimer] = useState(0);
    const [workTimer, setWorkTimer] = useState(0);
    const [restTimer, setRestTimer] = useState(0);
    const [intervals, setIntervals] = useState(0);
    const [displayStatus, setDisplayStatus] = useState('');
    const [currentWorkTimer, setCurrentWorkTimer] = useState(0);
    const [currentRestTimer, setCurrentRestTimer] = useState(0);
    const [currentIntervals, setCurrentIntervals] = useState(0);
    const [lastStatus, setLastStatus] = useState(null);
    const [displayPause, setDisplayPause] = useState('Pause');
    const [status, setStatus] = useState("PAUSED");
    const [displayCurrentWorkTimer, setDisplayCurrentWorkTimer] = useState(0);
    const [displayCurrentRestTimer, setDisplayCurrentRestTimer] = useState(0);

    useEffect(() => { }, [selectCount])
    useEffect(()=>{
        reset()
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            switch (status) {
                case "WORK":
                    setCurrentWorkTimer(timer => (timer > 0 ? timer - 1 : timer));
                    break;
                case "REST":
                    setCurrentRestTimer(timer => (timer > 0 ? timer - 1 : timer));
                    break;
                default:
                    break;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [status]);

    useEffect(() => {}, [workTimer, restTimer, intervals, currentWorkTimer, currentRestTimer])
    useEffect(() => {
        if(status === "WORK"){
            // take seconds -> convert into 00:00 
            const [minutes, seconds] = convertsecondstominutes(currentWorkTimer);
            setDisplayCurrentWorkTimer(`${minutes} : ${seconds}`);
        } else {
            const [minutes, seconds] = convertsecondstominutes(currentRestTimer);
            setDisplayCurrentRestTimer(`${minutes} : ${seconds}`);
        }
    },[currentRestTimer,currentWorkTimer])
    useEffect(() => {
        if (status === "WORK" && currentWorkTimer === 0) {
            playAudio()
            setCurrentRestTimer(restTimer);
            setStatus("REST");
            setDisplayStatus("REST")
        }
    }, [status, currentWorkTimer, restTimer]);

    const convertsecondstominutes = (time : number) => {
        const secs = time;
        const divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        minutes = ("0" + minutes).slice(-2);

        const divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        seconds = ("0" + seconds).slice(-2);

        return [minutes,seconds]
    }
    useEffect(() => {
        if (status === "REST" && currentRestTimer === 0) {
            playAudio()
            if (currentIntervals > 1) {
                setCurrentWorkTimer(workTimer);
                setStatus("WORK");
                setDisplayStatus("WORK")
            } else {
                setStatus("PAUSED");
            }
            setCurrentIntervals(intervals => (intervals > 0 ? intervals - 1 : intervals));
        }
    }, [status, currentRestTimer, currentIntervals, workTimer]);

    const reset = () => {
        let [minutes, seconds] = convertsecondstominutes(value.workTimer * 60);
        setDisplayWorkTimer(`${minutes} : ${seconds}`);
        [minutes, seconds] = convertsecondstominutes(value.restTimer * 60);
        setDisplayRestTimer(`${minutes} : ${seconds}`);
        setWorkTimer(value.workTimer * 60);
        setRestTimer(value.restTimer * 60);
        setIntervals(value.interval);
        setStatus("WORK");
        setDisplayStatus('WORK')
        setCurrentWorkTimer(value.workTimer * 60)
        setCurrentRestTimer(value.restTimer * 60)
        setCurrentIntervals(value.interval)
    }

    const pause = () => {
        if (status !== "PAUSED") {
            setLastStatus(status);
            setStatus("PAUSED")
        } else {
            setStatus(lastStatus)
        }
        if (displayPause === "Pause") {
            setDisplayPause('Resume');
        } else {
            setDisplayPause('Pause')
        }
    }
    const check = () => {
        // status === "WORK" ? displayCurrentWorkTimer : displayCurrentRestTimer
        if(status === "WORK"){
            return displayCurrentWorkTimer
        }else if (status === "REST") {
            return displayCurrentRestTimer
        } else {
            return "Paused"
        }
    }

    const playAudio = () => {
        let playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                // Automatic playback started!
            }).catch(function (error) {
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }
    }

    return (
        <div>
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.TIMER}>
                    <i className="fa fa-arrow-left fa-3x" />
                </Link>
            </div>
       
          <div className={styles.setTimerButtons}>
                <div className={styles.workTimerContainer}>
                    <h3>Work </h3>
                    <div className={styles.workTimerLarge}>
                        <span>{displayWorkTimer}</span>
                    </div>
                </div>
                <div className={styles.workTimerContainer}>
                    <h3>Rest</h3>
                    <div className={styles.workTimerLarge}>
                        <span>{displayRestTimer}</span>
                    </div>
                </div>
                <div className={styles.workTimerContainer}>
                    <h3>Interval</h3>
                    <div className={styles.workTimerLarge}>
                        <span>{intervals}</span>
                    </div>
                </div>
            </div>



            <div className={styles.setTimerButtons}>
                <div className={styles.workTimerContainer}>
                    <div className={styles.workTimerLarge}>
                        <span>{displayStatus}</span>
                    </div>
                </div>
                <div className={styles.workTimerContainer}>
                    <div className={styles.workTimerLarge}>
                        <span>{status && check()}</span>
                    </div>
                </div>
                <div className={styles.workTimerContainer}>
                    <div className={styles.workTimerLarge}>
                        <span>{currentIntervals}</span>
                    </div>
                </div>
            </div>


            <div className={styles.action}>
                <button onClick={() => { history.push(routes.TIMER);}}>New Timer</button>
                <button onClick={() => {pause()}} >{displayPause}</button>
                <button onClick={() => {reset()}}> Reset </button>
            </div>
        </div>
    )
}
import Display from './components/display/Display';
import Button from './components/buttons/Button';
import styles from '../src/App.module.css';
import { useEffect, useState } from 'react';
function App() {
  const [timer, setTimer] = useState('00:03:00');
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [worning, setWorning] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [start, intervalId]);
  //startFun
  const startFun = () => {
    setStart(true);
    let userTime = timer.split(':');
    let hours = Number.parseInt(userTime[0]);
    let minutes = Number.parseInt(userTime[1]);
    let seconds = Number.parseInt(userTime[2]);
    var finalTime = hours * 60 * 60 + minutes * 60 + seconds - 1;
    const newIntervalId = setInterval(() => {
      let hrs = Math.floor(finalTime / (60 * 60));
      hrs = hrs < 10 ? `0${hrs}` : hrs;
      let mins = Math.floor((finalTime / 60) % 60);
      mins = mins < 10 ? `0${mins}` : mins;
      let secs = Math.floor(finalTime % 60);
      secs = secs < 10 ? `0${secs}` : secs;
      setTimer(`${hrs}:${mins}:${secs}`);
      if (
        Number.parseInt(hrs) === 0 &&
        Number.parseInt(mins) === 0 &&
        Number.parseInt(secs) <= 10
      ) {
        setWorning(true);
      }
      if (
        Number.parseInt(hrs) === 0 &&
        Number.parseInt(mins) === 0 &&
        Number.parseInt(secs) === 0
      ) {
        setTimer('00:03:00');
        setStart(false);
        setWorning(false);
        clearInterval(intervalId);
      }
      finalTime--;
    }, 1000);
    setIntervalId(newIntervalId);
  };
  //pauseFun
  const pauseFun = () => {
    setPause(true);
    clearInterval(intervalId);
  };
  //continueFun
  const continueFun = () => {
    setPause(false);
    startFun();
  };
  //reset
  const resetFun = () => {
    setTimer('00:03:00');
    setStart(false);
    setPause(false);
    setWorning(false);
    clearInterval(intervalId);
  };
  return (
    <div className={styles.app}>
      <Display timer={timer} worning={worning} />
      <div className={styles.buttonSec}>
        {!start && (
          <Button value="Start" icon="play_arrow" onClick={() => startFun()} />
        )}
        {start && (
          <>
            {!pause ? (
              <Button value="Pause" icon="pause" onClick={() => pauseFun()} />
            ) : (
              <Button
                value="Continue"
                icon="play_arrow"
                onClick={() => continueFun()}
              />
            )}
            <Button value="Reset" icon="replay" onClick={() => resetFun()} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

import style from '../display/Display.module.css';
const Display = ({ timer }) => {
  return <div className={style.displaySec}>{timer}</div>;
};
export default Display;

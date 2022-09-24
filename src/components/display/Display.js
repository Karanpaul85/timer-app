import style from '../display/Display.module.css';
const Display = ({ timer, worning }) => {
  return (
    <div className={`${style.displaySec} ${worning ? style.worning : ''}`}>
      {timer}
    </div>
  );
};
export default Display;

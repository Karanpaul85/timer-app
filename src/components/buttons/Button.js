import styles from '../buttons/Button.module.css';
const Button = (props) => {
  return (
    <button {...props} className={styles.default_button}>
      {props.value}
      <span className="material-icons"> {props.icon}</span>
    </button>
  );
};
export default Button;

import css from './Button.module.css';

const Button = ({onBtnClick}) => {
  return (
    <div className={css.btnContainer}>
          <button className={css.button} type='button' onClick={onBtnClick}>
                Load more
          </button>
    </div>
  )
}

export default Button;
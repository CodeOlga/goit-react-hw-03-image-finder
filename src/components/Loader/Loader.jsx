import css from './Loader.module.css';

const Loader = ({children}) => {
  return (
    <div className={css.loaderContainer}>
      {children}
    </div>
)
}
export default Loader;
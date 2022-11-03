import styles from "./FormInput.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const FormInput = ({
  register,
  type,
  label,
  name,
  required,
  errors,
  pattern,
}) => {
  return (
    <div className={cx("form-input")}>
      <label>
        {label}
        {required ? <span>*</span> : ""}
      </label>
      <input
        type={type}
        {...register(name, {
          required: "Please enter the " + label,
          pattern: {
            value: pattern,
            message: "Please enter a valid " + label,
          },
        })}
      />
      {errors[name] && (
        <span className={cx("message-error")}>{errors[name].message}</span>
      )}
    </div>
  );
};

export default FormInput;

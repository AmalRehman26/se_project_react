import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values, resetForm);
  }

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>

      <div className="modal__footer">
        <button type="submit" className="modal__submit">
          Sign Up
        </button>
        <button
          type="button"
          className="modal__switch"
          onClick={onSwitchToLogin}
        >
          or Sign In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;

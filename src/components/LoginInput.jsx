/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";

function LoginInput({ login }) {
    const [email, onChangeEmailHandler] = useInput('');
    const [password, onChangePasswordHandler] = useInput('');

    return (
      <form className="form-login">
        <h1>
          Kenalan dulu yuk,
          <br />
          {' '}
          biar aku gk di ghosting terus !
        </h1>
        <p>Dengan login kamu dapat bikin thread / komentar !!!</p>
        <div>
          <label htmlFor="email">
            email
            <input
              type="text"
              placeholder="masukan email"
              id="email"
              onChange={onChangeEmailHandler}
              value={email}
              autoComplete="off"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password
            <input
              type="password"
              placeholder="masukan password"
              id="password"
              onChange={onChangePasswordHandler}
              value={password}
              autoComplete="off"
            />
          </label>
        </div>
        <span>
          <button
            type="button"
            onClick={() => login({ emailUser: email, passwordUser: password })}
            className="btn-register"
          >
            Login
          </button>
          <Link to="/register">
            <button className="btn-login">Register</button>
          </Link>
        </span>
      </form>
    );
}

export default LoginInput;

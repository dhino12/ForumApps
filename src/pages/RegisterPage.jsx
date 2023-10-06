/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { asyncUserLogged } from "../states/shared/action";
import { asyncRegisterUser } from "../states/users/action";

export default function RegisterPage() {
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authUser } = useSelector((states) => states);

    useEffect(() => {
        dispatch(asyncUserLogged());
    }, [dispatch]);

    const onEmailChangeHandler = ({ target }) => {
        setEmailUser(target.value);
    };

    const onPasswordChangeHandler = ({ target }) => {
        setPasswordUser(target.value);
    };

    const onNameChangeHandler = ({ target }) => {
        setNameUser(target.value);
    };

    const onRegister = ({ name, email, password }) => {
        if (name === '' || email === '' || password === '') return alert('harap form yang kosong disi');

        dispatch(asyncRegisterUser({ email, name, password }));
        alert('Success Register');
        navigate('/login');
    };

    if (authUser !== null) navigate('/');

    return (
      <>
        <header className="App-header bg-dark height-unset">
          <Navigation authUser={null} />
        </header>
        <main className="container-login register">
          <form className="form-login">
            <h1>
              Apa kamu tega,
              {' '}
              <br />
              {' '}
              doi gk tau nama kamu ?
            </h1>
            <p>Yuk daftar dulu, kalem data kamu aman kok !</p>
            <div>
              <label htmlFor="name">
                name
                <input type="text" placeholder="masukan nama kamu" id="name" onChange={onNameChangeHandler} value={nameUser} autoComplete="off" />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                email
                <input type="text" placeholder="masukan email" id="email" onChange={onEmailChangeHandler} value={emailUser} autoComplete="off" />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                password
                <input type="password" placeholder="masukan password" id="password" onChange={onPasswordChangeHandler} value={passwordUser} autoComplete="off" />
              </label>
            </div>
            <span>
              <button className="btn-register" onClick={() => onRegister({ name: nameUser, email: emailUser, password: passwordUser })}>Register</button>
              <Link to="/login"><button className="btn-login">Login</button></Link>
            </span>
          </form>
          <aside>
            <img src="./login.png" alt="pattern-login" height={800} />
          </aside>
        </main>
      </>
    );
}

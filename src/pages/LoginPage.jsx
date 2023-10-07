import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { asyncSetAuthUser } from "../states/authUser/action";
import { asyncUserLogged } from "../states/shared/action";
import LoginInput from "../components/LoginInput";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authUser } = useSelector((states) => states);

    useEffect(() => {
        dispatch(asyncUserLogged());
    }, [dispatch]);

    const onLogin = ({ emailUser, passwordUser }) => {
        if (!emailUser) return alert('"id" is not allowed to be empty');
        if (!passwordUser) return alert('"password" is not allowed to be empty');
        dispatch(asyncSetAuthUser({ email: emailUser, password: passwordUser }));
        if (authUser != null) return navigate('/');
        return false;
    };

    if (authUser !== null) navigate('/');

    return (
      <>
        <header className="App-header bg-dark height-unset">
          <Navigation authUser={null} />
        </header>
        <main className="container-login">
          <LoginInput login={onLogin} />
          <aside>
            <img src="./login.png" alt="pattern-login" height={800} />
          </aside>
        </main>
      </>
    );
}

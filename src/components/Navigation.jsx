/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Navigation({ authUser, onLogout }) {
    return (
      <nav className="nav">
        <h1>Forum App</h1>
        <ul>
          <Link to="/"><li>Home</li></Link>

          { !authUser && <Link to="/login"><li>Login</li></Link> }
          { authUser !== null && <button onClick={onLogout}><li>Logout</li></button> }
        </ul>
      </nav>
    );
}

import "./App.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import app from "./firebase/firebase.init";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handlegoogleSignIn = () => {
    //console.log('google coming soon')
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error("Error 404");
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error("erroe:", error);
      });
  };

  return (
    <div className="App">
      {user.email ? (
        <button onClick={handleSignOut}>Google Signout</button>
      ) : (
        <>
          <button onClick={handlegoogleSignIn}>Google Signin</button>
          <button onClick={handleGithubSignIn}>Git Signin</button>
        </>
      )}
      <div>
        <h4> user name:{user.displayName}</h4>
        <p> user Email:{user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;

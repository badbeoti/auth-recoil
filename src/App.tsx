import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import fire from './firebase';
import LoginForm from './Login';
import SignUp from './SignUp';
import { testState } from './atoms';

function App() {
  const setTestState = useSetRecoilState(testState);
  const userState = useRecoilValue(testState);

  useEffect(() => {
    fire.auth().onAuthStateChanged((resUser) => {
      console.log(resUser);
      setTestState({
        test: false,
        user: resUser && {
          uid: resUser.uid,
          email: resUser.email,
          displayName: resUser.displayName,
        },
      });
    });
  }, [setTestState]);

  useEffect(() => {
    if (userState.user) {
      console.log(userState);
    }
  }, [userState]);
  return (
    <div>
      <Router>
        <Switch>
          {!userState.user && <Route exact path="/" component={LoginForm} />}
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
      {userState.user ? <span>login</span> : <a href="/signup">register now!</a>}
    </div>
  );
}

export default App;

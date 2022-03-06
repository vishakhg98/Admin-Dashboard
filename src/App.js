import { Switch, Route } from "react-router-dom";
import ForgotPassword from "./Auth/ForgotPassword";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./Dashboard/Dashboard";
import {
  LOGIN_PATH,
  REGISTER_PATH,
  DASHBOARD_PATH,
  FORGOT_PASSWORD_PATH,
} from "./utils/routeUrls";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={REGISTER_PATH} component={Register} />
        <Route exact path={FORGOT_PASSWORD_PATH} component={ForgotPassword} />
        <Route exact path={DASHBOARD_PATH} component={Dashboard} />
        <Route path={LOGIN_PATH} component={Login} />
      </Switch>
    </div>
  );
}

export default App;

import WeeklySchedule from "./components/WeeklySchedule";
import { Switch, Route } from "react-router";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={WeeklySchedule} />
      </Switch>
    </>
  );
};

export default App;

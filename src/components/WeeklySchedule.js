import { Route } from "react-router";
import ScheduleForm from "./ScheduleForm";
import SchedulesTableRow from "./SchedulesTableRow";
import { daysOfWeek, hoursOfday } from "../utils/times";
import { useEffect, useState } from "react";
import { getAllSchedules } from "../Services/schedule_service";
import { useLocation } from "react-router-dom";

const WeeklySchedule = ({ history }) => {
  const [schedules, setSchedules] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") setSchedules(getAllSchedules());
  }, [location]);

  return (
    <div>
      <Route path="/schedule-form/:day([1-7])" component={ScheduleForm} />
      <table>
        <thead>
          <tr>
            <th>Time Day</th>
            {hoursOfday.map((hour) => (
              <th key={hour}>{`${hour}:00\n${hour + 1}:00`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, index) => (
            <SchedulesTableRow
              key={index}
              daySchedules={schedules.filter((s) => s.day === index + 1)}
              day={day}
              onAdd={() => history.push(`schedule-form/${index + 1}`)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklySchedule;

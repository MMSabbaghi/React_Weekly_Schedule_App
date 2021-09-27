import { useState } from "react";
import Modal from "./Modal/Modal";
import { addNewSchedule, getAllSchedules } from "../Services/schedule_service";

const ScheduleForm = ({ match, history }) => {
  const day = match.params.day;
  const [isOpen, setIsOpen] = useState(true);
  const [schedule, setSchedule] = useState({ title: "", start: 7 });

  const changeInputHanlder = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const validateSchedule = () => {
    if (schedule.title.length < 3) return false;
    if (!schedule.duration) return false;
    const daySchedules = getAllSchedules().filter((s) => s.day === +day);
    if (
      daySchedules.some(
        (s) => s.start + s.duration > schedule.start && s.start < schedule.start
      )
    )
      return false;
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newSchedule = {
      title: schedule.title,
      day: +day,
      start: +schedule.start,
      duration: +schedule.duration,
    };
    addNewSchedule(newSchedule);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => history.push("/")}
    >
      <div className="schedule_form_header">
        <h2> schedule form</h2>
        <hr />
      </div>
      <form onSubmit={submitHandler} className="schedule_form">
        <label htmlFor="title"> title </label>
        <input
          type="text"
          name="title"
          placeholder="schedule title..."
          value={schedule.title}
          onChange={changeInputHanlder}
        />
        <label htmlFor="start"> start at </label>
        <input
          type="number"
          name="start"
          min="7"
          max="19"
          value={schedule.start}
          onChange={changeInputHanlder}
        />
        <label htmlFor="duration"> duration </label>
        <input
          type="number"
          name="duration"
          min="1"
          max={20 - schedule.start}
          value={schedule.duration}
          onChange={changeInputHanlder}
        />
        <button type="submit" disabled={!validateSchedule()}>
          add Schedule
        </button>
      </form>
    </Modal>
  );
};

export default ScheduleForm;

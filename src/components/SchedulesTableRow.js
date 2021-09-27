import { hoursOfday } from "../utils/times";

const SchedulesTableRow = ({ onAdd, onDelete, day, daySchedules }) => {
  const createCells = () => {
    const tds = [];
    hoursOfday.forEach((hour) => {
      if (daySchedules.some((s) => s.start === hour)) {
        const schedule = daySchedules.find((s) => s.start === hour);
        tds.push(
          <td className="active_cell" colSpan={schedule.duration} key={hour}>
            <span>{schedule.title}</span>
            <button
              onClick={() => onDelete(schedule.id)}
              className="delete_btn"
            >
              ×
            </button>
          </td>
        );
      } else if (
        !daySchedules.some((s) => s.start < hour && s.start + s.duration > hour)
      ) {
        tds.push(<td key={hour}></td>);
      }
    });
    return tds;
  };

  return (
    <tr>
      <td className="row_title">
        <span>{day}</span>
        <button className="add_btn" onClick={onAdd}>
          +
        </button>
      </td>
      {createCells().map((td) => td)}
    </tr>
  );
};

export default SchedulesTableRow;

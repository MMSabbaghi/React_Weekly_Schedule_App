function saveSchedules(schedules) {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

export function getAllSchedules() {
  try {
    return JSON.parse(localStorage.getItem("schedules")) || [];
  } catch (error) {
    return [];
  }
}

export function addNewSchedule(schedule) {
  const newSchedule = { ...schedule, id: Math.floor(Math.random() * 1000) };
  const allSchedules = getAllSchedules();
  allSchedules.push(newSchedule);
  saveSchedules(allSchedules);
  console.log(getAllSchedules());
}

export function deleteSchedule(id) {
  let allSchedules = getAllSchedules();
  allSchedules = allSchedules.filter((s) => s.id !== id);
  saveSchedules(allSchedules);
}

import { NonSensitiveDiaryEntry } from "../types";
const DiaryEntry = ({ entry }: { entry: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <h4>{entry.date}</h4>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
    </div>
  );
};

export default DiaryEntry;
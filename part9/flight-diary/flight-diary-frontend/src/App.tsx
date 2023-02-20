import { useEffect, useState } from "react";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";
import DiaryEntry from "./components/DiaryEntry";

const App = () => {

  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);


  // const addEntry = (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   console.log(event.target.comment.value);
  // };

  const addEntry = (event: any) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date: event.target.date.value,
      visibility: event.target.visibility.value,
      weather: event.target.weather.value,
      comment: event.target.comment.value
    };

    createDiary(newEntry).then(data => {
      setDiaries(diaries.concat(data));
    });

    event.target.date.value = '';
    event.target.visibility.value = 'great';
    event.target.weather.value = 'sunny';
    event.target.comment.value = '';
  };

  return (
    <div>
      <h2>Add new entry</h2>

      <form onSubmit={addEntry}>
        <div>date <input type='date' name='date' /></div>
        <div>
          visibility
          <input type='radio' value='great' name='visibility' defaultChecked /> great
          <input type='radio' value='good' name='visibility' /> good
          <input type='radio' value='ok' name='visibility' /> ok
          <input type='radio' value='poor' name='visibility' /> poor
        </div>
        <div>
          Weather
          <input type='radio' value='sunny' name='weather' defaultChecked /> sunny
          <input type='radio' value='rainy' name='weather' /> rainy
          <input type='radio' value='cloudy' name='weather' /> cloudy
          <input type='radio' value='stormy' name='weather' /> stormy
          <input type='radio' value='windy' name='weather' /> windy
        </div>
        <div>Comment <input type='text' name='comment' /></div>
        <button>add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map(d => <DiaryEntry key={d.id} entry={d} />)}
    </div>



  );
};

export default App;

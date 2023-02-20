import express from 'express';
const app = express();
app.use(express.json());
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmiOutput: string = calculateBmi(Number(height), Number(weight));
  return res.status(200).json({ weight: Number(weight), height: Number(height), bmi: bmiOutput });
});

app.post('/exercises', (req, res) => {
  // console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = req.body;
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const dailyHours: number[] = daily_exercises.map((hour: string) => Number(hour));
  const findNaN = dailyHours.find(elem => Number.isNaN(elem));
  if (findNaN !== undefined || isNaN(Number(target))) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  return res.status(200).json(exerciseCalculator(dailyHours, Number(target)));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
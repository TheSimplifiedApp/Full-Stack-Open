interface ExerciseInput {
  target: number
  dailyHours: number[]
}

const parseInput = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const inputNumberArray: number[] = process.argv.slice(2).map(elem => Number(elem));
  const findNaN = inputNumberArray.find(elem => Number.isNaN(elem));
  if (findNaN === undefined) {
    return {
      target: inputNumberArray[0],
      dailyHours: inputNumberArray.slice(1)
    };
  } else {
    throw new Error('Input must be numbers');
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (input: number[], target: number): Result => {
  const average = input.reduce((a, b) => a + b, 0) / input.length;
  let rating, ratingDescription;
  if (average > target) {
    rating = 3;
    ratingDescription = 'Above target';
  } else if (average === target) {
    rating = 2;
    ratingDescription = 'Meet target';
  } else {
    rating = 1;
    ratingDescription = 'Below target: not too bad but could be better';
  }

  return {
    periodLength: input.length,
    trainingDays: input.filter(day => day > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

try {
  const { target, dailyHours } = parseInput(process.argv);
  console.log(exerciseCalculator(dailyHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}


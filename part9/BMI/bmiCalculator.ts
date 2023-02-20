interface BmiInput {
  height: number;
  weight: number;
}

const parseArgument = (args: string[]): BmiInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(2))
  if (bmi <= 18.4) {
    return `Your BMI is ${bmi}, Underweight (< 18.4)`
  } else if (bmi <= 24.9) {
    return `Your BMI is ${bmi}, Normal (18.5 - 24.9)`
  } else if (bmi <= 29.9) {
    return `Your BMI is ${bmi}, Overweight (25.0 - 29.9)`
  }
  return `Your BMI is ${bmi}, Obese (> 30)`
}

try {
  const { height, weight } = parseArgument(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}
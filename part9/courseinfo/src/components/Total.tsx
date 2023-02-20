interface CoursePart {
  name: string;
  exerciseCount: number
}

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
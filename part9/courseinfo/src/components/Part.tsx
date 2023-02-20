import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <div>{part.description}</div>
          <br />
        </div>
      );
    case "group":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <div>project exercises {part.groupProjectCount}</div>
          <br />
        </div>
      );
    case "background":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <div>{part.description}</div>
          <div>submit to {part.backroundMaterial}</div>
          <br />
        </div>
      );
    case "special":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <div>{part.description}</div>
          <div>required skills: {part.requirements.join(", ")}</div>
          <br />
        </div>
      );
    default:
      return assertNever(part);
  }

};

export default Part;
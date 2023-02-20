import { Entry } from "../../types"
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />
    default:
      return assertNever(entry)
  }
  
}

export default EntryDetails
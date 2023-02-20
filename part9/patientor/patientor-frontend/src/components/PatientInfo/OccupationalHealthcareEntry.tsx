import { OccupationalHealthcareEntry } from "../../types"
import Diagnose from "./Diagnose"
const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div style={{ border: "1px solid black", borderRadius: "5px", margin: "5px", padding: "5px" }}>
      {entry.date} - {entry.type}
      <div>employer: {entry.employerName}</div>
      <div>
        {entry.description}
      </div>
      <div>
        diagnose by {entry.specialist}
      </div>
      
      <ul>
        {entry.diagnosisCodes?.map(c => <Diagnose key={c} code={c} />)}
      </ul>
    </div>
  )
}

export default OccupationalHealthcareEntryDetails
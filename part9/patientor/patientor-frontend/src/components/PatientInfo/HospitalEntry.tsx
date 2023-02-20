import { HospitalEntry } from "../../types"
import Diagnose from "./Diagnose"
const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={{ border: "1px solid black", borderRadius: "5px", margin: "5px", padding: "5px" }}>
      {entry.date} - {entry.type}
      <div>{entry.description}</div>
      <div>discharge: {entry.discharge.date} - {entry.discharge.criteria}</div>
      <div>diagnose by {entry.specialist}</div>
      <ul>
        {entry.diagnosisCodes?.map(c => <Diagnose key={c} code={c} />)}
      </ul>
    </div>
  )
}

export default HospitalEntryDetails
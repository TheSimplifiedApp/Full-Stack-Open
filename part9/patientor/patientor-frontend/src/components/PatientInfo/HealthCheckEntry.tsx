import { HealthCheckEntry } from "../../types"
const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div style={{border: "1px solid black", borderRadius: "5px", margin: "5px", padding: "5px"}}>
      {entry.date} - {entry.type}
      <div>{entry.description}</div>
      <div>Health Check Rating: {entry.healthCheckRating}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  )
}

export default HealthCheckEntryDetails
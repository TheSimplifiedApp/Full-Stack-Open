import patientService from '../../services/patients';
import { Typography, Button } from '@mui/material';
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { useParams } from 'react-router-dom';
import EntryDetails from './EntryDetails';

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [type, setType] = useState<string>('Hospital')
  const [showEntryForm, setShowEntryForm] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.findPatientById(id as string);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id, showEntryForm])

  const submitEntry = (event: any) => {
    event.preventDefault()
    let entryObject
    if (type === 'Hospital') {
      entryObject = {
        type: type,
        date: event.target.date.value,
        specialist: event.target.specialist.value,
        description: event.target.description.value,
        diagnosisCodes: event.target.diagnosisCodes.value.split(','),
        discharge: {
          date: event.target.discharge.value,
          criteria: event.target.criteria.value
        }
      }
    } else if (type === 'OccupationalHealthcare') {
      entryObject = {
        type: type,
        date: event.target.date.value,
        specialist: event.target.specialist.value,
        description: event.target.description.value,
        diagnosisCodes: event.target.diagnosisCodes.value.split(','),
        employerName: event.target.employerName.value,
        sickLeave: {
          startDate: event.target.startDate.value,
          endDate: event.target.endDate.value,
        }
      }
    } else {
      entryObject = {
        type: type,
        date: event.target.date.value,
        specialist: event.target.specialist.value,
        description: event.target.description.value,
        diagnosisCodes: event.target.diagnosisCodes.value.split(','),
        healthCheckRating: Number(event.target.healthCheckRating.value)
        // healthCheckRating: event.target.healthCheckRating.value
      }
    }
    // console.log(entryObject)
    try {
      patientService.addEntry(id as string, entryObject)
      setShowEntryForm(false)
    } catch (e: unknown) {
      let errorMessage = 'Something went wrong. '
      if (e instanceof Error) {
        errorMessage += ' Error: ' + e.message;
        setErrorMessage(errorMessage)
      }
    }
  }

  if (!patient) {
    return (
      <div>Patient not found.</div>
    )
  }

  return (
    <div>
      <Typography variant="h5" style={{ margin: "0.5em 0" }}>
        {patient.name}
      </Typography>
      <div>gender: {patient.gender}</div>
      <div>DOB: {patient.dateOfBirth}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      {
        errorMessage && 
        <div style={{color: "red"}}>{errorMessage}</div>
      }

      {
        showEntryForm &&
        <div style={{ border: "1px dashed black", borderRadius: "5px", margin: "5px", padding: "5px" }}>
          <Typography variant="h5" style={{ margin: "0.5em 0" }}>
            New Medical Entry
          </Typography>
          <form onSubmit={submitEntry}>
            <div>
              <label htmlFor="type-select">Choose an entry type </label>
              <select id='type-select' name='entry-type' onChange={e => setType(e.target.value)}>
                <option value='Hospital'>Hospital</option>
                <option value='OccupationalHealthcare'>OccupationalHealthcare</option>
                <option value='HealthCheck'>HealthCheck</option>
              </select>
            </div>
            <div>
              Description <input type='text' name='description' required />
            </div>
            <div>
              Date <input type='date' name='date' required />
            </div>
            <div>
              Specialist <input type='text' name='specialist' required />
            </div>
            <div>
              DiagnosisCodes <input type='text' name='diagnosisCodes' />
            </div>

            {
              type === 'Hospital' &&
              <div>
                Discharge: Date <input type='date' name='discharge' /> criteria <input type='text' name='criteria' />
              </div>
            }

            {
              type === 'OccupationalHealthcare' &&
              <div>
                <div>
                  EmployerName <input type='text' name='employerName' />
                </div>
                <div>
                  Sick Leave: Start Date <input type='date' name='startDate' /> End Date <input type='date' name='endDate' />
                </div>
              </div>
            }

            {
              type === 'HealthCheck' &&
              <div>
                <label htmlFor="type-select">HealthCheckRating </label>
                <select id='HealthCheckRating-select' name='healthCheckRating'>
                  <option value="0">Healthy</option>
                  <option value="1">LowRisk</option>
                  <option value="2">HighRisk</option>
                  <option value="3">CriticalRisk</option>
                </select>
              </div>
            }

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" onClick={() => setShowEntryForm(false)}>Cancel</button>
              <button>Add</button>
            </div>
          </form>
        </div>
      }


      <Typography variant="h6" style={{ margin: "0.5em 0" }}>
        entries
      </Typography>
      {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
      <Button variant="contained" color="primary" onClick={() => setShowEntryForm(true)}>
        ADD NEW ENTRY
      </Button>
    </div>
  )
}

export default PatientInfo
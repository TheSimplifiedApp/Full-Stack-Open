import data from "../../data/patients";
import { PatientInfo, NewPatientInfo, NonSensitivePatientInfo, EntryWithoutId, Entry } from "../types";
import { v1 as uuid } from 'uuid'

const getPatients = (): NonSensitivePatientInfo[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }))
}

const addPatient = (entry: NewPatientInfo): PatientInfo => {
  const newPatient = {
    id: uuid(),
    ...entry
  }

  data.push(newPatient)
  return newPatient
}

const findPatientById = (id: string): PatientInfo | undefined => {
  const patient = data.find(p => p.id === id)
  return patient
}

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = data.find(p => p.id === id)
  const newEntry = {
    id: uuid(),
    ...entry
  }
  patient?.entries.push(newEntry)
  return newEntry
}

export default { getPatients, addPatient, findPatientById, addEntry }
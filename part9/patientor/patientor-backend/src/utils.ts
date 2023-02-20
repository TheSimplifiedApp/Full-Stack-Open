import {
  NewPatientInfo,
  Gender, 
  Diagnosis, 
  HealthCheckRating, 
  NewHealthCheckEntry, 
  NewHospitalEntry, 
  NewOccupationalHealthcareEntry,
  EntryWithoutId, 
  Discharge,
  SickLeave
} from "./types"

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Incorrect or missing string: ' + str)
  }
  return str
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender
}

export const toNewPatientEntry = (object: unknown): NewPatientInfo => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatientEntry: NewPatientInfo = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    }
    return newPatientEntry
  }

  throw new Error('Incorrect data: some fields are missing');
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)
}

const parseHealthCheckRating = (object: object): HealthCheckRating => {
  if ('healthCheckRating' in object && isHealthCheckRating(object.healthCheckRating as number)) {
    return object.healthCheckRating as HealthCheckRating
  }
  throw new Error('Missing or incorrect HealthCheckRating');
}

const parseDischarge = (object: object): Discharge => {
  if ('discharge' in object) {
    const discharge = object.discharge as object
    if ('date' in discharge && isDate(discharge.date as string) && 'criteria' in discharge && isString(discharge.criteria)) {
      return discharge as Discharge
    }
  }
  throw new Error('Missing or incorrect Discharge');
}

const parseEmployer = (object: object): string => {
  if ('employerName' in object && isString(object.employerName)) {
    return object.employerName
  }
  throw new Error('Missing or incorrect employerName');
}

const parseSickLeave = (object: object): SickLeave => {
  if ('sickLeave' in object) {
    const sickLeave = object.sickLeave as object
    if ('startDate' in sickLeave && 'endDate' in sickLeave && isDate(sickLeave.startDate as string) && isDate(sickLeave.endDate as string)) {
      return sickLeave as SickLeave
    }
  }
  throw new Error('Missing or incorrect sickLeave');
}

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'specialist' in object && 'description' in object && 'type' in object) {
    const baseEntry = {
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      diagnosisCodes: parseDiagnosisCodes(object),
    }

    switch (object.type) {
      case 'HealthCheck':
        const newHealthCheckEntry: NewHealthCheckEntry = {
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(object)
        }
        return newHealthCheckEntry

      case 'Hospital':
        const newHospitalEntry: NewHospitalEntry = {
          ...baseEntry,
          type: 'Hospital',
          discharge: parseDischarge(object)
        }
        return newHospitalEntry
      case 'OccupationalHealthcare':
        const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName: parseEmployer(object),
          sickLeave: parseSickLeave(object)
        }
        return newOccupationalHealthcareEntry
      default:
        throw new Error('Unmatched entry type')
    }
  }

  throw new Error('Incorrect data: some fields are missing');
}

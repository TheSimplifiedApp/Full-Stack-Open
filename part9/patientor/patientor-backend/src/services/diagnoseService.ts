import data from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return data;
}

const findByCode = (code: string): Diagnosis | undefined => {
  return data.find(d => d.code === code)
}

const addDiagnose = () => {
  return null;
}

export default {
  getDiagnoses,
  findByCode,
  addDiagnose
};
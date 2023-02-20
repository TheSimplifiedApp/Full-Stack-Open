import axios from "axios";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

export const createDiary = async (object: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(baseUrl, object);
  return response.data;
};
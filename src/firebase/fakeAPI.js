import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export async function login(phoneNumber, password) {
  let result = false;
  const docRefSingle = doc(db, "users", phoneNumber);
  let dataFirebase = await getDoc(docRefSingle);
  if (dataFirebase.data()?.password === password) {
    result = true;
  }
  return result;
}

export async function registerUser(data) {
  const docRefSingle = doc(db, "users", data.phoneNumber);
  let dataFirebase = await getDoc(docRefSingle);
  if (dataFirebase.data() === undefined) {
    await setDoc(doc(db, "users", data.phoneNumber), data);
    return true;
  } else return false;
}

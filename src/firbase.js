import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import "firebase/compat/database"; // Import the database module
import firebaseConfig from "./config/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

const dbRealtime = getDatabase(firebaseApp); // Initialize the Realtime Database reference

export { dbRealtime };
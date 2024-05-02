import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  /*UNAVAILABLE*/
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}
export default app;
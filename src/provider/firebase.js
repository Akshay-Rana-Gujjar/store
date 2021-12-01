import React, { createContext } from 'react';
import app from '../utils/firebase';
import { getFirestore } from "firebase/firestore";

export const FirebaseContext = createContext(null);
 

export default function Firebase({children}){

	const data = {
		app,
		firestore: getFirestore()
	}

	return (
		<FirebaseContext.Provider value={data}>
			{children}
		</FirebaseContext.Provider>
	)
}

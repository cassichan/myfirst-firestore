
//Import firebase library, methods and credentials(secrets)
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { credentials } from "./credentials.js"


//Provide credentials to connect to firebase project
initializeApp({
    credential: cert(credentials)
})

//Connect to FireStore database
const db = getFirestore()

//Going to create car collection and put document for a car
const car = { make: 'Audi', model: 'A3', year: 2018, color: 'grey' }

//Create car collection and add car document
db.collection('cars').add(car)

//Could add a loop to create a import script to import a ton of cars into the car collection
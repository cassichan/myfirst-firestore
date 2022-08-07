//Import firebase library, methods and credentials(secrets)
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "./credentials.js";

//Provide credentials and connect to firebase project
initializeApp({
  credential: cert(credentials),
});

//Connect to FireStore database
const db = getFirestore();

//Going to create car collection and put document for a car
const car = { make: "Ferrari", model: "GTO", year: 2008, color: "red" };

//Create car collection and add new car document to that collection  -> using .add.

db.collection("cars")
  .add(car)
  .then((doc) => {
    console.log("Doc added:", doc.id); //when db creates car document, it will generate document id (stored outside of the actual car document,but associated with the document), so we can log to obtain it. Everytime you run code, it adds a new document with a new document ID.
  })
  .catch((err) => console.error(err)); // or .catch(console.error)

//     //Could add a loop to create a import script to import a ton of cars into the car collection

//Go into collection to this specific document (lambo) and set it to this value
//Will only make ONE document with that one ID and properties when you run/rerun code .
// .set Can change values for entire document. It is also used when we want to set ID to something specific.

db.collection("cars")
  .doc("lambo")
  .set({ make: "Lamborghini", year: 2021, color: "red" });
// fyi, this had model: 'diablo' then we deleted it

//Update document at specific points/properties. now we are adding model: 'diablo' back
db.collection("cars")
  .doc("lambo")
  .update({ model: "Diablo", color: "hot pink" });

//Get a single document (car) when we know the ID
db.collection("cars")
  .doc("lambo")
  .get() //.get returns doc. can also be used to return collection.
  .then((doc) => {
    console.log(doc.id);
    console.log(doc.data()); //.data is a method that opens up file and returns properties as an object, but not with the ID since it is outside. log id seperately.
  })
  .catch(console.error);

// //Get a whole collection
db.collection("cars")
  .get()
  .then((collection) => {
    collection.docs.forEach((doc) => console.log(doc.id, doc.data()));
  }) //log (in the form of an object) the data for each doc in the collection and its id
  .catch(console.error);

// //Query docs from collection     //Specify conditions/constraint for it to get the document (car) with .where(what are we filtering, operation symbol, value)
// //chaining .where is treated like an "and". if it does not exist, it will not return it

db.collection("cars")
  .where("year", ">=", 2015)
  // .where('color', '==', 'red')         When you do a compound query, it requires it to be indexed otherwise will not work
  .get()
  .then((collection) => {
    const cars = collection.docs.map((doc) => {
      let car = doc.data();
      car.id = doc.id; //Add the car ID as a new property (taken from the doc.id) to the car doc and then put it in the array created when calling .map
      return car;
    });
    console.log(cars);
  })
  .catch(console.error);

//Using spread operator, line 80 is equivalent to lines 71-73
//Use the spread operator to spread out all the properties from doc.data/pulls it out of the object

const cars = collection.docs.map((doc) => {
  return { ...doc.data(), id: doc.id };
});

//Cannot do inequalities on multiple fields
//cannot do: .where('year', '>=', 2015).where('mileage', '<', 20000)

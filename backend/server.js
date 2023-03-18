const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = admin.firestore();

app.post('/customers/create', async (req, res) => {
    try {
        const customerJson = {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        };
        const response = await db.collection('customers').add(customerJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

app.get('/customers', async (req, res) => {
    try {
        const customersRef = db.collection('customers');
        const response = await customersRef.get();
        let responseArray = [];

        response.forEach(doc => {
            jsonResponse = doc.data();
            jsonResponse.id = doc.id;
            responseArray.push(jsonResponse);
        });

        res.send(responseArray);
    } catch (error) {
        res.send(error);
    }
});

app.get('/customers/:id', async(req, res) => {
    try {
        const customerRef = db.collection('customers').doc(req.params.id);
        const response = await customerRef.get();
        
        res.send(response.data());
    } catch (error) {
        res.send(error);
    }
});

app.put('/customers/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await db.collection('customers').doc(id).update(req.body);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

app.delete('/customers/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('customers').doc(req.params.id).delete();
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`); 
});
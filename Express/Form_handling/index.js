/** @format */

//hamlog jo bhi data browser par rakh sakte h and jab bhi req backend per karte h wo browser per saved data backend per chala jayega

// cookies=>
//cookies browser per already saved hota user key key value jab server per jata h to ye key value ke through identify karta h vahi value hai

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//hamne bheja tha plane text but server ko blob which is not directly readablees chij ko handle karna padega ki ham blob ko readable bana sake

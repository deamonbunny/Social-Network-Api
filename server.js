const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(routes);

// app.get("*", (req,res) => res.status(404).json({message:"This doesn't seem to exist."}));
db.once('open', () =>{
    app.listen(PORT, () => {
        console.log(`Your API is now running on server port ${PORT}`);
    })
});
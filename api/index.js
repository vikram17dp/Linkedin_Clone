import express from 'express'
import dotnev from 'dotenv'

dotnev.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT, (err) => {
    try {
        console.log(`The server is listening on ${PORT}`);
        
    } catch (error) {
        console.log(error);
        
    }
});

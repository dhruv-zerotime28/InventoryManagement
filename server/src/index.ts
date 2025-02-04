import 'dotenv/config.js'; 
import app from "./app.js";

const port = process.env.PORT || 8080;

const server = async()=>{
    app.listen(port,()=>{
        console.log(`Server running on localhost${port}`);
    })
}

server();

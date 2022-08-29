const app = require("./app");
const config = require("./app/config");



//star server 
const PORT = config.app.port;
const hau = 24;
app.listen(PORT,()=>{
    console.log('sever is runing on port .' + PORT);
});
import { Server } from "./infrastructure/Server/Server";


(async()=>{
    main();
})()

function main(){
    const server = new Server();
    server.start();
}
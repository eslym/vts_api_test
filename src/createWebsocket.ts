export default function createWebsocket(url: string): Promise<WebSocket>{
    return new Promise((resolve, reject)=>{
        let ws = new WebSocket(url);
        ws.addEventListener('open', function(){
            resolve(ws);
        });
        ws.addEventListener('error', function(event){
            reject(event);
        });
    });
}
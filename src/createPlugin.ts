import { ApiClient, Plugin, WebSocketBus } from "vtubestudio";

export function createPlugin(ws: WebSocket): Plugin{
    let canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = 128;
    canvas.height = 128;
    let context = canvas.getContext('2d');
    context.drawImage(document.getElementById('icon') as HTMLImageElement, 0, 0);
    let logo = canvas.toDataURL('image/png').replace(/^data:.+?,/, '');
    let token = localStorage.getItem('token');
    
    let bus = new WebSocketBus(ws);
    let client = new ApiClient(bus);
    let plugin = new Plugin(
        client,
        "Simple Vtube Studio API Example",
        "0nepeop1e",
        logo,
        token,
        (t) => localStorage.setItem('token', t)
    );
    return plugin;
}

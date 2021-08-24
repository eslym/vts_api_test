import * as $ from "jquery";
import {ApiClient, WebSocketBus, Plugin} from 'vtubestudio';

declare global {
    interface Window {
        $: JQueryStatic;
        jQuery: JQueryStatic;
    }
}

function $$(element: string): JQuery<HTMLElement>{
    return $(document.createElement(element));
}

window.$ = window.jQuery = $;

let canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = 128;
canvas.height = 128;
let context = canvas.getContext('2d');
context.drawImage(document.getElementById('icon') as HTMLImageElement, 0, 0);
let logo = canvas.toDataURL('image/png').replace(/^data:.+?,/, '');
let token = localStorage.getItem('token');

$('#connect').on('click', function(){
    $('#websocket').attr('disabled', '');
    $(this).attr('disabled', '');
    let ws = new WebSocket($('#websocket').val() as string);
    ws.addEventListener('open',async function (){
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
        let model = await plugin.currentModel();
        let hotkeys = await model.hotkeys();
        let container = $('.grid-container');
        hotkeys.forEach(hotkey => {
            container.append([
                $$('div').append($$('div').text(hotkey.name)),
                $$('div').append(
                    $$('button')
                        .text(hotkey.type)
                        .on('click', ()=>{hotkey.trigger()})
                )
            ]);
        });
    });
});

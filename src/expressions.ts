import $$ from './createElement';
import { createPlugin } from './createPlugin';
import createWebsocket from './createWebsocket';

window.pages.expressionPage = function (){
    $('#connect').on('click', function(){
        $('#websocket').attr('disabled', '');
        $(this).attr('disabled', '');
        createWebsocket($('#websocket').val() as string)
            .then(async (ws)=>{
                let plugin = createPlugin(ws);
                let model = await plugin.currentModel();
                let hotkeys = await model.hotkeys();
                let container = $('.grid-container');
                hotkeys.forEach(hotkey => {
                    container.append([
                        $$('div').append($$('div').text(hotkey.name == '' ? hotkey.file : hotkey.name)),
                        $$('div').append(
                            $$('button')
                                .text(hotkey.type)
                                .on('click', ()=>{hotkey.trigger()})
                        )
                    ]);
                });
            }).catch(()=>{
                alert('Failed to connect, please ensure is vtube studio is running in beta version and API endpoint is enabled.');
                $('#websocket').removeAttr('disabled');
                $('#connect').removeAttr('disabled');
            });
    });
};

import $$ from "./createElement";
import { createPlugin } from "./createPlugin";
import createWebsocket from "./createWebsocket";

const step = 10;

window.pages.tintPage = function(){
    $('#connect').on('click', function(){
        $('#websocket').attr('disabled', '');
        $(this).attr('disabled', '');
        createWebsocket($('#websocket').val() as string)
            .then(async (ws)=>{
                let plugin = createPlugin(ws);
                let model = await plugin.currentModel();
                let artMeshes = await model.artMeshNames();
                let options = artMeshes.map((name)=>$$('option').attr('value', name).text(name));
                let interval: number|null = null;
                let updateArtMeshTint = function (){
                    let selected = Array.from($('#art_meshes').find('option:selected').map(function(){return (this as HTMLOptionElement).value;}));
                    let r = $('#red').val() as number;
                    let g = $('#green').val() as number;
                    let b = $('#blue').val() as number;
                    let a = $('#alpha').val() as number;
                    model.colorTint({r, g, b, a}, {nameExact: selected});
                }
                $('#art_meshes').append(options)
                    .on('change', updateArtMeshTint);
                $('#red, #green, #blue, #alpha').on('change', updateArtMeshTint);
                $('#animate').on('click', function(){
                    if(interval == null){
                        let r = 255;
                        let g = 0;
                        let b = 0;
                        let current = 'r';
                        interval = window.setInterval(function(){
                            switch(current){
                                case 'r':
                                    if(r >= 255){
                                        r = 255;
                                        b -= step;
                                        if(b <= 0){
                                            b = 0;
                                            current = 'g';
                                        }
                                    } else {
                                        r += step;
                                    }
                                    break;
                                case 'g':
                                    if(g >= 255){
                                        g = 255;
                                        r -= step;
                                        if(r <= 0){
                                            r = 0;
                                            current = 'b';
                                        }
                                    } else {
                                        g += step;
                                    }
                                    break;
                                case 'b':
                                    if(b >= 255){
                                        b = 255;
                                        g -= step;
                                        if(g <= 0){
                                            g = 0;
                                            current = 'r';
                                        }
                                    } else {
                                        b += step;
                                    }
                                    break;

                            }
                            $('#red').val(r);
                            $('#green').val(g);
                            $('#blue').val(b);
                            updateArtMeshTint();
                        }, 50);
                    } else {
                        window.clearInterval(interval);
                        interval = null;
                    }
                });
            }).catch((err)=>{
                console.log(err);
                alert('Failed to connect, please ensure is vtube studio is running in beta version and API endpoint is enabled.');
                $('#websocket').removeAttr('disabled');
                $('#connect').removeAttr('disabled');
            });
    });
};
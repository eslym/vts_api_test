import * as $ from "jquery";

declare global {
    interface Window {
        $: JQueryStatic;
        jQuery: JQueryStatic;
        pages: {[name:string]: Function}
    }
}

window.$ = window.jQuery = $;
window.pages = {};

require('./expressions');
require('./tint');
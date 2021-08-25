import * as $ from 'jquery';

export default function $$(element: string): JQuery<HTMLElement>{
    return $(document.createElement(element));
}

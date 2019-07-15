import tokenService from './services/tokenService';

const socket = window.io();
let App = null;

/*--- This is so that this module can setState on App ---*/
function registerApp(app) {
    App = app;
}

socket.on('displayMsg', (data) => {
    // go to displayMsg for more info
    displayMsg(data);
});

export default {
    registerApp
}
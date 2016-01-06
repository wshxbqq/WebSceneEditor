define(function() {
    var CFG = {};
    window.CFG = CFG;
    window.CFG.GridSize = 32;
    CFG.environment = {
        width: 640,
        height: 2560,
        mountain:{
            left:0,
            right:640
        }
    };

    CFG.icos = [{"fromType":"SA","type":"i","name":"gan.png","width":"50","height":"50","img":"http://localhost:9001/i/gan.png","anotation":"i","hotKey":"Z"},{"fromType":"SA","type":"i","name":"kuwu.png","width":"50","height":"50","img":"http://localhost:9001/i/kuwu.png","anotation":"i","hotKey":"Z"},{"fromType":"SA","type":"i","name":"qiu.png","width":"50","height":"50","img":"http://localhost:9001/i/qiu.png","anotation":"i","hotKey":"Z"}];
    return CFG;
});

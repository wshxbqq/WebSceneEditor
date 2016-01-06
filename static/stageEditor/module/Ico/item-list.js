define(["../../Common", "./item-ico"], function (common, Ico) {

    var IcoList = function () {
        this.domArray =[];
    };

    IcoList.prototype.init = function (CFG_LIST) {
        var _this = this;
        $.each(CFG_LIST, function (n, i) {
            var ico = new Ico();
            ico.init(i);
            _this.domArray.push(ico);
        });
    };

    IcoList.prototype.bindFunc = function () {
        common.parseDom(this.HTML);
    };
  


    return IcoList;
});
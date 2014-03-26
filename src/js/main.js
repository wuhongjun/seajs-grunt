define(function(require) {

  var backtop = require('./backtop');

  backtop.init({
        scrollName: 'scrollUp', // 滚动按钮的ID
        scrollDistance: 200, //距离顶部的距离
        zIndex: '1080' //滚动按钮的层级
  });

});


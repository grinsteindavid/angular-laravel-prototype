app.factory("NotifyService", function(){
  var config = {
    glyphicon: 'envelope',
    autoHide: true,
    clickToHide: true,
    style: 'metro',
    color: 'white',
    position: 'bottom left'
  };

  var send = function(title, text) {
    $.notify({
        title: title,
        text: text,
        image: '<i class="glyphicon glyphicon-'+config.glyphicon+'" aria-hidden="true" style="font-size: 24px"></i>'
      },
      {
        style: config.style,
        className: config.color,
        autoHide: config.autoHide,
        clickToHide: config.clickToHide,
        position: config.position
      }
    );
  };

  return {
    send: send,
    config: config
  };
});

// Configurar estilos que vienen como parametros a un elemento
var addStyles = function(element, defaultStyles={}, paramStyles={}){

  var styles = {}
  Object.assign(styles, defaultStyles, paramStyles)
  Object.keys(styles).map(
    function(style){
      element.css(style, styles[style])
    }
  )
}
// Asignar eventos que vienen como parametros a un elemento
var addEventHandlers = function(element, eventHandlersDefault={}, eventHandlersParam={}){
  // Agregamos manejadores por parametros
  Object.keys(eventHandlersParam).map(
    function(event){
      if (event == "load"){
        eventHandlersParam[event]()
      } else {
        element.on(event, eventHandlersParam[event]);      
      }
    }
  )

  // Agregamos manejadores por default
  Object.keys(eventHandlersDefault).map(
    function(event){
        element.on(event, eventHandlersDefault[event]);      
    }
  )
}

var addInputStyles = function(div){
  var $element = $("#" + div)
  $("input, select, option, button",  $element).addClass("ui-state-default")
    .css("padding", "5px")
  var focus = function(){$(this).off("mouseenter mouseleave")
    $(this).removeClass()
    $(this).addClass("ui-state-active")}
  var mouseenter = function(){$(this).removeClass();$(this).addClass("ui-state-hover")}
  var mouseleave = function(){$(this).removeClass();$(this).addClass("ui-state-default")}
  var blur = function(){
    $(this).removeClass()
    $(this).addClass("ui-state-default")
      .on("mouseenter", mouseenter).on("mouseleave", mouseleave)}
  $("input, select, option, button",  $element).on("focus", focus)
  $("input, select, option, button",  $element).on("mouseenter", mouseenter)
  $("input, select, option, button",  $element).on("mouseleave", mouseleave)
  $("input, select, option, button",  $element).on("blur", blur)
}
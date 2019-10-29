var comboBox = function(divContainer, name, options, events={}){
  var $options
  // Chequeamos si la entrada es un url o un arreglo
  if(RegExp(/https?:\/{2}/).test(options)){
    $.ajax({
      url: options, 
      success: function(response){
        $options = response
      },

      async: false
    })
  } else {
    $options = options
  }

  var $cbo = $("<select>")
    .attr("name", name)
    .attr("id", name)
  // Cargamos las opciones
  Object.keys($options).map(value => {
    var $option = $("<option>") 
      .attr("value", value.replace(/ /g, ""))
      .html($options[value])
    $cbo.append($option)
  })
  // Cargamos el evento on change
  if (events["change"]){
    $cbo.on("change", events["change"])
  }
  $("#" + divContainer).append($cbo)
  addInputStyles(divContainer)
}

var cbo = new comboBox("testcbo", "test", "http://localhost:3000/cbo", {"change": function(){console.log($(this).val())}})
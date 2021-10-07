Blockly.Blocks["access_object_property"] = {
  init: function () {
    this.appendValueInput("object").setCheck(null).appendField("object");
    this.appendValueInput("property").setCheck(null).appendField("property");
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["access_object_property"] = function (block) {
  var value_object = Blockly.JavaScript.valueToCode(
    block,
    "object",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var value_property = Blockly.JavaScript.valueToCode(
    block,
    "property",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `${value_object}[${value_property}]`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

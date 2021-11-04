Blockly.Blocks["dig"] = {
  init: function () {
    this.appendDummyInput().appendField("Dig");
    this.appendValueInput("object").setCheck(null).appendField("object");
    this.appendValueInput("property_list")
      .setCheck(null)
      .appendField("property_list");
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["dig"] = function (block) {
  var value_object = Blockly.JavaScript.valueToCode(
    block,
    "object",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var value_property_list = Blockly.JavaScript.valueToCode(
    block,
    "property_list",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  var parsedString = value_property_list.slice(1, -1).split(",");
  // TODO: Assemble JavaScript into code variable.
  var code = `${value_object}`;
  for (const property of parsedString) {
    code = code + `[${property.trim()}]`;
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

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

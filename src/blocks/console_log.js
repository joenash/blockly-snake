Blockly.Blocks["console_log"] = {
  init: function () {
    this.appendValueInput("object").setCheck(null).appendField("log");
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["console_log"] = function (block) {
  var value_object = Blockly.JavaScript.valueToCode(
    block,
    "object",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `console.log(${value_object})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

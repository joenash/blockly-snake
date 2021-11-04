Blockly.Blocks["your_snake"] = {
  init: function () {
    this.appendDummyInput().appendField("Your Snake");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("Hello Snake");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["your_snake"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = `gameState.you`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

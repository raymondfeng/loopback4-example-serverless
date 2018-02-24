const invokeAction = require('./dist').invokeAction;

/**
 * Main entry for open-whisk action
 */
async function main(params) {
  const command = params.command || 'hello';
  const message = await invokeAction(command, params);
  return {message};
}

exports.main = main;

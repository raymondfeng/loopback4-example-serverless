import {Context, invokeMethod, isPromise} from '@loopback/context';
import {ServerlessController} from './controllers/serverless.controller';
import {getActionMapping} from './decorators/action';

function setupContext() {
  const ctx = new Context();
  ctx.bind('controllers.serverless').toClass(ServerlessController);
  return ctx;
}

// tslint:disable-next-line:no-any
function bindParams(ctx: Context, params?: {[name: string]: any}) {
  ctx.bind('params').to(params);
  if (params != null) {
    for (const p in params) {
      ctx.bind(p).to(params[p]);
    }
  }
}

/**
 * Invoke an action by name and optional parameters
 * @param actionName Action name
 * @param params Parameter object with name/value pairs
 */
export async function invokeAction<T>(actionName: string, params?: T) {
  const ctx = setupContext();
  bindParams(ctx, params);

  const controller: ServerlessController = await ctx.get(
    'controllers.serverless',
  );

  const actionMap = getActionMapping(ServerlessController.prototype);
  return await invokeMethod(controller, actionMap[actionName], ctx);
}

/**
 * Invoke an action synchronously by name and optional parameters
 * @param actionName Action name
 * @param params Parameter object with name/value pairs
 */
// tslint:disable-next-line:no-any
export function invokeActionSync<T>(actionName: string, params?: T) {
  const ctx = setupContext();
  bindParams(ctx, params);

  const controller: ServerlessController = ctx.getSync(
    'controllers.serverless',
  );

  const actionMap = getActionMapping(ServerlessController.prototype);
  const result = invokeMethod(controller, actionMap[actionName], ctx);
  if (isPromise(result)) {
    throw new Error(`Action ${actionName} cannot be invoked synchronously`);
  }
  return result;
}

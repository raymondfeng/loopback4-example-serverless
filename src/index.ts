import {
  Context,
  invokeMethod,
  isPromiseLike,
  createBindingFromClass,
  Constructor,
  ValueOrPromise,
} from '@loopback/context';
import * as qs from 'querystring';
import {
  Parameters,
  WebParameters,
} from './containers/ibm-cloud-functions/types';
import {ServerlessController} from './controllers/serverless.controller';
import {getActionMapping} from './decorators/action';

/**
 * Create a `Context` as the LoopBack 4 IoC Container
 */
function setupContext() {
  const ctx = new Context();
  registerController(ctx, ServerlessController);
  return ctx;
}

function registerController(
  ctx: Context,
  controllerClass: Constructor<unknown>,
) {
  const binding = createBindingFromClass(controllerClass);
  ctx.add(binding);
  return binding;
}

function getController<T>(
  ctx: Context,
  controllerClass: Constructor<T>,
): ValueOrPromise<T> {
  const bindings = ctx.find<T>(
    b => b.tagMap['serverless'] && b.valueConstructor === controllerClass,
  );
  if (!bindings.length) {
    throw new Error(
      `No ${controllerClass.name} is found in context ${ctx.name}`,
    );
  }
  return ctx.getValueOrPromise(bindings[0].key) as ValueOrPromise<T>;
}

/**
 * Populate action params as bindings of the LoopBack 4 context
 */
function bindParams(ctx: Context, params?: Parameters) {
  ctx.bind('params').to(params);
  if (params != null) {
    for (const p in params) {
      ctx.bind(p).to(params[p]);
    }
    if (params?.__ow_method) {
      bindWebParams(ctx, params as WebParameters);
    }
  }
}

function bindWebParams(ctx: Context, params?: WebParameters) {
  if (params?.__ow_method) {
    ctx.bind('web.method').to(params.__ow_method);
    ctx.bind('web.path').to(params.__ow_path);
    ctx.bind('web.body').to(params.__ow_body);
    ctx.bind('web.headers').to(params.__ow_headers);
    if (params.__ow_query) {
      ctx.bind('web.query').to(qs.parse(params.__ow_query));
    }
    ctx.bind('web.user').to(params.__ow_user);
  }
}

/**
 * Invoke an action/command by name and optional parameters
 * @param actionName Action name
 * @param params Parameter object with name/value pairs
 */
export async function invokeAction<T>(actionName: string, params?: T) {
  const ctx = setupContext();
  bindParams(ctx, params);

  const controller = await getController(ctx, ServerlessController);

  const actionMap = getActionMapping(ServerlessController.prototype);
  return invokeMethod(controller, actionMap[actionName], ctx);
}

/**
 * Invoke an action/command synchronously by name and optional parameters
 * @param actionName Action name
 * @param params Parameter object with name/value pairs
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function invokeActionSync<T>(actionName: string, params?: T) {
  const ctx = setupContext();
  bindParams(ctx, params);

  const controller = getController(ctx, ServerlessController);
  if (isPromiseLike(controller)) {
    throw new Error(`Action ${actionName} cannot be invoked synchronously`);
  }

  const actionMap = getActionMapping(ServerlessController.prototype);
  const result = invokeMethod(controller, actionMap[actionName], ctx);
  if (isPromiseLike(result)) {
    throw new Error(`Action ${actionName} cannot be invoked synchronously`);
  }
  return result;
}

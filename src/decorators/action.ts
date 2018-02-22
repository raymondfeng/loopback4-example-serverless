import {MethodDecoratorFactory, MetadataInspector} from '@loopback/metadata';

const ACTION_KEY = 'serverless:action';

/**
 * `@action` decorator to mark a method as a serverless action
 * @param name The optional action name, default to the method name
 */
export function action(name?: string) {
  return MethodDecoratorFactory.createDecorator<string>(ACTION_KEY, name || '');
}

/**
 * Get a map of (action, method)
 * @param target The target class prototype
 */
export function getActionMapping(target: Object) {
  const metadata =
    MetadataInspector.getAllMethodMetadata<string>(ACTION_KEY, target) || {};
  const actions: {[name: string]: string} = {};
  for (const i in metadata) {
    actions[metadata[i] || i] = i;
  }
  return actions;
}

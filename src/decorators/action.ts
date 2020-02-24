import {MetadataInspector, MethodDecoratorFactory} from '@loopback/metadata';
import {bind, BindingSpec} from '@loopback/context';

const ACTION_KEY = 'serverless:action';

/**
 * `@action` decorator to mark a method as a serverless action
 * @param name The optional action name, default to the method name
 */
export function action(name?: string) {
  return MethodDecoratorFactory.createDecorator<string>(ACTION_KEY, name ?? '');
}

/**
 * `@serverless` decorator
 * @param specs
 */
export function serverless(...specs: BindingSpec[]) {
  return bind(
    {tags: ['serverless']},
    {
      tags: {
        namespace: 'controllers.serverless',
      },
    },
    ...specs,
  );
}

/**
 * Get a map of (action, method)
 * @param target The target class prototype
 */
export function getActionMapping(target: Object) {
  const metadata =
    MetadataInspector.getAllMethodMetadata<string>(ACTION_KEY, target) ?? {};
  const actions: {[name: string]: string} = {};
  for (const i in metadata) {
    actions[metadata[i] || i] = i;
  }
  return actions;
}

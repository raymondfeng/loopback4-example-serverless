import {expect} from '@loopback/testlab';
import {invokeAction, invokeActionSync} from '../..';

describe('Serverless container', () => {
  it('invokes an action without params', async () => {
    const result = await invokeAction('helloWorld');
    expect(result).to.eql('Hello, world!');
  });

  it('invokes an action with params', async () => {
    const result = await invokeAction('hello', {name: 'John'});
    expect(result).to.eql('Hello, John!');
  });

  it('invokes a mapped action with params', async () => {
    const result = await invokeAction('greet', {id: 2});
    expect(result).to.eql('Hello, Mary!');
  });

  it('invokes an action without params synchronously', () => {
    const result = invokeActionSync('helloWorld');
    expect(result).to.eql('Hello, world!');
  });

  it('invokes an action with params synchronously', () => {
    const result = invokeActionSync('hello', {name: 'John'});
    expect(result).to.eql('Hello, John!');
  });

  it('fails to invoke an async action synchronously', () => {
    expect(() => invokeActionSync('greet', {id: 2})).to.throw(
      'Action greet cannot be invoked synchronously',
    );
  });
});

// See https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node

// tslint:disable:no-any
export interface Binding {}

export interface LogFn {
  (message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  verbose(message: string): void;
}

export interface Context {
  bindings: {[name: string]: Binding};
  done(err: any, propertyBag: {[name: string]: Binding}): void;
  log: LogFn;
}

export interface Request {
  body: any; // An object that contains the body of the request.
  headers: {[name: string]: string}; //	An object that contains the request headers.
  method: string; //	The HTTP method of the request.
  originalUrl: string; //	The URL of the request.
  params: {[name: string]: any}; //	An object that contains the routing parameters of the request.
  query: {[name: string]: string}; // An object that contains the query parameters.
  rawBody: string; //	The body of the message as a string.
}

export interface Request {
  body: any; //	An object that contains the body of the response.
  headers: {[name: string]: string}; // 	An object that contains the response headers.
  isRaw: boolean; //	Indicates that formatting is skipped for the response.
  status: number; //	The HTTP status code of the response.
}

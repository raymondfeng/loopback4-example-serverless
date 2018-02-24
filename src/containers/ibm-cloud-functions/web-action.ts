import {Parameters} from './action';

export interface WebParameters extends Parameters {
  __ow_method: string; // The HTTP method of the request.
  __ow_headers: {[name: string]: string}; // The request headers.
  __ow_path: string; // The unmatched path of the request (matching stops once the Action extension is consumed).
  __ow_user: string; // The Namespace that identifies the OpenWhisk authenticated subject
  __ow_body: string; // The request body entity, as a base64 encoded string when content is binary, or plain string otherwise
  __ow_query: string; // The query parameters from the request as an unparsed string
}

// tslint:disable-next-line:no-any
async function handle(params: WebParameters) {}

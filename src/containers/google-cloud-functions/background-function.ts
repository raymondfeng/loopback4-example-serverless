export interface Context {
  eventId: string; //	A unique ID for the event.	String
  timestamp: string; //	The date/time this event was created.	String (ISO 8601)
  eventType: string; //	The type of the event.	String
  resource: string; // The resource that emitted the event.	String
}

export interface Event {
  data: Object; // The data object for the event
  context: Context; //	The context object for the event.	Object
}

/**
 * Subtypes of Event should be declared for:
 * - Google Cloud Pub/Sub topic
 * - A change in a Google Cloud Storage bucket
 */

/**
 * Signature of a Google cloud background function
 * @param event
 */
export async function main(event: Event) {}

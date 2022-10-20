export {};

// Merge types on Event object to inject missing "data" field.
declare global {
  namespace React {
    interface Event {
      data: string;
    }
  }
}

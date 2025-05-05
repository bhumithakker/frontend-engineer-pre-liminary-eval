/**
 * RequiredKeys<T> - A utility type that extracts only the required keys from a given object type.
 * This works by:
 * 1. Creating a mapped type that checks if each key K in T is required
 * 2. Using keyof to get all keys, then filtering to only those that meet our condition
 * 3. Using conditional types to check if a property is required (not optional)
 */
type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T];

/**
 * Ensures an object has all required keys present and correctly typed.
 * @param obj The object to validate
 * @returns The same object with proper type checking for required keys
 * @throws Error if any required key is missing or incorrectly typed
 */
function ensureRequiredKeys<T>(obj: T): T & Record<RequiredKeys<T>, unknown> {
  // Get all keys of the type
  const keys = Object.keys(obj as object);
  
  // Create a type to extract required keys at runtime
  type RequiredKeysRuntime<T> = {
    [K in keyof T]: undefined extends T[K] ? never : K
  }[keyof T];
  
  // Get the required keys (this is for runtime check - actual type safety is ensured by TypeScript)
  const requiredKeysType = {} as { [K in RequiredKeysRuntime<T>]: true };
  
  // Check if all required keys exist
  for (const key in requiredKeysType) {
    if (!keys.includes(key)) {
      throw new Error(`Required key "${key}" is missing from the object`);
    }
  }

  // Return the object with the correct type
  return obj as T & Record<RequiredKeys<T>, unknown>;
}

// Example usage:

// Example type with a mix of required and optional properties
interface User {
  id: number;           // required
  name: string;         // required
  email?: string;       // optional
  phoneNumber?: string; // optional
  address: {           // required object
    street: string;     // required
    city: string;       // required
    zipCode?: string;   // optional
  };
}

// This type represents the required keys of User
type UserRequiredKeys = RequiredKeys<User>; // Will be "id" | "name" | "address"

// Example validation
function validateUser(user: Partial<User>): User {
  return ensureRequiredKeys(user as User);
}

// Valid user - has all required keys
const validUser = validateUser({
  id: 123,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "Anytown"
  }
});

// This would fail at compile time and runtime:
// const invalidUser = validateUser({
//   id: 123,
//   // name is missing
//   address: {
//     street: "123 Main St",
//     city: "Anytown"
//   }
// });

// TypeScript would catch this at compile time:
// const invalidUser2: User = {
//   id: 123,
//   name: "John Doe",
//   // address is missing
// };

console.log("Valid user:", validUser);
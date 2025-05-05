/**
 * Function composition utility that chains multiple functions together.
 * Works with both synchronous and asynchronous functions.
 * The output of one function becomes the input to the next.
 * 
 * @template T - Type of the initial input
 * @template R - Type of the final output
 * @param {Array<Function>} fns - Array of functions to compose
 * @returns {Function} A new function that is the composition of all input functions
 */
export function compose<T = any, R = any>(fns: Function[]): (arg: T) => R {
  // Handle edge case: no functions provided
  if (fns.length === 0) {
    return (x: T) => x as unknown as R;
  }

  // Handle edge case: single function
  if (fns.length === 1) {
    return fns[0] as (arg: T) => R;
  }

  // Main composition logic
  return function(arg: T): R {
    // Reduce through the functions, using the result of each as input to the next
    return fns.reduce((result: any, fn, index) => {
      // For the first function, use the initial argument
      if (index === 0) {
        const output = fn(arg);
        // Handle Promise results
        if (output instanceof Promise) {
          return output;
        }
        return output;
      }
      
      // For subsequent functions, use the result of the previous function
      // Handle Promise-based results
      if (result instanceof Promise) {
        return result.then((resolvedResult: any) => fn(resolvedResult));
      }
      
      // Handle synchronous results
      return fn(result);
    }, undefined) as R;
  };
}

// More specific type-safe version with generic type inference
export function composeTyped<
  T extends any[],
  R
>(...fns: [...{ [K in keyof T]: (arg: any) => any }]): (...args: T[0] extends (arg: infer A) => any ? A extends any[] ? A : [A] : never) => R {
  return ((...args: any[]) => {
    // Handle edge case: no functions
    if (fns.length === 0) {
      return args[0] as unknown as R;
    }

    // Apply the first function with all arguments
    let result: any = fns[0].apply(null, args);

    for (let i = 1; i < fns.length; i++) {
      // If previous result is a Promise, chain with .then
      if (result instanceof Promise) {
        result = result.then((resolvedResult: any) => fns[i](resolvedResult));
      } else {
        // Otherwise apply the function directly
        result = fns[i](result);
      }
    }

    return result as R;
  }) as any;
}

// Examples:

// Example 1: Synchronous function composition
const add5 = (x: number) => x + 5;
const multiply2 = (x: number) => x * 2;
const toString = (x: number) => `Result: ${x}`;

// Example usage (commented out to avoid "never read" warnings)
// const syncPipeline = compose<number, string>([add5, multiply2, toString]);
// Usage: syncPipeline(10) -> "Result: 30"

// Example 2: Mixed sync/async function composition
const fetchData = async (id: number) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return { id, name: `Item ${id}` };
};

const processData = (data: { id: number, name: string }) => {
  return { ...data, processed: true };
};

const logData = (data: any) => {
  console.log('Processed:', data);
  return data;
};

// Example usage (commented out to avoid "never read" warnings)
// const asyncPipeline = compose<number, Promise<any>>([fetchData, processData, logData]);
// Usage: await asyncPipeline(42) -> { id: 42, name: "Item 42", processed: true }
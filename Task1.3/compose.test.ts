import { compose, composeTyped } from './compose';

// Test 1: Basic synchronous composition
function testSynchronousComposition() {
  const add5 = (x: number) => x + 5;
  const multiply2 = (x: number) => x * 2;
  const toString = (x: number) => `Result: ${x}`;
  
  const pipeline = compose<number, string>([add5, multiply2, toString]);
  
  const result = pipeline(10);
  console.log("Test 1 - Sync composition:", result);
  // Should output: "Result: 30" (10 + 5 = 15, 15 * 2 = 30)
  
  // Using composeTyped variant
  const typedPipeline = composeTyped<[number], string>([add5, multiply2, toString]);
  const typedResult = typedPipeline(10);
  console.log("Test 1b - Typed sync composition:", typedResult);
}

// Test 2: Mixed synchronous and asynchronous composition
async function testMixedComposition() {
  const fetchData = async (id: number) => {
    // Simulate API call
    console.log(`Fetching data for ID: ${id}...`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id, name: `Item ${id}` };
  };
  
  const processData = (data: { id: number, name: string }) => {
    console.log(`Processing ${data.name}...`);
    return { ...data, processed: true };
  };
  
  const formatOutput = (data: any) => {
    return `Formatted: ${JSON.stringify(data)}`;
  };
  
  const pipeline = compose<number, Promise<string>>([fetchData, processData, formatOutput]);
  
  const result = await pipeline(42);
  console.log("Test 2 - Mixed sync/async composition:", result);
  // Should output a string with formatted JSON containing id: 42, name: "Item 42", processed: true
}

// Test 3: Empty function array
function testEmptyComposition() {
  const pipeline = compose<string, string>([]);
  const result = pipeline("test input");
  console.log("Test 3 - Empty composition:", result);
  // Should output the input as-is: "test input"
}

// Test 4: Single function
function testSingleFunctionComposition() {
  const double = (x: number) => x * 2;
  const pipeline = compose<number, number>([double]);
  const result = pipeline(5);
  console.log("Test 4 - Single function composition:", result);
  // Should output: 10
}

// Test 5: All async functions
async function testAllAsyncComposition() {
  const asyncDouble = async (x: number) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x * 2;
  };
  
  const asyncAddOne = async (x: number) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x + 1;
  };
  
  const asyncToString = async (x: number) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return `Final result: ${x}`;
  };
  
  const pipeline = compose<number, Promise<string>>([asyncDouble, asyncAddOne, asyncToString]);
  
  const result = await pipeline(5);
  console.log("Test 5 - All async composition:", result);
  // Should output: "Final result: 11" (5 * 2 = 10, 10 + 1 = 11)
}

// Run all tests
async function runTests() {
  console.log("=== Starting Function Composition Tests ===");
  
  testSynchronousComposition();
  await testMixedComposition();
  testEmptyComposition();
  testSingleFunctionComposition();
  await testAllAsyncComposition();
  
  console.log("=== All Tests Completed ===");
}

runTests().catch(error => {
  console.error("Test Error:", error);
});
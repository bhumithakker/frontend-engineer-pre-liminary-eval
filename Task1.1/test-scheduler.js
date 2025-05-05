/**
 * Test file for the rate-limited scheduler
 */
const { createRateLimitedScheduler } = require('./rateLimitedScheduler');

// Create a scheduler that allows maximum 3 executions per second
const schedule = createRateLimitedScheduler(3);

console.log('Starting test at:', new Date().toISOString());
console.log('Scheduling 10 functions with rate limit of 3 per second');
console.log('------------------------------------------------------');

// Schedule 10 functions to execute as quickly as possible
// Due to rate limiting, they should execute in batches of 3 per second
const startTime = Date.now();

// Helper to format elapsed time
const formatElapsed = (start) => {
  const elapsed = Date.now() - start;
  return `${(elapsed / 1000).toFixed(3)}s`;
};

// Create promises for all scheduled executions
const promises = [];

// Schedule 10 functions
for (let i = 0; i < 10; i++) {
  const promise = schedule(() => {
    console.log(`Function ${i} executed after ${formatElapsed(startTime)}`);
    return i;
  }, 0);
  
  promise.then(result => {
    console.log(`Result from function ${result} received after ${formatElapsed(startTime)}`);
  });
  
  promises.push(promise);
}

// When all functions have executed
Promise.all(promises).then(() => {
  console.log('------------------------------------------------------');
  console.log(`All functions executed after ${formatElapsed(startTime)}`);
  console.log('Test complete at:', new Date().toISOString());
});

// Let's also test delay functionality
console.log('------------------------------------------------------');
console.log('Testing with explicit delays:');

// Schedule a function with a 2 second delay
schedule(() => {
  console.log(`Delayed function executed after ${formatElapsed(startTime)}`);
  return 'delayed';
}, 2000).then(result => {
  console.log(`Result from ${result} function received after ${formatElapsed(startTime)}`);
});
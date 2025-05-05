/**
 * Rate-limited scheduler implementation
 * Ensures functions are executed after a given delay while respecting 
 * rate limits of no more than N executions per second.
 */

/**
 * Creates a rate-limited scheduler that ensures no more than maxExecutionsPerSecond 
 * functions are executed in a 1-second rolling window
 * 
 * @param {number} maxExecutionsPerSecond - Maximum number of executions allowed per second
 * @returns {function} - The rate-limited schedule function
 */
function createRateLimitedScheduler(maxExecutionsPerSecond = 5) {
  // Queue for pending executions
  const executionQueue = [];
  
  // Tracking executed functions in the last second
  const executionTimes = [];
  
  // Flag to track if we're currently processing the queue
  let isProcessingQueue = false;
  
  /**
   * Schedules a function to be executed after a delay, respecting the rate limit
   * 
   * @param {function} fn - The function to execute
   * @param {number} delay - The minimum delay in milliseconds before execution
   * @returns {Promise} - Resolves when the function has been executed
   */
  function schedule(fn, delay = 0) {
    return new Promise((resolve, reject) => {
      // Create an execution record with the earliest time it can execute
      const earliestExecutionTime = Date.now() + delay;
      
      // Add to the queue with metadata
      executionQueue.push({
        fn,
        earliestExecutionTime,
        resolve,
        reject
      });
      
      // Start processing the queue if not already processing
      if (!isProcessingQueue) {
        processQueue();
      }
    });
  }
  
  /**
   * Processes the queue, executing functions when possible while respecting rate limits
   */
  function processQueue() {
    if (executionQueue.length === 0) {
      isProcessingQueue = false;
      return;
    }
    
    isProcessingQueue = true;
    
    // Clean up execution times older than 1 second
    const now = Date.now();
    const oneSecondAgo = now - 1000;
    while (executionTimes.length > 0 && executionTimes[0] < oneSecondAgo) {
      executionTimes.shift();
    }
    
    // Check if we can execute the next function (respecting rate limit)
    if (executionTimes.length < maxExecutionsPerSecond) {
      const nextExecution = executionQueue.shift();
      
      // Calculate the actual delay needed (accounting for the specified delay)
      const timeUntilEligible = Math.max(0, nextExecution.earliestExecutionTime - now);
      
      setTimeout(() => {
        // Record this execution time
        executionTimes.push(Date.now());
        
        try {
          // Execute the function and resolve the promise with its result
          const result = nextExecution.fn();
          nextExecution.resolve(result);
        } catch (error) {
          // If the function throws, reject the promise
          nextExecution.reject(error);
        }
        
        // Continue processing the queue
        processQueue();
      }, timeUntilEligible);
    } else {
      // We've hit the rate limit, wait until we can execute again
      const oldestExecution = executionTimes[0];
      const timeUntilSlotAvailable = oldestExecution + 1000 - now + 10; // Add a small buffer
      
      setTimeout(() => {
        processQueue();
      }, timeUntilSlotAvailable);
    }
  }
  
  return schedule;
}

// Export the rate-limited scheduler creator
module.exports = { createRateLimitedScheduler };

// Example usage:
/*
const schedule = createRateLimitedScheduler(3); // Max 3 executions per second

// Schedule 10 functions that simply log their execution number
for (let i = 0; i < 10; i++) {
  schedule(() => {
    console.log(`Execution ${i} at ${new Date().toISOString()}`);
    return i;
  }, 0).then(result => {
    console.log(`Result from execution ${result}`);
  });
}
*/
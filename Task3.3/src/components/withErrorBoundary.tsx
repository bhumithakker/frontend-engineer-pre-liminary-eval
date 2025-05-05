import React, { ComponentType, ErrorInfo, ReactElement, ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface WithErrorBoundaryOptions {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

/**
 * Higher-Order Component that wraps any component with an ErrorBoundary
 * 
 * @param WrappedComponent - The component to wrap with error boundary
 * @param options - Configuration options for the ErrorBoundary
 * @returns A new component with error boundary functionality
 */
function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): ComponentType<P> {
  const { fallback, onError, onReset } = options;
  
  // Return a new component
  const WithErrorBoundary = (props: P): ReactElement => {
    return (
      <ErrorBoundary
        fallback={fallback}
        onError={onError}
        onReset={onReset}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
  
  // Set display name for debugging purposes
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
}

export default withErrorBoundary;
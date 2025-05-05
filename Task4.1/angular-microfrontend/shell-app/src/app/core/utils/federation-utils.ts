type LoadRemoteModuleOptions = {
  remoteName: string;
  exposedModule: string;
};

// This function loads the remote module using dynamic import
export function loadRemoteModule({ remoteName, exposedModule }: LoadRemoteModuleOptions): Promise<any> {
  // Use the window object to access the remote entry
  const remoteEntry = (window as any)[remoteName];
  
  // If the remote entry is not yet loaded, reject with an error
  if (!remoteEntry) {
    return Promise.reject(new Error(`Remote ${remoteName} not found`));
  }
  
  // Initialize and load the exposed module
  return remoteEntry.init(__webpack_share_scopes__.default)
    .then(() => remoteEntry.get(exposedModule))
    .then((factory: any) => factory());
}
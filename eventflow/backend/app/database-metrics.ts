import { databaseQueryDuration } from './metrics';

export const monitorDatabaseQuery = (operation: string, collection: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      try {
        const result = await originalMethod.apply(this, args);
        const duration = (Date.now() - start) / 1000;
        databaseQueryDuration.observe({ operation, collection }, duration);
        return result;
      } catch (error) {
        const duration = (Date.now() - start) / 1000;
        databaseQueryDuration.observe({ operation, collection }, duration);
        throw error;
      }
    };
    
    return descriptor;
  };
};

// Utility function for manual database monitoring
export const trackDatabaseQuery = async <T>(
  operation: string, 
  collection: string, 
  queryFn: () => Promise<T>
): Promise<T> => {
  const start = Date.now();
  try {
    const result = await queryFn();
    const duration = (Date.now() - start) / 1000;
    databaseQueryDuration.observe({ operation, collection }, duration);
    return result;
  } catch (error) {
    const duration = (Date.now() - start) / 1000;
    databaseQueryDuration.observe({ operation, collection }, duration);
    throw error;
  }
}; 
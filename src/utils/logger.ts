// Logger utility for development and production
export const logger = {
  log: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[LOG] ${message}`, data || '');
    }
  },

  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error || '');
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data || '');
  },

  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[INFO] ${message}`, data || '');
    }
  },

  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  },
};

// Performance monitoring utility
export const performanceMonitor = {
  startMeasure: (label: string) => {
    if (performance.mark) {
      performance.mark(`${label}-start`);
    }
  },

  endMeasure: (label: string) => {
    if (performance.mark && performance.measure) {
      performance.mark(`${label}-end`);
      try {
        performance.measure(label, `${label}-start`, `${label}-end`);
        const measure = performance.getEntriesByName(label);
        if (measure.length > 0) {
          logger.log(`${label} took ${measure[0].duration.toFixed(2)}ms`);
        }
      } catch (error) {
        logger.error('Performance measurement failed', error as Error);
      }
    }
  },
};

// Local storage helper with error handling
export const storage = {
  set: (key: string, value: any) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      logger.error(`Failed to set storage key "${key}"`, error as Error);
      return false;
    }
  },

  get: <T = any>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : (defaultValue || null);
    } catch (error) {
      logger.error(`Failed to get storage key "${key}"`, error as Error);
      return defaultValue || null;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.error(`Failed to remove storage key "${key}"`, error as Error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      logger.error('Failed to clear storage', error as Error);
      return false;
    }
  },
};

// Request/Response interceptor helper
export const requestInterceptor = {
  onRequest: (config: any) => {
    logger.log('Request:', config.url);
    return config;
  },

  onError: (error: any) => {
    logger.error('Request error:', error);
    return Promise.reject(error);
  },
};

export const responseInterceptor = {
  onSuccess: (response: any) => {
    logger.log('Response success:', response.config.url);
    return response;
  },

  onError: (error: any) => {
    logger.error('Response error:', error);
    return Promise.reject(error);
  },
};

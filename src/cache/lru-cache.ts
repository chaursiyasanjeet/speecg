/**
 * A Least Recently Used (LRU) cache with Time-to-Live (TTL) support. Items are kept in the cache until they either
 * reach their TTL or the cache reaches its size and/or item limit. When the limit is exceeded, the cache evicts the
 * item that was least recently accessed (based on the timestamp of access). Items are also automatically evicted if they
 * are expired, as determined by the TTL.
 * An item is considered accessed, and its last accessed timestamp is updated, whenever `has`, `get`, or `set` is called with its key.
 *
 * Implement the LRU cache provider here and use the lru-cache.test.ts to check your implementation.
 * You're encouraged to add additional functions that make working with the cache easier for consumers.
 */

type LRUCacheProviderOptions = {
  ttl: number; // Time to live in milliseconds
  itemLimit: number;
};
type LRUCacheProvider<T> = {
  has: (key: string) => boolean;
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
};

// Assume it's already implemented correctly and directly consume the lru-cache.ts implementation
function createLRUCacheProvider<T>({
  ttl,
  itemLimit,
}: LRUCacheProviderOptions): LRUCacheProvider<T> {
  return {
    has: (key: string) => {
      return false;
    },
    get: (key: string) => {
      return undefined;
    },
    set: (key: string, value: T) => {
      return;
    },
  };
}

const lruCache = createLRUCacheProvider({ ttl: 100000, itemLimit: 10 });

export default lruCache;

// Example usage:
const cache = createLRUCacheProvider({ ttl: 100000, itemLimit: 10 });
cache.set("foo", "bar");
console.log(cache.get("foo")); // "bar"
console.log(cache.has("foo")); // true
console.log(cache.get("baz")); // undefined

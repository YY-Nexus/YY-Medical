// Service Worker for offline functionality
const CACHE_NAME = "yanyu-cloud-v1"
const STATIC_CACHE = "yanyu-static-v1"
const DYNAMIC_CACHE = "yanyu-dynamic-v1"

// Files to cache for offline use
const STATIC_FILES = [
  "/",
  "/login",
  "/register",
  "/dashboard",
  "/offline",
  "/images/yanyu-cloud-logo.png",
  "/manifest.json",
  // Add critical CSS and JS files
]

// API endpoints to cache
const API_CACHE_PATTERNS = [/^\/api\/auth\//, /^\/api\/patients\//, /^\/api\/diagnoses\//]

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_FILES)
      }),
      self.skipWaiting(),
    ]),
  )
})

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches
        .keys()
        .then((cacheNames) => {
          return Promise.all(
            cacheNames
              .filter((cacheName) => cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
              .map((cacheName) => caches.delete(cacheName)),
          )
        }),
      self.clients.claim(),
    ]),
  )
})

self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Serve from cache or offline page
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            // Return offline page for navigation requests
            return caches.match("/offline")
          })
        }),
    )
    return
  }

  // Handle API requests
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok && request.method === "GET") {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Serve from cache for GET requests
          if (request.method === "GET") {
            return caches.match(request)
          }
          // Return error response for non-GET requests
          return new Response(
            JSON.stringify({
              error: "Network unavailable",
              offline: true,
            }),
            {
              status: 503,
              headers: { "Content-Type": "application/json" },
            },
          )
        }),
    )
    return
  }

  // Handle static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request).then((response) => {
        // Cache successful responses
        if (response.ok) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
        }
        return response
      })
    }),
  )
})

// Handle background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Process queued offline actions
      processOfflineActions(),
    )
  }
})

async function processOfflineActions() {
  // Implementation for processing offline actions
  // This would sync with IndexedDB and send queued requests
  console.log("Processing offline actions...")
}

// Handle push notifications
self.addEventListener("push", (event: PushEvent) => {
  if (event.data) {
    const data = event.data.json()

    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/images/yanyu-cloud-logo.png",
        badge: "/images/yanyu-cloud-logo.png",
        data: data.data,
        actions: data.actions || [],
      }),
    )
  }
})

// Handle notification clicks
self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close()

  if (event.action) {
    // Handle action button clicks
    handleNotificationAction(event.action, event.notification.data)
  } else {
    // Handle notification click
    event.waitUntil(self.clients.openWindow(event.notification.data?.url || "/"))
  }
})

function handleNotificationAction(action: string, data: any) {
  switch (action) {
    case "view":
      self.clients.openWindow(data?.url || "/")
      break
    case "dismiss":
      // Just close the notification
      break
    default:
      self.clients.openWindow("/")
  }
}

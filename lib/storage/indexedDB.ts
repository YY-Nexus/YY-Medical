/**
 * IndexedDB 工具函数
 * 提供对 IndexedDB 的简化访问和类型支持
 */

// 数据库配置
const DB_NAME = "MediNexusDB"
const DB_VERSION = 1

// 存储对象配置
export enum StoreNames {
  PATIENTS = "patients",
  MEDICAL_RECORDS = "medicalRecords",
  IMAGES = "medicalImages",
  USER_PREFERENCES = "userPreferences",
  OFFLINE_ACTIONS = "offlineActions",
}

// 打开数据库连接
export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      reject(new Error("打开数据库失败"))
    }

    request.onsuccess = (event) => {
      resolve(request.result)
    }

    request.onupgradeneeded = (event) => {
      const db = request.result

      // 创建存储对象
      if (!db.objectStoreNames.contains(StoreNames.PATIENTS)) {
        db.createObjectStore(StoreNames.PATIENTS, { keyPath: "id" })
      }

      if (!db.objectStoreNames.contains(StoreNames.MEDICAL_RECORDS)) {
        const store = db.createObjectStore(StoreNames.MEDICAL_RECORDS, { keyPath: "id" })
        // 创建索引以便按患者ID查询
        store.createIndex("patientId", "patientId", { unique: false })
      }

      if (!db.objectStoreNames.contains(StoreNames.IMAGES)) {
        const store = db.createObjectStore(StoreNames.IMAGES, { keyPath: "id" })
        // 创建索引以便按记录ID查询
        store.createIndex("recordId", "recordId", { unique: false })
        // 创建索引以便按患者ID查询
        store.createIndex("patientId", "patientId", { unique: false })
      }

      if (!db.objectStoreNames.contains(StoreNames.USER_PREFERENCES)) {
        db.createObjectStore(StoreNames.USER_PREFERENCES, { keyPath: "id" })
      }

      if (!db.objectStoreNames.contains(StoreNames.OFFLINE_ACTIONS)) {
        const store = db.createObjectStore(StoreNames.OFFLINE_ACTIONS, {
          keyPath: "id",
          autoIncrement: true,
        })
        // 创建索引以便按状态查询
        store.createIndex("status", "status", { unique: false })
        // 创建索引以便按时间戳查询
        store.createIndex("timestamp", "timestamp", { unique: false })
      }
    }
  })
}

// 添加数据
export async function addItem<T>(storeName: StoreNames, item: T): Promise<T> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)
    const request = store.add(item)

    request.onsuccess = () => {
      resolve(item)
    }

    request.onerror = () => {
      reject(new Error(`添加数据到 ${storeName} 失败`))
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

// 更新数据
export async function updateItem<T>(storeName: StoreNames, item: T): Promise<T> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)
    const request = store.put(item)

    request.onsuccess = () => {
      resolve(item)
    }

    request.onerror = () => {
      reject(new Error(`更新 ${storeName} 中的数据失败`))
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

// 获取数据
export async function getItem<T>(storeName: StoreNames, id: string | number): Promise<T | null> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)
    const request = store.get(id)

    request.onsuccess = () => {
      resolve(request.result || null)
    }

    request.onerror = () => {
      reject(new Error(`从 ${storeName} 获取数据失败`))
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

// 删除数据
export async function deleteItem(storeName: StoreNames, id: string | number): Promise<void> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)
    const request = store.delete(id)

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = () => {
      reject(new Error(`从 ${storeName} 删除数据失败`))
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

// 获取所有数据
export async function getAllItems<T>(storeName: StoreNames): Promise<T[]> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)
    const request = store.getAll()

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(new Error(`从 ${storeName} 获取所有数据失败`))
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

// 使用索引查询数据
export async function getItemsByIndex<T>(
  storeName: StoreNames,
  indexName: string,
  value: string | number,
): Promise<T[]> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)
    const index = store.index(indexName)
    const request = index.getAll(value)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(new Error(`使用索引 ${indexName} 从 ${storeName} 获取数据失败`))
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

// 清空存储对象
export async function clearStore(storeName: StoreNames): Promise<void> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)
    const request = store.clear()

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = () => {
      reject(new Error(`清空 ${storeName} 失败`))
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

// 计算存储对象中的项目数量
export async function countItems(storeName: StoreNames): Promise<number> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)
    const request = store.count()

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(new Error(`计算 ${storeName} 中的项目数量失败`))
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

// 检查 IndexedDB 是否可用
export function isIndexedDBAvailable(): boolean {
  return !!window.indexedDB
}

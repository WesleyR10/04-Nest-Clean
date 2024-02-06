export abstract class CacheRepository {
  abstract set(key: string, value: string): Promise<void>
  abstract get(key: string): Promise<void>
abstract delete(key: string): Promise<void> // Invalidação de cache - Caso Usuario altere alguma informação crucial eu posso invalidar o cache
}
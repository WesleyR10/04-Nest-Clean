export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string> // O payload vem da autenticação e retorna um token
}
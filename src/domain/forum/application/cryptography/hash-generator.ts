export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string> // Converte a senha em hash
}
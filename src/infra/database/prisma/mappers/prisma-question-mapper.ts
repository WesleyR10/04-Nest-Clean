import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question { // Método estático para nao precisar instanciar a classe
    return Question.create( // Utilizando o método de criar a camada de DOMAIN 
      { // Mas não estou criando uma question e sim apenas um referência
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.bestAnswerId) : null,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id), // Como passei o Id, o método create vai entender que é uma entidade existente
    )
  }
}
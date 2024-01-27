import { DomainEvents } from '@/core/events/domain-events'
import { DomainEvent } from '../events/domain-event'
import { Entity } from './entity'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void { // Adiciona um evento ao array de eventos
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this) // Marca o aggregate para ser disparado, mas ele só será disparado quando o método dispatchAggregateEvents for chamado
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
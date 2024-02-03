export abstract class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public equals(vo: ValueObject<unknown>) {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.props === undefined) {
      return false
    }

    return JSON.stringify(vo.props) === JSON.stringify(this.props) // Comparo uma value Object com outra de acordo com os valores de suas propriedades
    // Colocou em json para comparar os valores de cada propriedade se não iria comparar a referência de memória
  }
}
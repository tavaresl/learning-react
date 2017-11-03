import PubSub from 'pubsub-js'

export default class TratadorErros {
  publica(erros) {
    console.log(erros)
    erros.errors.forEach(erro => PubSub.publish('erro-validacao', erro))
  }
}
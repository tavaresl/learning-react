import React, { Component } from 'react'
import $ from 'jquery'
import PubSub from 'pubsub-js'
import InputCustomizado from './componentes/InputCustomizado'
import BotaoEnviarCustomizado from './componentes/BotaoEnviarCustomizado'
import TratadorErros from './TratadorErros'

class FormularioAutor extends Component {
  constructor() {
    super()
    this.state = { nome: '', email: '', senha: '' }
  }

  createAuthor(event) {
    event.preventDefault()

    $.ajax({
      url: 'http://localhost:8080/api/autores',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
      success: res => {
        PubSub.publish('autor-cadastrado', res)
        this.setState({ nome: '', email: '', senha: '' })
      },
      error: res => {
        if (res.status === 400) {
          new TratadorErros().publica(res.responseJSON)
        }
      },
      beforeSend: () => PubSub.publish('campos-resetados')
    })
  }
  
  setNome(event) {
    this.setState({ nome: event.target.value })
  }
  
  setEmail(event) {
    this.setState({ email: event.target.value })
  }
    
  setSenha(event) {
    this.setState({ senha: event.target.value })
  }
  
  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={ this.createAuthor.bind(this) }>
          <InputCustomizado id="nome" label="Nome" type="text" name="nome" value={ this.state.nome } onChange={ this.setNome.bind(this) } />
          <InputCustomizado id="email" label="Email" type="email" name="email" value={ this.state.email } onChange={ this.setEmail.bind(this) } />
          <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={ this.state.senha } onChange={ this.setSenha.bind(this) } />
          <BotaoEnviarCustomizado text="Gravar" />
        </form>
      </div>
    )
  }
}

class TabelaAutores extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.autores.map(autor => 
                <tr key={ autor.id }>
                  <td>{ autor.nome }</td>
                  <td>{ autor.email }</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default class AutorBox extends Component {
  constructor() {
    super()
    this.state = { autores: [] }
  }
  
  componentDidMount() {
    $.ajax({
      url: 'http://localhost:8080/api/autores',
      dataType: 'json',
      success: res => this.setState({ autores: res })
    })

    PubSub.subscribe('autor-cadastrado', (topico, autores) => {
      this.setState({ autores })
    })
  }

  render() {
    return (
      <div>
        <FormularioAutor />
        <TabelaAutores autores={ this.state.autores } />
      </div>
    )
  }
}

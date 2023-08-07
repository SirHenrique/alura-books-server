const fs = require("fs");
const { getTodosLivros, getLivroPorId, postLivroNovo, modificaLivro, removeLivro } = require("../servicos/livros");

function getLivros(req, res) {
  try {
    const livros = getTodosLivros();
    res.send(livros);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function getLivro(req, res) {
  try {
    const id = req.params.id;

    if(id && Number(id)) {
      const livro = getLivroPorId(id);
      res.send(livro);
    } else {
      res.status(422)
      res.send('Favor informar um ID correto!')
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    if(req.body.nome) {
      postLivroNovo(livroNovo);
  
      res.status(201)
      res.send("Livro inserido com sucesso")
    }
    else {
      res.status(422)
      res.send("campo nome é obrigatório!")
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function patchLivro(req, res) {
  try{
    const id = req.params.id
    if(id && Number(id)){
      const body = req.body
      modificaLivro(body,id);
  
      res.send("Livro alterado com sucesso");
    } else {
      res.status(422)
      res.send('Favor informar um ID correto!')
    }
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}

function deleteLivro(req,res) {
  try{
    const id = req.params.id
    if(id && Number(id)){
      removeLivro(id)
      res.send("Livro deletado com sucesso");
    }
    else {
      res.status(422)
      res.send('Favor informar um ID correto!')
    }
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deleteLivro
};

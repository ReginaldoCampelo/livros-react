/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ControleEditora } from "./controle/ControleEditora";
import { ControleLivro } from "./controle/ControleLivros";

function LivroLista() {
  const controleLivro = new ControleLivro();
  const [livros, setLivros] = useState([]);
  const [atualizar, setAtualizar] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLivros(controleLivro.obterLivros());
  }, [atualizar]);

  const handleExcluir = (codigoLivro) => {
    controleLivro.excluir(codigoLivro);
    toast.success("Livro removido com sucesso!");
    setAtualizar((atualizar) => atualizar + 1);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Livros</h1>
        <button className="btn btn-primary" onClick={() => navigate("/dados")}>
          Cadastrar Livro
        </button>{" "}
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Título</th>
            <th>Editora</th>
            <th>Resumo</th>
            <th>Autores</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
              handleExcluir={handleExcluir}
            />
          ))}
        </tbody>
      </table>
      <ToastContainer /> {}
    </div>
  );
}

function LinhaLivro({ livro, handleExcluir }) {
  const controleEditora = new ControleEditora();
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{nomeEditora}</td>
      <td>{livro.resumo}</td>
      <td>{livro.autores.join(", ")}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleExcluir(livro.codigo)}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

export default LivroLista;

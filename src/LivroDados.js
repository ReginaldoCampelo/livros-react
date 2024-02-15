/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ControleEditora } from "./controle/ControleEditora";
import { ControleLivro } from "./controle/ControleLivros";

function LivroDados() {
  const controleLivro = new ControleLivro();
  const controleEditora = new ControleEditora();

  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState(1);
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    setOpcoes(
      controleEditora.getEditoras().map((editora) => ({
        value: editora.codEditora,
        text: editora.nome,
      }))
    );
  }, []);

  const navigate = useNavigate();

  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const novoLivro = {
      codigo: 0,
      codEditora: codEditora,
      titulo: titulo,
      resumo: resumo,
      autores: autores.split(",").map((item) => item.trim()),
    };
    controleLivro.incluir(novoLivro);
    toast.success("Livro cadastrado com sucesso!");

    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  return (
    <div className="container mt-5">
      <h1>Cadastro de Livro</h1>
      <form onSubmit={incluir} className="mt-4">
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumo">Resumo:</label>
          <textarea
            className="form-control"
            id="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="autores">Autores (separados por vírgula):</label>
          <input
            type="text"
            className="form-control"
            id="autores"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="editora">Editora:</label>
          <select
            className="form-control"
            id="editora"
            value={codEditora}
            onChange={tratarCombo}
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LivroDados;

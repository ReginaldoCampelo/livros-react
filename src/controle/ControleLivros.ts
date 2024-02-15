import { Livro } from "../modelo/Livro";

let livros: Array<Livro> = [
  {
    codigo: 1,
    codEditora: 1,
    titulo: "Livro 1",
    resumo: "Resumo do livro 1",
    autores: ["Autor 1", "Autor 2"],
  },
  {
    codigo: 2,
    codEditora: 2,
    titulo: "Livro 2",
    resumo: "Resumo do livro 2",
    autores: ["Autor 3", "Autor 4"],
  },
  {
    codigo: 3,
    codEditora: 3,
    titulo: "Livro 3",
    resumo: "Resumo do livro 3",
    autores: ["Autor 5", "Autor 6"],
  },
];

export class ControleLivro {
  obterLivros(): Array<Livro> {
    return livros;
  }

  incluir(livro: Livro): void {
    const codigoMaisAlto = Math.max(...livros.map((l) => l.codigo), 0);
    livro.codigo = codigoMaisAlto + 1;
    livros.push(livro);
  }

  excluir(codigo: number): void {
    const index = livros.findIndex((l) => l.codigo === codigo);
    if (index !== -1) {
      livros.splice(index, 1);
    }
  }
}

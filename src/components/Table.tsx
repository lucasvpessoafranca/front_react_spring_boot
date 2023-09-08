import React from "react";

export type Produtos = {
  id: number;
  name: string;
  brand: string;
};

type Props = {
  produtos: Produtos[];
  selecionarProduto: (indice: number) => void;
};

export function Table({ produtos, selecionarProduto }: Props) {
  return (
    <div className="max-w-7xl mx-auto p-3">
      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Nome</th>
            <th className="p-2">Marca</th>
            <th className="p-2">Selecionar</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {produtos.map((produto, indice) => (
            <tr key={indice}>
              <td className="">{indice+1}</td>
              <td className="p-4">{produto.name}</td>
              <td className="p-4">{produto.brand}</td>
              <td className="p-4">
                <button className="bg-cyan-800 text-white p-2 rounded-md" onClick={() => selecionarProduto(indice)}>
                  Selecionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

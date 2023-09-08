import React, { useEffect, useState } from "react";
import { Table } from "./components/Table";
import { Form } from "./components/Form";

type Produtos = {
  id: number;
  name: string;
  brand: string;
};

export function App() {
  const produto: Produtos = {
    id: 0,
    name: "",
    brand: ""
  };

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(() => {
    fetch("http://localhost:8080/listAll")
      .then((r) => r.json())
      .then((data) => setProdutos(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleChangeProducts(e: React.ChangeEvent<HTMLInputElement>) {
    setObjProduto({
      ...objProduto,
      [e.target.name]: e.target.value
    });
  }

  function AddProducts() {
    fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((r) => r.json())
      .then((response: Produtos | { message: string }) => {
        if ("message" in response) {
          alert(response.message);
        } else {
          const newProduct = response as Produtos;
          setProdutos([...produtos, newProduct]);
          alert("Produto Cadastrado com sucesso.")
          clearForm()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function removeProduct() {
    fetch(`http://localhost:8080/remove/${objProduto.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((r) => r.json())
      .then((response) => {
        alert(response.message);
  
        // Cria uma nova lista de produtos excluindo o produto removido
        const newProducts = produtos.filter((produto) => produto.id !== objProduto.id);
        
        // Atualiza o estado dos produtos com a nova lista
        setProdutos(newProducts);
        clearForm()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateProducts() {
    fetch("http://localhost:8080/update ", {
      method: "PUT",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((r) => r.json())
      .then(response => {
        if(response.message !== undefined) {
          alert(response.message)
        } else {
          alert("Produto alterado com sucesso !")
       
          let vetorTemp = [...produtos]
          let indice = vetorTemp.findIndex((p)=> {
            return p.id === objProduto.id
          })
          vetorTemp[indice] = objProduto
          setProdutos(vetorTemp)
          clearForm();


        }
      })
  }


  function clearForm() {
    setObjProduto(produto);
    setBtnCadastrar(true)
  }

  function selecionarProduto(indice:number) {
    setObjProduto(produtos[indice])
    setBtnCadastrar(false)
  } 
  return (
    <div>
      <p>{JSON.stringify(objProduto)}</p>
      <Form
        btnCadastrar={btnCadastrar}
        handleChange={handleChangeProducts}
        handleAddProducts={AddProducts}
        obj={objProduto}
        clearForm={clearForm}
        removeProduct={removeProduct}
        updateProducts={updateProducts}
       
      />
      <Table produtos={produtos}  selecionarProduto={selecionarProduto} />
    </div>
  );
}

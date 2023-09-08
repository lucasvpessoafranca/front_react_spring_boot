import { Produtos } from "./Table";

type Props = {
    btnCadastrar: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddProducts: () => void
    obj:Produtos
    clearForm: () => void
    removeProduct: () => void;
    updateProducts: ()=> void
  };
  
  export function Form({ btnCadastrar, handleChange, handleAddProducts, obj, clearForm,  removeProduct, updateProducts }: Props) {
    return (
      <div className="flex justify-center">
        <form className="w-96- p-7  border-cyan-950   rounded-full">
          <input value={obj.name}
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="Nome"
            className="w-full p-3 mb-3 border rounded border-cyan-950"
          />
          <input
          value={obj.brand}
            type="text"
            onChange={handleChange}
            name="brand"
            placeholder="Marca"
            className="w-full p-3 mb-3 border rounded border-cyan-950"
          />
  
          {btnCadastrar ? (
            <input onClick={handleAddProducts}
              type="button"
              value="Cadastrar"
              className="bg-cyan-950 text-white p-3 rounded-md m-2"
            />
          ) : (
            <div className="p-5 mr-6 flex justify-center">
              <input
                type="button"
                value="Alterar "
                onClick={updateProducts}
                className="bg-yellow-500 text-black p-3 rounded-md m-2"
              />
              <input
              onClick={ removeProduct}
                type="button"
                value="Remover "
                className="bg-red-600 text-white p-3 rounded-md m-2"
              />
              <input 
              onClick={clearForm}
                type="button"
                value="Cancelar"
                className="bg-orange-700 text-white p-3 rounded-md m-2"
              />
            </div>
          )}
        </form>
      </div>
    );
  }
  
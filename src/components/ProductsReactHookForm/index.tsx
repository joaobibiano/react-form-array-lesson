import { useFieldArray, useForm } from "react-hook-form";

interface IProduct {
  code: string;
  description: string;
  price?: number;
}

type FormValues = {
  products: IProduct[];
};

export const ProductReactHookForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    delayError: 500,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  console.log("errors", errors);

  const add = () => {
    append({
      code: "",
      description: "",
      price: undefined,
    });
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {fields.map((product, index) => (
          <div key={product.id} className="row">
            {index + 1}
            <input
              type="text"
              placeholder="Code"
              {...register(`products.${index}.code`, {
                required: "Por favor, preencha o campo code",
              })}
            />

            <input
              type="text"
              placeholder="Description"
              {...register(`products.${index}.description`)}
            />

            <input
              type="text"
              placeholder="Price"
              {...register(`products.${index}.price`)}
            />

            <button onClick={() => remove(index)} className="delete">
              Delete
            </button>
          </div>
        ))}
        <button type="submit">ENVIAR</button>
      </form>
      <button onClick={add} className="add">
        Add
      </button>
      <pre>
        <code>{JSON.stringify(fields, null, 2)}</code>
      </pre>
    </div>
  );
};

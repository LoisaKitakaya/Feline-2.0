/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ButtonSpinner from "../spinner/ButtonSpinner";
import ProductCategory from "../recurring/ProductCategory";
import ProductSubCategory from "../recurring/ProductSubCategory";
import { CREATE_PRODUCT, GET_ALL_PRODUCTS } from "../../schema";
import { setNewNotification, clearOldNotification } from "../../redux/toast";

const AddProduct = ({ account_id }) => {
  const dispatch = useDispatch();

  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  const [createProduct, { loading, data, error }] = useMutation(
    CREATE_PRODUCT,
    {
      refetchQueries: [
        {
          query: GET_ALL_PRODUCTS,
          variables: { account_id: account_id },
        },
      ],
    }
  );

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Product created successfully",
      })
    );
  }

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        dispatch(clearOldNotification());

        createProduct({
          variables: {
            account_id: account_id,
            name: e.target.name.value,
            description: e.target.description.value,
            category: parent,
            sub_category: child,
            buying_price: e.target.buying_price.value,
            selling_price: e.target.selling_price.value,
            current_stock_level: e.target.current_stock_level.value,
            units_sold: e.target.units_sold.value,
            supplier_name: e.target.supplier_name.value,
          },
        });

        e.target.reset();
      }}
    >
      <div className="mb-4">
        <label className="block">
          <span>Product name</span>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Product description</span>
          <textarea
            cols="30"
            rows="10"
            name="description"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </label>
      </div>
      <ProductCategory setParent={setParent} />
      {parent && <ProductSubCategory parent={parent} setChild={setChild} />}
      <div className="mb-4">
        <label className="block">
          <span>Product buying price</span>
          <input
            type="number"
            name="buying_price"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Product selling price</span>
          <input
            type="number"
            name="selling_price"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Current stock level</span>
          <input
            type="number"
            name="current_stock_level"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Units sold</span>
          <input
            type="number"
            name="units_sold"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Supplier name</span>
          <input
            type="text"
            name="supplier_name"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mt-8 mb-4">
        <button
          type="submit"
          className="w-full rounded-md border py-2 px-4 bg-emerald-500 hover:bg-emerald-600"
        >
          {loading ? <ButtonSpinner /> : <span>Submit</span>}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;

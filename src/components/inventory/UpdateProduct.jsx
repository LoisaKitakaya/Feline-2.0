/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ButtonSpinner from "../spinner/ButtonSpinner";
import ProductCategory from "../recurring/ProductCategory";
import ProductSubCategory from "../recurring/ProductSubCategory";
import { UPDATE_PRODUCT, GET_ALL_PRODUCTS } from "../../schema";
import { setNewNotification, clearOldNotification } from "../../redux/toast";

const UpdateProduct = ({ account_id, id }) => {
  const dispatch = useDispatch();

  const [child, setChild] = useState(null);
  const [parent, setParent] = useState(null);

  const [name, setName] = useState("");
  const [unitsSold, setUnitsSold] = useState(null);
  const [description, setDescription] = useState("");
  const [buyingPrice, setBuyingPrice] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [reorderLevel, setReorderLevel] = useState(null);
  const [supplierName, setSupplierName] = useState("");
  const [supplerEmail, setSupplierEmail] = useState("");
  const [currentStockLevel, setCurrentStockLevel] = useState(null);
  const [supplierPhoneNumber, setSupplierPhoneNumber] = useState("");

  const [updateProduct, { loading, data, error }] = useMutation(
    UPDATE_PRODUCT,
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
        message: "Product updated successfully",
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

        updateProduct({
          variables: {
            id: id,
            name: name,
            description: description,
            category: parent ? parent : "",
            sub_category: child ? child : "",
            buying_price: buyingPrice ? parseFloat(buyingPrice) : "",
            selling_price: sellingPrice ? parseFloat(sellingPrice) : "",
            current_stock_level: currentStockLevel
              ? parseInt(currentStockLevel)
              : "",
            units_sold: unitsSold ? parseInt(unitsSold) : "",
            reorder_level: reorderLevel ? parseInt(reorderLevel) : "",
            supplier_name: supplierName,
            supplier_phone_number: supplierPhoneNumber,
            supplier_email: supplerEmail,
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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setBuyingPrice(e.target.value)}
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
            onChange={(e) => setSellingPrice(e.target.value)}
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
            onChange={(e) => setCurrentStockLevel(e.target.value)}
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
            onChange={(e) => setUnitsSold(e.target.value)}
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Reorder level</span>
          <input
            type="number"
            name="reorder_level"
            onChange={(e) => setReorderLevel(e.target.value)}
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
            onChange={(e) => setSupplierName(e.target.value)}
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Supplier phone number</span>
          <input
            type="text"
            name="supplier_phone_number"
            onChange={(e) => setSupplierPhoneNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Supplier email</span>
          <input
            type="text"
            name="supplier_email"
            onChange={(e) => setSupplierEmail(e.target.value)}
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

export default UpdateProduct;

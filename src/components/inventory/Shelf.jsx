/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../modal/Modal";
import AddProduct from "./AddProduct";
import { useQuery } from "@apollo/client";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import InventoryTable from "./InventoryTable";
import { GET_ALL_PRODUCTS } from "../../schema";
import { useDispatch, useSelector } from "react-redux";
import InventoryCharts from "../charts2/InventoryCharts";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { setNewNotification } from "../../redux/toast";
import { toggleFilter } from "../../redux/filter";

const Shelf = ({ account_id }) => {
  const dispatch = useDispatch();

  const showFilter = useSelector((state) => state.filter.showFilter);

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      account_id: account_id,
    },
  });

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold">Your inventory</h4>
        <div className="flex justify-end items-center">
          {showFilter ? (
            <button
              className="rounded-md border py-2 px-4 font-bold"
              onClick={() => dispatch(toggleFilter())}
            >
              <i className="bi bi-funnel-fill"></i> Filter
            </button>
          ) : (
            <button
              className="rounded-md border py-2 px-4"
              onClick={() => dispatch(toggleFilter())}
            >
              <i className="bi bi-funnel"></i> Filter
            </button>
          )}
          <div className="mx-2"></div>
          <button
            className="rounded-md border py-2 px-4"
            onClick={() => setShowCreate(true)}
          >
            <i className="bi bi-plus-lg"></i> New Product
          </button>
          <div className="mx-2"></div>
          <button
            className="rounded-md border py-2 px-4"
            onClick={() => setShowUpdate(true)}
            disabled={!selectedRow}
          >
            <i className="bi bi-pencil"></i> Update Product
          </button>
          <div className="mx-2"></div>
          <button
            className="rounded-md border py-2 px-4"
            onClick={() => setConfirmDelete(true)}
            disabled={!selectedRow}
          >
            <i className="bi bi-trash"></i> Delete Product
          </button>
        </div>
      </div>
      <InventoryTable
        tableData={data.getAllProducts}
        setSelectedRow={setSelectedRow}
      />
      {data.getAllProducts.length !== 0 ? (
        <>
          <hr className="my-4" />
          <InventoryCharts inventoryData={data.getAllProducts} />
        </>
      ) : (
        <></>
      )}

      {/* modals */}
      <Modal
        visible={showCreate}
        setVisible={setShowCreate}
        title={"Create new product"}
        element={<AddProduct account_id={account_id} />}
      />
      <Modal
        visible={showUpdate}
        setVisible={setShowUpdate}
        title={"Update product"}
        element={<UpdateProduct account_id={account_id} id={selectedRow} />}
      />
      <Modal
        visible={confirmDelete}
        setVisible={setConfirmDelete}
        title={"Delete product"}
        element={
          <DeleteProduct
            account_id={account_id}
            id={selectedRow}
            confirmDelete={setConfirmDelete}
          />
        }
      />
      {/* modals */}
    </>
  );
};

export default Shelf;

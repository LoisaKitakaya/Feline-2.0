/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../modal/Modal";
import { useQuery } from "@apollo/client";
import NewTransaction from "./NewTransaction";
import TransactionTable from "./TransactionTable";
import { useDispatch } from "react-redux";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { setNewNotification } from "../../redux/toast";
import { GET_ALL_ACCOUNT_TRANSACTIONS } from "../../schema";
import UpdateTransaction from "./UpdateTransaction";
import DeleteTransaction from "./DeleteTransaction";
import TransactionCharts from "../charts/TransactionCharts";

const Transactions = ({ account_id }) => {
  const dispatch = useDispatch();

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const { loading, data, error } = useQuery(GET_ALL_ACCOUNT_TRANSACTIONS, {
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
        <h4 className="text-xl font-semibold">Account transactions</h4>
        <div className="flex justify-end items-center">
          <div className="mx-2"></div>
          <button
            className="rounded-md border py-2 px-4"
            onClick={() => setShowCreate(true)}
          >
            <i className="bi bi-plus-lg"></i> New Transaction
          </button>
          <div className="mx-2"></div>
          <button
            className="rounded-md border py-2 px-4"
            onClick={() => setShowUpdate(true)}
          >
            <i className="bi bi-pencil"></i> Update Transaction
          </button>
          <div className="mx-2"></div>
          <button
            className="rounded-md border py-2 px-4"
            onClick={() => setConfirmDelete(true)}
          >
            <i className="bi bi-trash"></i> Delete Transaction
          </button>
        </div>
      </div>
      <TransactionTable
        tableData={data.getAllTransactions}
        setSelectedRow={setSelectedRow}
      />
      {data.getAllTransactions.length !== 0 ? (
        <>
          <hr className="my-4" />
          <TransactionCharts chartData={data.getAllTransactions} />
        </>
      ) : (
        <></>
      )}

      {/* modals */}
      <Modal
        visible={showCreate}
        setVisible={setShowCreate}
        title={"Create new transaction"}
        element={<NewTransaction account_id={account_id} />}
      />
      <Modal
        visible={showUpdate}
        setVisible={setShowUpdate}
        title={"Update transaction"}
        element={<UpdateTransaction account_id={account_id} id={selectedRow} />}
      />
      <Modal
        visible={confirmDelete}
        setVisible={setConfirmDelete}
        title={"Delete transaction"}
        element={
          <DeleteTransaction
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

export default Transactions;

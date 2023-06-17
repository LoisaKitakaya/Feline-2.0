/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { setNewNotification, clearOldNotification } from "../../redux/toast";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { useState } from "react";
import {
  GET_ALL_BALANCE_SHEET_STATEMENTS,
  GENERATE_BALANCE_SHEET_STATEMENT,
} from "../../schema";

const GenerateBalanceSheetReport = ({ account_id }) => {
  const dispatch = useDispatch();

  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [equity, setEquity] = useState([]);

  const [generateBalanceSheetReport, { data, error, loading }] = useMutation(
    GENERATE_BALANCE_SHEET_STATEMENT,
    {
      refetchQueries: [
        {
          query: GET_ALL_BALANCE_SHEET_STATEMENTS,
          variables: { account_id: account_id },
        },
      ],
    }
  );

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Report created successfully",
      })
    );
  }

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  const handleSubmit = () => {
    dispatch(clearOldNotification());

    generateBalanceSheetReport({
      variables: {
        account_id: account_id,
        assets: assets,
        liabilities: liabilities,
        equity: equity,
      },
    });
  };

  return (
    <>
      <div>
        <span className="underline">Assets:</span>
        <br />
        {assets.length !== 0 ? (
          <>
            {assets.map((asset, index) => {
              const assetElement = (
                <span key={index}>
                  Item: {asset.item} | Net worth: {asset.net_worth}
                  <br />
                </span>
              );

              return assetElement;
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        <span className="underline">Liabilities:</span>
        <br />
        {liabilities.length !== 0 ? (
          <>
            {liabilities.map((liability, index) => {
              const liabilityElement = (
                <span key={index}>
                  Item: {liability.item} | Net worth: {liability.net_worth}
                  <br />
                </span>
              );

              return liabilityElement;
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        <span className="underline">Equity:</span>
        <br />
        {equity.length !== 0 ? (
          <>
            {equity.map((eq, index) => {
              const equityElement = (
                <span key={index}>
                  Item: {eq.item} | Net worth: {eq.net_worth}
                  <br />
                </span>
              );

              return equityElement;
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      <hr className="my-4" />
      <form
        className="border-b mb-4"
        onSubmit={(e) => {
          e.preventDefault();

          const newAssets = {
            item: e.target.item.value,
            net_worth: e.target.net_worth.value,
          };

          setAssets([...assets, newAssets]);

          e.target.reset();
        }}
      >
        <h6 className="mb-2">Assets</h6>
        <div className="mb-4">
          <label className="block">
            <span>Item</span>
            <input
              type="text"
              name="item"
              className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            <span>Net worth</span>
            <input
              type="number"
              name="net_worth"
              className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="mt-8 mb-4">
          <button
            type="submit"
            className="w-full rounded-md border py-2 px-4 bg-sky-500 hover:bg-sky-600"
          >
            Add asset
          </button>
        </div>
      </form>
      <form
        className="border-b mb-4"
        onSubmit={(e) => {
          e.preventDefault();

          const newLiabilities = {
            item: e.target.item.value,
            net_worth: e.target.net_worth.value,
          };

          setLiabilities([...liabilities, newLiabilities]);

          e.target.reset();
        }}
      >
        <h6 className="mb-2">Liabilities</h6>
        <div className="mb-4">
          <label className="block">
            <span>Item</span>
            <input
              type="text"
              name="item"
              className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            <span>Net worth</span>
            <input
              type="number"
              name="net_worth"
              className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="mt-8 mb-4">
          <button
            type="submit"
            className="w-full rounded-md border py-2 px-4 bg-sky-500 hover:bg-sky-600"
          >
            Add liability
          </button>
        </div>
      </form>
      <form
        className="border-b mb-4"
        onSubmit={(e) => {
          e.preventDefault();

          const newEquity = {
            item: e.target.item.value,
            net_worth: e.target.net_worth.value,
          };

          setEquity([...equity, newEquity]);

          e.target.reset();
        }}
      >
        <h6 className="mb-2">Equity</h6>
        <div className="mb-4">
          <label className="block">
            <span>Item</span>
            <input
              type="text"
              name="item"
              className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            <span>Net worth</span>
            <input
              type="number"
              name="net_worth"
              className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="mt-8 mb-4">
          <button
            type="submit"
            className="w-full rounded-md border py-2 px-4 bg-sky-500 hover:bg-sky-600"
          >
            Add equity
          </button>
        </div>
      </form>
      <div className="mt-8 mb-4">
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="w-full rounded-md border py-2 px-4 bg-emerald-500 hover:bg-emerald-600"
        >
          {loading ? <ButtonSpinner /> : <span>Submit</span>}
        </button>
      </div>
    </>
  );
};

export default GenerateBalanceSheetReport;

/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";
import { useMemo } from "react";
import Tables from "../table/Tables";
import { FilterFn, ColumnDef } from "@tanstack/react-table";
import { RankingInfo } from "@tanstack/match-sorter-utils";

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const TransactionTable = ({ tableData }) => {
  const columns = React.useMemo<ColumnDef<any>[]>(() => [], []);

  const data = useMemo(
    () =>
      tableData.map((transaction: any) => {
        return {
          id: transaction.id,
          transaction_type: transaction.transaction_type.type_name,
          transaction_amount: transaction.transaction_amount,
          currency_code: transaction.currency_code,
          description: transaction.description,
          transaction_date: moment
            .unix(transaction.transaction_date)
            .format("MMMM Do YYYY, h:mm:ss a"),
          transaction_category: transaction.category.category_name,
          transaction_sub_category: transaction.sub_category.category_name,
          created_at: moment.unix(transaction.created_at).fromNow(),
          updated_at: moment.unix(transaction.updated_at).fromNow(),
        };
      }),
    [tableData]
  );

  return (
    <>
      {tableData.length !== 0 ? (
        <Tables data={data} columns={columns} />
      ) : (
        <>
          <div className="my-20 text-center">
            <h4 className="font-semibold text-2xl">
              You have not added any transactions yet.
            </h4>
          </div>
        </>
      )}
    </>
  );
};

export default TransactionTable;

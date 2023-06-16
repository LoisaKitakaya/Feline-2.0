/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";
import { useMemo } from "react";
import Tables from "../table/Tables";
import { FilterFn, ColumnDef } from "@tanstack/react-table";
import { RankingInfo } from "@tanstack/match-sorter-utils";
import IndeterminateCheckbox from "../table/CheckBox";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const TransactionTable = ({ tableData, setSelectedRow }) => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        header: "Transaction type",
        accessorKey: "transaction_type",
        footer: (props) => props.column.id,
      },
      {
        header: "Transaction amount",
        accessorKey: "transaction_amount",
        footer: (props) => props.column.id,
      },
      {
        header: "Currency code",
        accessorKey: "currency_code",
        footer: (props) => props.column.id,
      },
      {
        header: "Description",
        accessorKey: "description",
        footer: (props) => props.column.id,
      },
      {
        header: "Transaction date",
        accessorKey: "transaction_date",
        footer: (props) => props.column.id,
      },
      {
        header: "Transaction category",
        accessorKey: "transaction_category",
        footer: (props) => props.column.id,
      },
      {
        header: "Transaction subcategory",
        accessorKey: "transaction_sub_category",
        footer: (props) => props.column.id,
      },
      {
        header: "Created at",
        accessorKey: "created_at",
        footer: (props) => props.column.id,
      },
      {
        header: "Updated at",
        accessorKey: "updated_at",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

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
        <Tables data={data} columns={columns} setSelectedRow={setSelectedRow} />
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

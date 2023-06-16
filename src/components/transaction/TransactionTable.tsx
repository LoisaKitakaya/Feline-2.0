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
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: "Product name",
        accessorKey: "transaction_type",
        footer: (props) => props.column.id,
      },
      {
        header: "Product description",
        accessorKey: "transaction_amount",
        footer: (props) => props.column.id,
      },
      {
        header: "Category",
        accessorKey: "currency_code",
        footer: (props) => props.column.id,
      },
      {
        header: "Sub-category",
        accessorKey: "description",
        footer: (props) => props.column.id,
      },
      {
        header: "Buying price",
        accessorKey: "transaction_date",
        footer: (props) => props.column.id,
      },
      {
        header: "Selling price",
        accessorKey: "transaction_sub_category",
        footer: (props) => props.column.id,
      },
      {
        header: "Current stock level",
        accessorKey: "created_at",
        footer: (props) => props.column.id,
      },
      {
        header: "Units sold",
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

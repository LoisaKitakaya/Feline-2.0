/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";
import { useMemo } from "react";
import Tables from "../table/Tables";
import { FilterFn, ColumnDef } from "@tanstack/react-table";
import { RankingInfo } from "@tanstack/match-sorter-utils";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const InventoryTable = ({ tableData }) => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Product name",
        accessorKey: "name",
        footer: (props) => props.column.id,
      },
      {
        header: "Product description",
        accessorKey: "description",
        footer: (props) => props.column.id,
      },
      {
        header: "Category",
        accessorKey: "product_category",
        footer: (props) => props.column.id,
      },
      {
        header: "Sub-category",
        accessorKey: "product_sub_category",
        footer: (props) => props.column.id,
      },
      {
        header: "Buying price",
        accessorKey: "buying_price",
        footer: (props) => props.column.id,
      },
      {
        header: "Selling price",
        accessorKey: "selling_price",
        footer: (props) => props.column.id,
      },
      {
        header: "Current stock level",
        accessorKey: "current_stock_level",
        footer: (props) => props.column.id,
      },
      {
        header: "Units sold",
        accessorKey: "units_sold",
        footer: (props) => props.column.id,
      },
      {
        header: "Profit generated",
        accessorKey: "profit_generated",
        footer: (props) => props.column.id,
      },
      {
        header: "Supplier name",
        accessorKey: "supplier_name",
        footer: (props) => props.column.id,
      },
      {
        header: "Created on",
        accessorKey: "created_at",
        footer: (props) => props.column.id,
      },
      {
        header: "Last modified",
        accessorKey: "updated_at",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      tableData.map((product: any) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          product_category: product.category.category_name,
          product_sub_category: product.sub_category.category_name,
          buying_price: product.buying_price,
          selling_price: product.selling_price,
          current_stock_level: product.current_stock_level,
          units_sold: product.units_sold,
          profit_generated: product.profit_generated,
          supplier_name: product.supplier_name,
          created_at: moment.unix(product.created_at).fromNow(),
          updated_at: moment.unix(product.updated_at).fromNow(),
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
              You have not added any products to your inventory yet.
            </h4>
          </div>
        </>
      )}
    </>
  );
};

export default InventoryTable;

/* eslint-disable react/prop-types */
import { useMemo } from "react";
import ProductCategoryTotal from "./ProductCategoryTotal";
import ProductSubCategoryTotal from "./ProductSubCategoryTotal";
import ProfitTrend from "./ProfitTrend";
import TotalProfitVsExpectedProfit from "./TotalProfitVsExpectedProfit";

const InventoryCharts = ({ inventoryData }) => {
  // filtered categories
  const filteredCategories = useMemo(() => {
    const categoriesSet = new Set();
    const categoryAmounts = {};

    inventoryData.forEach((product) => {
      const categoryName = product.category.category_name;
      const profit = product.profit_generated;

      categoriesSet.add(categoryName);

      if (!categoryAmounts[categoryName]) {
        categoryAmounts[categoryName] = profit;
      } else {
        categoryAmounts[categoryName] += profit;
      }
    });

    const categories = Array.from(categoriesSet);

    return categories.map((category) => ({
      category,
      categoryAmount: categoryAmounts[category],
    }));
  }, [inventoryData]);

  // filtered subcategories
  const filteredSubcategories = useMemo(() => {
    const subcategoriesSet = new Set();
    const subcategoryAmounts = {};

    inventoryData.forEach((product) => {
      const subcategoryName = product.sub_category.category_name;
      const profit = product.profit_generated;

      subcategoriesSet.add(subcategoryName);

      if (!subcategoryAmounts[subcategoryName]) {
        subcategoryAmounts[subcategoryName] = profit;
      } else {
        subcategoryAmounts[subcategoryName] += profit;
      }
    });

    const subcategories = Array.from(subcategoriesSet);

    return subcategories.map((subcategory) => ({
      subcategory,
      subcategoryAmount: subcategoryAmounts[subcategory],
    }));
  }, [inventoryData]);

  // general profit trend
  const profitTrend = useMemo(() => {
    return inventoryData.map((product) => ({
      product_name: product.name,
      product_profit: product.profit_generated,
    }));
  }, [inventoryData]);

  // filter total profit vs total expected profit
  const filteredProfit = useMemo(() => {
    const totalProfitGenerated = inventoryData.reduce((sum, product) => {
      return (
        sum +
        (product.selling_price - product.buying_price) * product.units_sold
      );
    }, 0);

    const totalExpectedProfit = inventoryData.reduce((sum, product) => {
      return (
        sum +
        (product.selling_price - product.buying_price) *
          product.current_stock_level
      );
    }, 0);

    return {
      total_profit_generated: totalProfitGenerated,
      total_expected_profit: totalExpectedProfit,
    };
  }, [inventoryData]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <ProductCategoryTotal filteredData={filteredCategories} />
        <div className="mx-2"></div>
        <ProductSubCategoryTotal filteredData={filteredSubcategories} />
      </div>
      <div className="flex items-center justify-between mb-4">
        <ProfitTrend filteredData={profitTrend} />
        <div className="mx-2"></div>
        <TotalProfitVsExpectedProfit filteredData={filteredProfit} />
      </div>
    </>
  );
};

export default InventoryCharts;

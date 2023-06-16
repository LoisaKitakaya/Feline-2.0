import { useMemo } from "react";

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
};

export default InventoryCharts;

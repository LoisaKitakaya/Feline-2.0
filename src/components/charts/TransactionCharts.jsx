/* eslint-disable react/prop-types */
import { useMemo } from "react";
import TotalBalance from "./TotalBalance";
import PayableTrends from "./PayableTrends";
import ReceivableTrends from "./RecivableTrends";
import PayablesVsReceivablesCount from "./PayablesVsReceivablesCount";
import TransactionCategoriesTotals from "./TransactionCategoriesTotals";
import PayablesVsReceivablesTotals from "./PayablesVsReceivablesTotals";
import TransactionSubCategoriesTotals from "./TransactionSubCategoriesTotals";

const TransactionCharts = ({ chartData }) => {
  // filtered categories
  const filteredCategories = useMemo(() => {
    const categories = [
      ...new Set(
        chartData.map((transaction) => transaction.category.category_name)
      ),
    ];
    const categoryAmounts = {};

    chartData.forEach((transaction) => {
      const categoryName = transaction.category.category_name;
      const amount = transaction.transaction_amount;

      if (!categoryAmounts[categoryName]) {
        categoryAmounts[categoryName] = amount;
      } else {
        categoryAmounts[categoryName] += amount;
      }
    });

    return categories.map((category) => ({
      category,
      categoryAmount: categoryAmounts[category],
    }));
  }, [chartData]);

  //   filtered subcategories
  const filteredSubcategories = useMemo(() => {
    const subcategories = [
      ...new Set(
        chartData.map((transaction) => transaction.sub_category.category_name)
      ),
    ];
    const subcategoryAmounts = {};

    chartData.forEach((transaction) => {
      const subcategoryName = transaction.sub_category.category_name;
      const amount = transaction.transaction_amount;

      if (!subcategoryAmounts[subcategoryName]) {
        subcategoryAmounts[subcategoryName] = amount;
      } else {
        subcategoryAmounts[subcategoryName] += amount;
      }
    });

    return subcategories.map((subcategory) => ({
      subcategory,
      subcategoryAmount: subcategoryAmounts[subcategory],
    }));
  }, [chartData]);

  //   all receivables
  const receivables = useMemo(() => {
    const receivableTransactions = chartData.filter(
      (transaction) => transaction.transaction_type.type_name === "receivable"
    );
    return receivableTransactions.map(
      (transaction) => transaction.transaction_amount
    ).reverse();
  }, [chartData]);

  //   all payables
  const payables = useMemo(() => {
    const payableTransactions = chartData.filter(
      (transaction) => transaction.transaction_type.type_name === "payable"
    );
    return payableTransactions.map(
      (transaction) => transaction.transaction_amount
    ).reverse();
  }, [chartData]);

  //   no of receivables
  const receivablesCount = useMemo(() => {
    return chartData.filter(
      (transaction) => transaction.transaction_type.type_name === "receivable"
    ).length;
  }, [chartData]);

  //   no of payables
  const payablesCount = useMemo(() => {
    return chartData.filter(
      (transaction) => transaction.transaction_type.type_name === "payable"
    ).length;
  }, [chartData]);

  //   total receivables
  const totalReceivables = useMemo(() => {
    return chartData.reduce((sum, transaction) => {
      if (transaction.transaction_type.type_name === "receivable") {
        return sum + transaction.transaction_amount;
      }
      return sum;
    }, 0);
  }, [chartData]);

  //   total payables
  const totalPayables = useMemo(() => {
    return chartData.reduce((sum, transaction) => {
      if (transaction.transaction_type.type_name === "payable") {
        return sum + transaction.transaction_amount;
      }
      return sum;
    }, 0);
  }, [chartData]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <TransactionCategoriesTotals filteredCategories={filteredCategories} />
        <div className="mx-2"></div>
        <TransactionSubCategoriesTotals
          filteredSubcategories={filteredSubcategories}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <ReceivableTrends receivables={receivables} />
        <div className="mx-2"></div>
        <PayableTrends payables={payables} />
      </div>
      <div className="flex justify-between mb-4">
        <PayablesVsReceivablesCount
          receivablesCount={receivablesCount}
          payablesCount={payablesCount}
        />
        <div className="mx-2"></div>
        <PayablesVsReceivablesTotals
          totalReceivables={totalReceivables}
          totalPayables={totalPayables}
          totalBalance={<TotalBalance />}
        />
      </div>
    </>
  );
};

export default TransactionCharts;

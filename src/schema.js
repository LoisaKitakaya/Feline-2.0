import { gql } from "@apollo/client";

// Queries

export const VALIDATE_USER = gql`
  query (
    $email: String!
    $first_name: String!
    $last_name: String!
    $password: String!
    $password2: String!
  ) {
    validateOrCreateUser(
      email: $email
      first_name: $first_name
      last_name: $last_name
      password: $password
      password2: $password2
    ) {
      username
    }
  }
`;

export const TOKEN_AUTH = gql`
  query ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const TRANSACTION_TYPES = gql`
  query {
    getTransactionType {
      id
      type_name
      type_description
    }
  }
`;

export const TRANSACTION_CATEGORY = gql`
  query {
    getTransactionCategory {
      id
      parent {
        group_name
      }
      category_name
      category_description
    }
  }
`;

export const TRANSACTION_SUB_CATEGORY = gql`
  query ($parent: String!) {
    getTransactionSubCategory(parent: $parent) {
      id
      parent {
        category_name
      }
      category_name
      category_description
    }
  }
`;

export const PRODUCT_CATEGORY = gql`
  query {
    getProductCategory {
      id
      category_name
      category_description
    }
  }
`;

export const PRODUCT_SUB_CATEGORY = gql`
  query ($parent: String!) {
    getProductSubCategory(parent: $parent) {
      id
      parent {
        category_name
      }
      category_name
      category_description
    }
  }
`;

export const GET_ALL_ACCOUNTS = gql`
  query {
    getAllAccounts {
      id
      account_name
      account_type
      currency_code
      account_balance
      created_at
    }
  }
`;

export const GET_ACCOUNT = gql`
  query ($id: ID!) {
    getAccount(id: $id) {
      id
      account_name
      account_type
      currency_code
      account_balance
      created_at
    }
  }
`;

export const GET_ALL_BUDGETS = gql`
  query {
    getAllBudgets {
      id
      budget_name
      budget_is_active
      budget_amount
      account {
        account_name
      }
      category {
        category_name
      }
      created_at
    }
  }
`;

export const GET_BUDGET = gql`
  query ($id: ID!) {
    getBudget(id: $id) {
      id
      budget_name
      budget_description
      budget_is_active
      budget_amount
      account {
        account_name
      }
      category {
        category_name
      }
      sub_category {
        category_name
      }
      created_at
    }
  }
`;

export const GET_ALL_TARGETS = gql`
  query {
    getAllTargets {
      id
      target_name
      target_is_active
      target_amount
      account {
        account_name
      }
      category {
        category_name
      }
      created_at
    }
  }
`;

export const GET_TARGET = gql`
  query ($id: ID!) {
    getTarget(id: $id) {
      id
      target_name
      target_description
      target_is_active
      target_amount
      account {
        account_name
      }
      category {
        category_name
      }
      sub_category {
        category_name
      }
      created_at
    }
  }
`;

export const GET_ALL_ACCOUNT_TRANSACTIONS = gql`
  query ($account_id: ID!) {
    getAllTransactions(account_id: $account_id) {
      id
      transaction_type {
        type_name
      }
      transaction_amount
      currency_code
      description
      transaction_date
      category {
        category_name
      }
      sub_category {
        category_name
      }
      created_at
      updated_at
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts($account_id: ID!) {
    getAllProducts(account_id: $account_id) {
      id
      name
      description
      category {
        id
        category_name
      }
      sub_category {
        id
        category_name
      }
      buying_price
      selling_price
      current_stock_level
      units_sold
      reorder_level
      reorder_quantity
      supplier_name
      profit_generated
      created_at
      updated_at
    }
  }
`;

export const GET_ALL_REPORTS = gql`
  query getAllReports($account_id: ID!) {
    getAllReports(account_id: $account_id) {
      id
      statement_uid
      begin_date
      end_date
    }
  }
`;

export const GET_REPORT = gql`
  query getReport($statement_uid: String!) {
    getReport(statement_uid: $statement_uid) {
      id
      statement_uid
      amount
      item {
        name
        is_income
      }
    }
  }
`;

export const GET_ALL_CASH_FLOW_STATEMENTS = gql`
  query ($account_id: ID!) {
    getAllCashFlowStatements(account_id: $account_id) {
      id
      uid
      period_start_date
      period_end_date
    }
  }
`;

export const GET_CASH_FLOW_STATEMENT = gql`
  query ($uid: String!) {
    getCashFlowStatement(uid: $uid) {
      id
      uid
      record {
        id
        category
        item
        activity
        amount
        is_income
      }
    }
  }
`;

export const GET_ALL_INCOME_STATEMENTS = gql`
  query ($account_id: ID!) {
    getAllIncomeStatements(account_id: $account_id) {
      id
      uid
      period_start_date
      period_end_date
    }
  }
`;

export const GET_INCOME_STATEMENT = gql`
  query ($uid: String!) {
    getIncomeStatement(uid: $uid) {
      id
      uid
      revenue
      gross_profit
      operating_expenses
      net_income
      period_start_date
      period_end_date
    }
  }
`;

export const GET_ALL_BALANCE_SHEET_STATEMENTS = gql`
  query ($account_id: ID!) {
    getAllBalanceSheetStatements(account_id: $account_id) {
      id
      uid
      created_at
      updated_at
    }
  }
`;

export const GET_BALANCE_SHEET_STATEMENT = gql`
  query ($uid: String!) {
    getBalanceSheetStatement(uid: $uid) {
      id
      uid
      assets
      liabilities
      equity
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfile {
    getProfile {
      id
      user {
        id
        username
        first_name
        last_name
        is_active
      }
      phone_number
    }
  }
`;

export const GENERATE_QR_CODE = gql`
  query generateQRCode {
    generateQRCode
  }
`;

// Mutations

export const CREATE_ACCOUNT = gql`
  mutation (
    $account_name: String!
    $account_type: String!
    $account_balance: String!
    $currency_code: String!
  ) {
    createAccount(
      account_name: $account_name
      account_type: $account_type
      account_balance: $account_balance
      currency_code: $currency_code
    ) {
      id
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation (
    $id: ID!
    $account_name: String!
    $account_type: String!
    $account_balance: String!
    $currency_code: String!
  ) {
    updateAccount(
      id: $id
      account_name: $account_name
      account_type: $account_type
      account_balance: $account_balance
      currency_code: $currency_code
    ) {
      id
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation ($id: ID!) {
    deleteAccount(id: $id)
  }
`;

export const CREATE_BUDGET = gql`
  mutation (
    $account_id: ID!
    $budget_name: String!
    $budget_description: String!
    $budget_amount: String!
    $category: String!
    $sub_category: String!
  ) {
    createBudget(
      account_id: $account_id
      budget_name: $budget_name
      budget_description: $budget_description
      budget_amount: $budget_amount
      category: $category
      sub_category: $sub_category
    ) {
      id
    }
  }
`;

export const UPDATE_BUDGET = gql`
  mutation (
    $id: ID!
    $budget_name: String!
    $budget_description: String!
    $budget_amount: String!
    $category: String!
    $sub_category: String!
  ) {
    updateBudget(
      id: $id
      budget_name: $budget_name
      budget_description: $budget_description
      budget_amount: $budget_amount
      category: $category
      sub_category: $sub_category
    ) {
      id
    }
  }
`;

export const DELETE_BUDGET = gql`
  mutation ($id: ID!) {
    deleteBudget(id: $id)
  }
`;

export const CREATE_TARGET = gql`
  mutation (
    $account_id: ID!
    $target_name: String!
    $target_description: String!
    $target_amount: String!
    $category: String!
    $sub_category: String!
  ) {
    createTarget(
      account_id: $account_id
      target_name: $target_name
      target_description: $target_description
      target_amount: $target_amount
      category: $category
      sub_category: $sub_category
    ) {
      id
    }
  }
`;

export const UPDATE_TARGET = gql`
  mutation (
    $id: ID!
    $target_name: String!
    $target_description: String!
    $target_amount: String!
    $category: String!
    $sub_category: String!
  ) {
    updateTarget(
      id: $id
      target_name: $target_name
      target_description: $target_description
      target_amount: $target_amount
      category: $category
      sub_category: $sub_category
    ) {
      id
    }
  }
`;

export const DELETE_TARGET = gql`
  mutation ($id: ID!) {
    deleteTarget(id: $id)
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation (
    $account_id: ID!
    $transaction_type: String!
    $transaction_amount: String!
    $transaction_date: String!
    $description: String!
    $category: String!
    $sub_category: String!
  ) {
    createTransaction(
      account_id: $account_id
      transaction_type: $transaction_type
      transaction_amount: $transaction_amount
      transaction_date: $transaction_date
      description: $description
      category: $category
      sub_category: $sub_category
    ) {
      id
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation (
    $id: ID!
    $account_id: ID!
    $transaction_type: String!
    $transaction_amount: String!
    $transaction_date: String!
    $description: String!
    $category: String!
    $sub_category: String!
  ) {
    updateTransaction(
      id: $id
      account_id: $account_id
      transaction_type: $transaction_type
      transaction_amount: $transaction_amount
      transaction_date: $transaction_date
      description: $description
      category: $category
      sub_category: $sub_category
    ) {
      id
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation ($id: ID!, $account_id: ID!) {
    deleteTransaction(id: $id, account_id: $account_id)
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $account_id: ID!
    $name: String!
    $description: String!
    $category: String!
    $sub_category: String!
    $buying_price: String!
    $selling_price: String!
    $current_stock_level: String!
    $units_sold: String!
    $supplier_name: String!
  ) {
    createProduct(
      account_id: $account_id
      name: $name
      description: $description
      category: $category
      sub_category: $sub_category
      buying_price: $buying_price
      selling_price: $selling_price
      current_stock_level: $current_stock_level
      units_sold: $units_sold
      supplier_name: $supplier_name
    ) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $description: String!
    $category: String!
    $sub_category: String!
    $buying_price: String!
    $selling_price: String!
    $current_stock_level: String!
    $units_sold: String!
    $supplier_name: String!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      category: $category
      sub_category: $sub_category
      buying_price: $buying_price
      selling_price: $selling_price
      current_stock_level: $current_stock_level
      units_sold: $units_sold
      supplier_name: $supplier_name
    ) {
      id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const GENERATE_REPORT = gql`
  mutation generateReport(
    $account_id: ID!
    $begin_date: String!
    $end_date: String!
  ) {
    generateReport(
      account_id: $account_id
      begin_date: $begin_date
      end_date: $end_date
    ) {
      id
    }
  }
`;

export const DELETE_REPORT = gql`
  mutation deleteReport($statement_uid: String!) {
    deleteReport(statement_uid: $statement_uid)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!
    $first_name: String!
    $last_name: String!
  ) {
    updateUser(email: $email, first_name: $first_name, last_name: $last_name) {
      id
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOTP($otp: String!) {
    verifyOTP(otp: $otp)
  }
`;

export const GENERATE_CASH_FLOW_STATEMENT = gql`
  mutation ($account_id: ID!, $begin_date: String!, $end_date: String!) {
    generateCashFlowReport(
      account_id: $account_id
      begin_date: $begin_date
      end_date: $end_date
    ) {
      id
      uid
    }
  }
`;

export const DELETE_CASH_FLOW_STATEMENT = gql`
  mutation ($uid: String!) {
    deleteCashFlowReport(uid: $uid)
  }
`;

export const GENERATE_INCOME_STATEMENT = gql`
  mutation ($account_id: ID!, $begin_date: String!, $end_date: String!) {
    generateIncomeReport(
      account_id: $account_id
      begin_date: $begin_date
      end_date: $end_date
    ) {
      id
      uid
    }
  }
`;

export const DELETE_INCOME_STATEMENT = gql`
  mutation ($uid: String!) {
    deleteIncomeReport(uid: $uid)
  }
`;

export const GENERATE_BALANCE_SHEET_STATEMENT = gql`
  mutation (
    $account_id: ID!
    $assets: [assets!]!
    $liabilities: [liabilities!]!
    $equity: [equity!]!
  ) {
    generateBalanceSheetReport(
      account_id: $account_id
      assets: $assets
      liabilities: $liabilities
      equity: $equity
    ) {
      id
      uid
    }
  }
`;

export const DELETE_BALANCE_SHEET_STATEMENT = gql`
  mutation ($uid: String!) {
    deleteBalanceSheetReport(uid: $uid)
  }
`;

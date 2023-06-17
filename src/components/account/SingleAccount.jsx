import moment from "moment";
import { useState } from "react";
import Modal from "../modal/Modal";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import UpdateAccount from "./UpdateAccount";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DeleteAccount from "./DeleteAccount";
import { useParams } from "react-router-dom";
import { GET_ACCOUNT } from "../../schema";
import Transactions from "../transaction/Transactions";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { setNewNotification } from "../../redux/toast";
import Shelf from "../inventory/Shelf";
import AllCashFlow from "../report/AllCashFlow";
import AllIncome from "../report/AllIncome";
import AllBalanceSheet from "../report/AllBalanceSheet";
import GenerateCashFlowReport from "../report/GenerateCashFlowReport";
import GenerateIncomeReport from "../report/GenerateIncomeReport";
import GenerateBalanceSheetReport from "../report/GenerateBalanceSheetReport";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const SingleAccount = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [showUpdate, setShowUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [showNewCashFlow, setShowNewCashFlow] = useState(false);
  const [showNewIncome, setShowNewIncome] = useState(false);
  const [showNewBalanceSheet, setShowNewBalanceSheet] = useState(false);

  const { loading, data, error } = useQuery(GET_ACCOUNT, {
    variables: { id: id },
  });

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  const reports = [
    {
      heading: "Cash Flow Statements",
      content: <AllCashFlow account_id={data.getAccount.id} />,
    },
    {
      heading: "Income Statements",
      content: <AllIncome account_id={data.getAccount.id} />,
    },
    {
      heading: "Balance Sheet Statements",
      content: <AllBalanceSheet account_id={data.getAccount.id} />,
    },
  ];

  return (
    <>
      {data && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-semibold mr-4">
              {data.getAccount.account_name}
            </h4>
            <div className="flex justify-between items-center">
              <button
                className="rounded-md border py-2 px-4"
                onClick={() => setShowUpdate(true)}
              >
                <i className="bi bi-pencil"></i> Update Account
              </button>
              <div className="mx-2"></div>
              <button
                className="rounded-md border py-2 px-4"
                onClick={() => setConfirmDelete(true)}
              >
                <i className="bi bi-trash"></i> Delete Account
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex justify-end items-center mb-4">
              <p className="text-lg">
                <span className="font-semibold">Currency:</span>{" "}
                <span>{data.getAccount.currency_code}</span>
              </p>
              <div className="mx-4"></div>
              <p className="text-lg">
                <span className="font-semibold">Account balance:</span>{" "}
                <span>{data.getAccount.account_balance.toLocaleString()}</span>
              </p>
            </div>
            <div className="flex justify-start items-center mb-4">
              <p className="text-lg">
                <span className="font-semibold">Account type:</span>{" "}
                <span>{data.getAccount.account_type}</span>
              </p>
              <div className="mx-4"></div>
              <p className="text-lg">
                <span className="font-semibold">Created:</span>{" "}
                <span>{moment.unix(data.getAccount.created_at).fromNow()}</span>
              </p>
            </div>
          </div>

          {/* tabs */}
          <Tabs>
            <TabList>
              <Tab>Transactions</Tab>
              <Tab>Inventory</Tab>
              <Tab>Reports</Tab>
            </TabList>

            <TabPanel>
              <br />
              <Transactions account_id={data.getAccount.id} />
            </TabPanel>
            <TabPanel>
              <br />
              <Shelf account_id={data.getAccount.id} />
            </TabPanel>
            <TabPanel>
              <br />
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Your reports</h4>
                <div className="flex justify-end items-center gap-4">
                  <button
                    className="rounded-md border py-2 px-4"
                    onClick={() => setShowNewCashFlow(true)}
                  >
                    <i className="bi bi-plus-lg"></i> New Cash Flow Report
                  </button>
                  <button
                    className="rounded-md border py-2 px-4"
                    onClick={() => setShowNewIncome(true)}
                  >
                    <i className="bi bi-plus-lg"></i> New Income Report
                  </button>
                  <button
                    className="rounded-md border py-2 px-4"
                    onClick={() => setShowNewBalanceSheet(true)}
                  >
                    <i className="bi bi-plus-lg"></i> New Balance Sheet Report
                  </button>
                </div>
              </div>
              <br />
              <Accordion className="border-none">
                {reports.map((report, index) => (
                  <AccordionItem key={index} className="border-none">
                    <AccordionItemHeading>
                      <AccordionItemButton className="acc-btn py-2 px-4 border my-1">
                        <p className="text-lg font-semibold">
                          {report.heading}
                        </p>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>{report.content}</AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabPanel>
          </Tabs>
          {/* tabs */}

          {/* modals */}
          <Modal
            visible={showUpdate}
            setVisible={setShowUpdate}
            title={"Update Account"}
            element={<UpdateAccount id={data.getAccount.id} />}
          />
          <Modal
            visible={confirmDelete}
            setVisible={setConfirmDelete}
            title={"Delete Account"}
            element={
              <DeleteAccount
                id={data.getAccount.id}
                account_name={data.getAccount.account_name}
              />
            }
          />

          <Modal
            visible={showNewCashFlow}
            setVisible={setShowNewCashFlow}
            title={"Generate Cash Flow Report"}
            element={<GenerateCashFlowReport account_id={data.getAccount.id} />}
          />
          <Modal
            visible={showNewIncome}
            setVisible={setShowNewIncome}
            title={"Generate Income Report"}
            element={<GenerateIncomeReport account_id={data.getAccount.id} />}
          />
          <Modal
            visible={showNewBalanceSheet}
            setVisible={setShowNewBalanceSheet}
            title={"Generate Balance Sheet Report"}
            element={
              <GenerateBalanceSheetReport account_id={data.getAccount.id} />
            }
          />
          {/* modals */}
        </>
      )}
    </>
  );
};

export default SingleAccount;

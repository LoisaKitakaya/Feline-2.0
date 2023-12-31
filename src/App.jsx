import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { tomcat } from "./main";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import PageView from "./components/layout/PageView";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import CheckAuth from "./components/auth/CheckAuth";
import Account from "./pages/Account";
import CashFlow from "./pages/CashFlow";
import Income from "./pages/Income";
import BalanceSheet from "./pages/BalanceSheet";
import Budgets from "./pages/Budgets";
import Budget from "./pages/Budget";
import Targets from "./pages/Targets";
import Target from "./pages/Target";
import CleanUp from "./components/auth/CleanUp";
import KeepTabs from "./headway/KeepTabs";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const App = () => {
  const navigate = useNavigate();

  const notification = useSelector((state) => state.toast);

  const checkNotification = (notification) => {
    if (notification.type && notification.message) {
      if (notification.type === "success") {
        toast.success(notification.message);
      } else if (notification.type === "error") {
        toast.error(notification.message);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    checkNotification(notification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <>
      <ClerkProvider
        publishableKey={clerkPubKey}
        navigate={(to) => navigate(to)}
      >
        <Routes>
          <Route
            path="/"
            element={<PageView view={<Home />} subTitle={"Home"} />}
          />
          {!tomcat && (
            <Route
              path="/progress"
              element={<PageView view={<KeepTabs />} subTitle={"Progress"} />}
            />
          )}
          <Route
            path="/sign-in/*"
            element={
              <SignIn
                appearance={{
                  elements: {
                    rootBox: "my-24 mx-auto",
                  },
                }}
                routing="path"
                path="/sign-in"
              />
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "my-20 mx-auto",
                  },
                }}
                routing="path"
                path="/sign-up"
              />
            }
          />
          <Route
            path="/check-auth"
            element={
              <>
                <SignedIn>
                  <PageView view={<CheckAuth />} subTitle={"Check auth"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/accounts"
            element={
              <>
                <SignedIn>
                  <PageView view={<Accounts />} subTitle={"Accounts"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/account/:id"
            element={
              <>
                <SignedIn>
                  <PageView view={<Account />} subTitle={"Account"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/cash-flow/:uid"
            element={
              <>
                <SignedIn>
                  <PageView view={<CashFlow />} subTitle={"Cash Flow"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/income/:uid"
            element={
              <>
                <SignedIn>
                  <PageView view={<Income />} subTitle={"Income"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/balance-sheet/:uid"
            element={
              <>
                <SignedIn>
                  <PageView view={<BalanceSheet />} subTitle={"Income"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/budget"
            element={
              <>
                <SignedIn>
                  <PageView view={<Budgets />} subTitle={"Budgets"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/budget/:id"
            element={
              <>
                <SignedIn>
                  <PageView view={<Budget />} subTitle={"Budget"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/target"
            element={
              <>
                <SignedIn>
                  <PageView view={<Targets />} subTitle={"Targets"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/target/:id"
            element={
              <>
                <SignedIn>
                  <PageView view={<Target />} subTitle={"Target"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/invoice"
            element={
              <>
                <SignedIn>
                  <PageView view={<Invoices />} subTitle={"Invoices"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <>
                <SignedIn>
                  <PageView view={<Invoice />} subTitle={"Invoice"} />
                </SignedIn>
                <SignedOut>
                  <CleanUp />
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </ClerkProvider>

      {/* notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* notifications */}
    </>
  );
};

export default App;

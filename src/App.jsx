import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
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
            path="/accounts"
            element={
              <>
                <SignedIn>
                  <PageView view={<Accounts />} subTitle={"Accounts"} />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
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

import { useUser } from "@clerk/clerk-react";
import ValidateUser from "./ValidateUser";

const CheckAuth = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <ValidateUser
      first_name={user.firstName}
      last_name={user.lastName}
      email={user.primaryEmailAddress.emailAddress}
      password={user.primaryEmailAddress.emailAddress}
      password2={user.primaryEmailAddress.emailAddress}
    />
  );
};

export default CheckAuth;

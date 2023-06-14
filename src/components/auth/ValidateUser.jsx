/* eslint-disable react/prop-types */
import AuthenticateUser from "./AuthenticateUser";
import { useQuery } from "@apollo/client";
import { VALIDATE_USER } from "../../schema";

const ValidateUser = ({
  email,
  first_name,
  last_name,
  password,
  password2,
}) => {
  const { data, error, loading } = useQuery(VALIDATE_USER, {
    variables: {
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
      password2: password2,
    },
  });

  if (loading) return "Loading...";

  if (error) {
    console.error(`Error: ${error.message}`);
  }

  return (
    <>
      {data && (
        <AuthenticateUser
          signinPassword={data.validateOrCreateUser.username}
          signinUsername={data.validateOrCreateUser.username}
        />
      )}
    </>
  );
};

export default ValidateUser;

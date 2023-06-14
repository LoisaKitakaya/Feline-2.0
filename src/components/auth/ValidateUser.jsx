import AuthenticateUser from "./AuthenticateUser";

const ValidateUser = ({
  email,
  first_name,
  last_name,
  password,
  password2,
}) => {
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

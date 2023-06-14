import { useQuery } from "@apollo/client";
import { TOKEN_AUTH } from "../../schema";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/auth";

const AuthenticateUser = ({ signinPassword, signinUsername }) => {
  const dispatch = useDispatch();

  const { data, error, loading } = useQuery(TOKEN_AUTH, {
    variables: {
      username: signinUsername,
      password: signinPassword,
    },
  });

  if (data) {
    dispatch(signIn({ token: data.tokenAuth.token }));
    window.location.replace(document.referrer);
  }

  if (loading) return "Loading...";

  if (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default AuthenticateUser;

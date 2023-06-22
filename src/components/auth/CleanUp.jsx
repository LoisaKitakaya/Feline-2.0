import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth";

const CleanUp = () => {
  const dispatch = useDispatch();

  dispatch(signOut());
};

export default CleanUp;

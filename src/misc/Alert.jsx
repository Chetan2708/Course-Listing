import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch , useSelector } from "react-redux";
import { setAlert } from "../features/inputSlice";

const Alertt = () => {
  const alert = useSelector((state)=>state.alert)
  const dispatch = useDispatch()
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setAlert({ open: false }));
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <Alert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default Alertt;
import styles from "./TopUpTab.module.scss";
import common from "../../styles/common.module.scss";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { checkFloat } from "../../utils/check";
const TopUpTab: FC = () => {
  const [ammount, setAmmount] = useState("");
  const [error, setError] = useState<string>("");
  const { topUp } = useContext(AuthContext);
  const add = () => {
    if (checkFloat(ammount)) {
      setError("");
      topUp(parseFloat(ammount));
    } else {
      setError("Please enter a valid number");
    }
  };
  return (
    <div className={styles.topUpTab}>
      <input
        onChange={(event) => {
          setAmmount(event.target.value);
        }}
        placeholder="Amount"
        className={common.input}
      />
      {error !== "" && <div className={common.error}>{error}</div>}
      <button
        onClick={() => {
          add();
        }}
        className={common.confirmBtn + " " + common.m20}
      >
        Top Up
      </button>
    </div>
  );
};

export default TopUpTab;

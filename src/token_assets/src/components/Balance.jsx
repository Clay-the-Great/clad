import React, {useState} from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token"; 

function Balance() {

  const [inputValue, setInput] = useState("");
  const [balance, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleChange(event){
    const newValue = event.target.value;
    setInput(newValue);

  }
  
  async function handleClick() {
    console.log(inputValue);
    const principal = Principal.fromText(inputValue);
    const newBalance = await token.balanceOf(principal);
    setBalance(newBalance.toLocaleString());
    setSymbol(await token.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={handleChange}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden? true : false}>This account has a balance of {balance} {symbol}.</p>
    </div>
  );
}

export default Balance;

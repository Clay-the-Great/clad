import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {

  const [toAccount, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [isDisabled, setDisable] = useState(false);
  const [isHidden, setHidden] = useState(true);

  async function accountText(event) {
    setAccount(event.target.value);

  }

  async function currentAmount(event) {
    setAmount(event.target.value);
  }

  async function handleClick() {
    setDisable(true);
    setHidden(true);

    const authClient = await AuthClient.create();
    const identity = await AuthClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const recipient = Principal.fromText(toAccount);
    const amountToTransfer = Number(amount);
    const resultText = await authenticatedCanister.transfer(recipient, amountToTransfer);
    setResult(resultText);
    setHidden(false);
    setAmount("");
    setDisable(false);

  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={accountText}
                value={toAccount}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={currentAmount}
                value={amount}
              />
            </li>
          </ul>
        </fieldset>
        <div className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
          <p hidden={isHidden}>{result}</p>
        </div>
      </div>
    </div>
  );
}

export default Transfer;

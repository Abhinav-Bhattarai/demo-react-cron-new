import * as React from "react";
import Cron, { CronError } from "react-js-cron";
import "./styles.css";
import "antd/dist/antd.css";
import { Divider, Input } from "antd";

export default function App() {
  const inputRef = React.useRef<Input>(null);
  const defaultValue = "30 5 * * 1,6";
  const [value, setValue] = React.useState(defaultValue);
  const customSetValue = React.useCallback(
    (newValue: string) => {
      setValue(newValue);
      inputRef.current?.setValue(newValue);
    },
    [inputRef]
  );
  const [error, onError] = React.useState<CronError>();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <div>
        <Input
          ref={inputRef}
          onBlur={(event) => {
            setValue(event.target.value);
          }}
          onPressEnter={() => {
            setValue(inputRef.current?.input.value || "");
          }}
        />

        <Divider>OR</Divider>

        <Cron value={value} setValue={customSetValue} onError={onError} />

        <div>
          <span style={{ fontSize: 12 }}>
            Double click on a dropdown option to automatically select / unselect
            a periodicity
          </span>
        </div>

        <p style={{ marginTop: 20 }}>
          Error: {error ? error.description : "undefined"}
        </p>
      </div>
    </div>
  );
}

import RoutConfig from "./Navigatioon/RoutConfig";
// import { BrowserRouter, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RoutConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;

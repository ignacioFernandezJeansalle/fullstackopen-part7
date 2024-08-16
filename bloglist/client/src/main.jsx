import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import App from "./App";

import "semantic-ui-css/semantic.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

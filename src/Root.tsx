import ReactDOM from "react-dom/client"
import React from "react"
import App from "./App"
import store from "./common/store"
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)

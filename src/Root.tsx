import ReactDOM from "react-dom/client"
import React from "react"
import App from "./App"
import "@cloudscape-design/global-styles/index.css"
import store from "./common/store"
import { Provider } from "react-redux"
import "./root.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)

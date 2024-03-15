import { RouterProvider } from "react-router-dom";
import { router } from "./routers.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>   
    </>
  );
}

export default App;

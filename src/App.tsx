import { BrowserRouter } from "react-router-dom";
import MainRoute from "./routes/MainRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <MainRoute />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;

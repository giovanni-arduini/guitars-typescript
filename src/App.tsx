import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Contexts/GlobalContext";
import { FavoritesProvider } from "./Contexts/FavoritesContext";

import "./App.css";

function App() {
  return (
    <>
      <GlobalProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Routes>
              <Route></Route>
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </GlobalProvider>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Contexts/GlobalContext";
import { FavoritesProvider } from "./Contexts/FavoritesContext";
import { CompareProvider } from "./Contexts/CompareContext";
import DefaultLayout from "./Layouts/DefaultLayout";
import ProductsList from "./Pages/ProductsList";
import ProductsDetail from "./Pages/ProductDetail";

import "./App.css";

function App() {
  return (
    <>
      <GlobalProvider>
        <FavoritesProvider>
          <CompareProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<ProductsList />}></Route>
                  <Route
                    path="/guitars/:id"
                    element={<ProductsDetail />}
                  ></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </CompareProvider>
        </FavoritesProvider>
      </GlobalProvider>
    </>
  );
}

export default App;

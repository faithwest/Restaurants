import RestaurantList from "./RestaurantList";
import RestaurantDescription from "./RestaurantDescription";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PizzaList from "./PizzaList";
import Pizza from "./Pizza";
import Restaurantpizzas from "./Restaurantpizzas";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/restaurants/:id"
            element={<RestaurantDescription />}
          />
          <Route path="/*" element={<RestaurantList />}/>

          <Route path="/pizzas/:id" element={<PizzaList />} />
          <Route path="/restaurantpizzas/new" element={<Pizza />} />
          <Route path="/restaurantpizzas" element={<Restaurantpizzas/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import "./App.css";
import { apiGetSalesData } from "./components/api";
import Table from "./components/Table";
import TableFilterOptions from "./components/TableFilterOptions";

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ region: "all", model: "all" });

  useEffect(() => {
    apiGetSalesData()
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="container">
      <Table data={data} showSum={true} />
      <div className="containter__vert">
        <TableFilterOptions data={data} setFilters={setFilters} />
        <Table data={data} filter={filters} />
      </div>
    </div>
  );
}

export default App;

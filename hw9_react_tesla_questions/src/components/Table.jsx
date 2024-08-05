export default function Table({ data, showSum, filter }) {
  // data -- list of sales objects
  // showSum -- boolean to toggle inject sales sum for each region
  // filter -- flag to toggle which data to show

  let displayData = [...data];

  if (filter) {
    const regionFilter = filter.region;
    const modelFilter = filter.model;
    if (regionFilter !== "all") {
      displayData = displayData.filter((val) => val.region === regionFilter);
    }

    if (modelFilter !== "all") {
      displayData = displayData.filter((val) => val.model === modelFilter);
    }
  }

  if (showSum) {
    const map = new Map();
    displayData.forEach((val) => {
      const region = val.region;
      const sales = val.sales;
      if (map.has(region)) {
        map.set(region, map.get(region) + sales);
      } else {
        map.set(region, sales);
      }
    });
    map.forEach((sum, region) => {
      const firstIdx = displayData.findIndex((x) => x.region === region);
      displayData.splice(firstIdx, 0, {
        region: region,
        model: "sum",
        sales: sum,
      });
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>region</th>
          <th>model</th>
          <th>sales</th>
        </tr>
      </thead>
      <tbody>
        {displayData.map((val) => {
          return (
            <tr key={`${val.region}-${val.model}`}>
              <td>{val.region}</td>
              <td>{val.model}</td>
              <td>{val.sales}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

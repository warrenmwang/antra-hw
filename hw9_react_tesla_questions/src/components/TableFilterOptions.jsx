export default function TableFilterOptions({ data, setFilters }) {
  const regions = Array.from(new Set(data.map((val) => val.region))); // unique regions
  const models = Array.from(new Set(data.map((val) => val.model))); // unqiue models

  const handleSelectChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div>
      <form>
        <label>Region Filter</label>
        <select id="region" onChange={handleSelectChange}>
          <option value="all">all</option>
          {regions.map((region) => {
            return (
              <option key={region} value={region}>
                {region}
              </option>
            );
          })}
        </select>{" "}
        <label>Model Filter</label>
        <select id="model" onChange={handleSelectChange}>
          <option>all</option>
          {models.map((model) => {
            return (
              <option key={model} value={model}>
                {model}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}

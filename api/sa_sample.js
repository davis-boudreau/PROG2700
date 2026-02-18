// Example: Fetch a dataset from Nova Scotia Open Data (replace dataset ID)
const url = "https://data.novascotia.ca/resource/3km6-ez4q.json?$limit=50";

async function loadData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

loadData();
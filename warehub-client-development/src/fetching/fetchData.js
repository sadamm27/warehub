export const baseUrl = "http://localhost:3001/";

//Data Fetching function, just change the url parameters when calling fetchData('example')
export const fetchData = async (url) => {
  const response = await fetch(`${baseUrl}${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  const data = await response.json();
  return data;
};
/*
The current json res from backend would output 3 different objects
products = [{}]
data = [{}]
array of objects directly [{}]

all of the payloads and req.body
=======================================================

products = products = [{}]
orders = data = [{},{}] id, user_id customer_id warehouse_id name total_price -> include Customer: {} include Warehouse: {}
orderproducts = [{},{}] product_id order_id price quantity
warehousestocks = [{},{}] product_id, warehouse_id, quantity
expenses = [{}] id user_id expense detail
revenues = [{}] id user_id revenue detail
vendors = [{}] id user_id name country
warehouses = [{}] id user_id name city address
categories = [{}] id name description
productvendors = [{}] product_id vendor_id
customers
*/

export const fetchStocks = async () => {
  const data = await fetchData("warehousestocks");
  return data;
};

export const fetchOrderDetails = async () => {
  const data = await fetchData("orderproducts");
  return data;
};

export const fetchVendors = async () => {
  const data = await fetchData("vendors");
  return data;
};

export const fetchWarehouses = async () => {
  const data = await fetchData("warehouses");
  return data;
};

export const fetchRevenues = async () => {
  const data = await fetchData("revenues");
  return data;
};

export const fetchExpenses = async () => {
  const data = await fetchData("expenses");
  return data;
};

export const fetchProducts = async (filters = {}) => {
  const nonEmptyFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );
  const params = new URLSearchParams(nonEmptyFilters).toString();
  const data = await fetchData(`products?${params}`);
  return {
    products: data.products,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    currentPage: data.currentPage
  };
};


export const fetchOrders = async (filters = {}) => {
  const nonEmptyFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );
  const params = new URLSearchParams(nonEmptyFilters).toString();
  const data = await fetchData(`orders?${params}`);
  return {
    orders: data.data,
    totalData: data.totalData,
    totalPages: data.totalPages,
    currentPage: data.currentPage
  }
};

export const fetchCustomers = async () => {
  const data = await fetchData("customers");
  return data;
};

export const fetchCategories = async () => {
  const data = await fetchData("categories");
  return data;
};

export const fetchUser = async () => {
  const data = await fetchData("user");
  return data;
};

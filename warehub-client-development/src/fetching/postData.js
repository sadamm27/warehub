import { baseUrl } from "./fetchData";
//Login
export async function postLoginData(username, password) {
  const response = await fetch(`${baseUrl}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

//Create
export async function postProduct(
  name,
  price,
  weight,
  size,
  description,
  SKU,
  category_id,
  image,
  accessToken
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("weight", weight);
  formData.append("size", size);
  formData.append("description", description);
  formData.append("SKU", SKU);
  formData.append("category_id", category_id);
  formData.append("image", image);

  const response = await fetch(`${baseUrl}products/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function bulkInsertProducts(file, accessToken) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${baseUrl}products/bulk`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function moveProduct(product_id, source_warehouse_id, quantity,  destination_warehouse_id,accessToken) {
  const response = await fetch(`${baseUrl}warehousestocks/move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      product_id, source_warehouse_id, quantity,  destination_warehouse_id
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function postCategory(name, description, accessToken) {
  const response = await fetch(`${baseUrl}categories/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function postVendor(name, country, accessToken) {
  const response = await fetch(`${baseUrl}vendors/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name,
      country,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function postWarehouse(name, city, address, accessToken) {
  const response = await fetch(`${baseUrl}warehouses/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name,
      city,
      address,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function postOrder(
  name,
  customer_id,
  warehouse_id,
  order_products,
  accessToken
) {
  const response = await fetch(`${baseUrl}orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name,
      customer_id,
      warehouse_id,
      order_products,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function postStock(
  product_id,
  quantity,
  vendor_id,
  warehouse_id,
  accessToken
) {
  const response = await fetch(`${baseUrl}products/stocks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      product_id,
      quantity,
      vendor_id,
      warehouse_id,
      accessToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function postCustomer(
  first_name,
  last_name,
  email,
  address,
  company,
  accessToken
) {
  const response = await fetch(`${baseUrl}customers/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      address,
      company,
      accessToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function postRegisterData(
  first_name,
  last_name,
  email,
  username,
  password,
  address,
  company
) {
  const response = await fetch(`${baseUrl}users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      username,
      password,
      address,
      company,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

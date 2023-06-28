import { useState, useEffect } from 'react';
import { fetchProducts, fetchOrders, fetchCustomers, fetchExpenses, fetchRevenues, fetchOrderDetails, fetchStocks, fetchVendors, fetchWarehouses, fetchCategories } from '@/fetching/fetchData';


export const allData = () => {
  const [data, setData] = useState(
    { 
      products: [], 
      orders: [], 
      customers: [],
      expenses: [],
      revenues: [],
      orderDetails: [],
      stocks: [],
      vendors: [],
      warehouses: [],
      categories:[]
    });

  useEffect(() => {
    Promise.all(
      [
        fetchProducts(), fetchOrders(), fetchCustomers(),
        fetchCategories(), fetchExpenses(), fetchRevenues(),
        fetchOrderDetails(), fetchStocks(), fetchVendors(),
        fetchWarehouses()
      ]
    )
    .then((
      [
        productsData, ordersData, customersData, categoriesData, expensesData,
        revenuesData, orderDetailsData, stocksData, vendorsData, warehousesData
      ]
    ) => {
      setData({
        products: productsData, 
        orders: ordersData, 
        customers: customersData,
        expenses: expensesData,
        revenues: revenuesData,
        orderDetails: orderDetailsData,
        stocks: stocksData,
        vendors: vendorsData,
        warehouses: warehousesData,
        categories: categoriesData 
      });
    })      
    .catch(err => console.log(err));
  }, []);

  return { data, setData };
};

export const allCategories = () => {
  const [category, setCategory] = useState({ categories: []});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCategories();
        setCategory({ categories: response });
        setIsLoading(false);
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  return { category, setCategory, isLoading, error };
};

export const allWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchWarehouses();
        setWarehouses(response)
        setIsLoading(false);
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  return { warehouses, setWarehouses, isLoading, error };
};

export const allVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetchVendors();
        setVendors(response);
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  return { vendors, setVendors, isLoading, error };
};

export const allProducts = ({ filters = {}, dummyState }) => {
  const [data, setData] = useState({ products: [], totalItems: 0, totalPages: 0, currentPage: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchProducts(filters);
        const { products, totalItems, totalPages, currentPage } = response;
        setData({ products, totalItems, totalPages, currentPage });
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dummyState, filters]);

  return { data, setData, isLoading, error };
};

export const allOrders = ({filters = {}, dummyState}) => {
  const [data, setData] = useState({ orders: [], totalData:0, totalPages: 0, currentPage: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetchOrders(filters);
        const { orders, totalData, totalPages, currentPage } = response;
        setData({ orders, totalData, totalPages, currentPage});
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    };

    fetchData();
  }, [dummyState, filters]);

  return { data, setData, isLoading, setIsLoading,error };
};

export const allExpenses = () => {
  const [expenses, setExpenses] = useState({ expenses: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchExpenses();
        setExpenses({ expenses: response });
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  return { expenses, setExpenses, isLoading, error };
};

export const allRevenues = () => {
  const [revenues, setRevenues] = useState({ revenues: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetchRevenues();
        setRevenues({ revenues: response });
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  return { revenues, setRevenues, isLoading, error };
};

export const allOrderDetails = () => {
  const [data, setData] = useState({ orderDetails: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderDetailsData = await fetchOrderDetails();
        setData({ orderDetails: orderDetailsData });
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { data, setData };
};

export const allStocks = () => {
  const [data, setData] = useState({ stocks: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const reponse = await fetchStocks();
        setData({ stocks: reponse });
        setIsLoading(false);
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  return { data, setData };
};

export const allCustomers = () => {

    const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCustomers();
        setCustomers(response);
        
      } catch (err) {
       
      }
    };

    fetchData();
  }, []);

  return {  customers, setCustomers };
};



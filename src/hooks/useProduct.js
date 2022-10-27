import { useState, useEffect } from "react";
import axios from "axios";
import waiting from "./waiting";
const useProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:3004/products";
      try {
        await waiting(1500);
        const res = await axios.get(url);
        if (res && res.data) {
          setData(res.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useProduct;

import axios from "axios";
import { useEffect, useState } from "react";
import waiting from "./waiting";

const useProductDetails = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchData() {
      const url = `http://localhost:3004/products/${id}`;
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
  }, [id]);

  return { data, loading, error };
};

export default useProductDetails;

import { useEffect, useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    clear,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAll = () => {
    axios.get(baseUrl).then((response) => setResources(response.data));
  };

  const create = (resource) => {
    const id = (100000 * Math.random()).toFixed(0);
    const createResource = { ...resource, id };
    axios.post(baseUrl, createResource).then((response) => {
      setResources(resources.concat(response.data));
    });
  };

  const service = {
    getAll,
    create,
  };

  return [resources, service];
};

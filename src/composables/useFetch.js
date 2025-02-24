import axios from "axios";

export default async function useFetch(url, options = {}) {
  const { data } = await axios({
    url,
    method: options.method ? options.method : 'get',
    data: options.body ? options.body: null,
    params: options.query ? options.query : null,
  })
  return data;
}

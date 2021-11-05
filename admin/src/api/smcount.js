import api from "./instance";

const smcounts = {
    fetch: (language = "eng") => api.get("smcount/get")
};

export default smcounts;
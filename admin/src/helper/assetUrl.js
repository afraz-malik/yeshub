import { WEBSITE_URL } from "../config/config";

const assetUrl = (url) => {
  return `${WEBSITE_URL}${url}`;
};

export default assetUrl;

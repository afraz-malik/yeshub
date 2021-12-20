export const WEBSITE_URL = `${window.location.protocol}//${process.env.REACT_APP_API_URL}/`;

// export const WEBSITE_URL = `https://${process.env.REACT_APP_API_URL}/`;

export const ACTIVATE_LOADER = "activate-loader";
export const DEACTIVATE_LOADER = "hide-loader";
export const MAIN_WEBSITE = `${window.location.protocol}//${process.env.REACT_APP_MAIN_WEBSITE}/`;
export const API_WEBSITE = `${WEBSITE_URL}api/`;

export const EDITOR_CONFIG = {
    uploader: {
        insertImageAsBase64URI: true,
    },
};

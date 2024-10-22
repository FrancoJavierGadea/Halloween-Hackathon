import { CONFIG } from "./Cloudinary.js";
import bg from "@assets/background.lnkspace.svg?url";

export function initWidget(listener = () => {}) {

    if(!window.cloudinary) throw new Error('Cloudinary loader script is not loaded');

    const config = {
        cloudName: CONFIG.CLOUD_NAME,

        uploadPreset: CONFIG.UPLOAD_PRESETS.DEFAULT,

        sources: ['local', 'url', 'camera', 'image_search', 'google_drive', ],

        styles:{
            palette: {
              window: "#141414",
              windowBorder: "#90A0B3",
              tabIcon: "#ff791f",
              menuIcons: "#ffffff",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link:  "#ff791f",
              action:  "#FF620C",
              inactiveTabIcon: "#ffffff",
              error: "#F44235",
              inProgress: "#ff791f",
              complete: "#20B832",
              sourceBg: "#2c2c2c"
            },
            frame: {
              background: '#000'
            },
        },

        detection: 'adv_face',

        uploadSignature: (cb, paramsToSign, e) => {

            fetch('/api/sign-upload', {
                method: 'POST',
                body: JSON.stringify(paramsToSign),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(response => {

                console.log(response.status);

                return response.json();
            })
            .then(result => {

                console.log(result);
                cb(result.sign);
            })
        },

        api_key: '689196284455697'
    };

    const callback = (error, result) => {

        if (!error && result && result.event === "success") {

            listener(result);
        }
    }

    const widget = window.cloudinary.createUploadWidget(config, callback);

    return widget;
}
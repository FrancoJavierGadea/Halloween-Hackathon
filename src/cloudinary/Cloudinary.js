import {Cloudinary, transformationStringFromObject} from "@cloudinary/url-gen";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { generativeRestore } from "@cloudinary/url-gen/actions/effect";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";




const CLOUDINARY = new Cloudinary({

    cloud: {
        cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: import.meta.env.PUBLIC_CLOUDINARY_APP_KEY
    },
    url: {
        secure: true // force https, set to false to force http
    },
});

async function getImage(publicID, config = {}){

    const {retryTime = 4000, width = 500, height = 500} = config;

    const image = CLOUDINARY.image(publicID);

    image.resize(
        crop()
            .width(width)
            .height(height)
            .gravity(focusOn(face()))
    )
    .effect(generativeRestore());

    const url = image.toURL();

    const {promise, resolve} = Promise.withResolvers();

    const img = new Image();

    img.src = url;

    img.addEventListener('load', () => {

        //Image loaded status 200
        resolve({image, url});
    });

    img.addEventListener('error', () => {

        //Image not loaded status 423, try again
        setTimeout(() => img.src = url, retryTime);
    });

    return promise;
}

const IA_EFFECTS = {
    GEN_REPLACE: (config = {}) => {

        return 'gen_replace:' + 
            Object.entries(config)
                .map(([key, value]) => `${key}_${value}`)
                .join(';');
    },

    GEN_BACKGROUND_REPLACE: (config = {}) => {

        return 'gen_background_replace:' +
            `prompt_${config.prompt}`;
    },

    GEN_RESTORE: 'gen_restore'
}

export default CLOUDINARY;

export { getImage, IA_EFFECTS };
import {Cloudinary, transformationStringFromObject} from "@cloudinary/url-gen";
import CONFIG from "@/cloudinary/cloudinary.json";

const CLOUDINARY = new Cloudinary({

    cloud: {
        cloudName: CONFIG.CLOUD_NAME
    },
    url: {
        secure: true // force https, set to false to force http
    }
});

async function getImage(publicID, transformation){

    const image = CLOUDINARY.image(publicID);

    if(transformation){

        image.addTransformation(
            transformationStringFromObject(transformation)
        );
    }

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
        setTimeout(() => img.src = url, 3000);
    });

    //setTimeout(() => resolve({image, url}), 150000);

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

export { CONFIG, getImage, IA_EFFECTS };
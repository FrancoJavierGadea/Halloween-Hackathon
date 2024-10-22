
import masks from "@assets/real-masks/index.js";
import CLOUDINARY from "./Cloudinary.js";
import { crop, scale } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Transformation } from "@cloudinary/url-gen";

export const MASKS = {

    SKULL_1: {
        name: 'Skull 1',
        path: 'masks/skull-1',
        size: 1.7,
        icon: masks['skull-1.png']
    },
    SKULL_2: {
        name: 'Skull 2',
        path: 'masks/skull-2',
        size: 1.15,        
        icon: masks['skull-2.png']
    },
    JOKER: {
        name: 'Joker',
        path: 'masks/joker',
        size: 2.0,        
        icon: masks['joker.png']
    },
    SAW: {
        name: 'Jigsaw',
        path: 'masks/saw',
        size: 1.8,        
        icon: masks['saw.png']
    },
    ANONIMUS: {
        name: 'Anonimous',
        path: 'masks/anonimus',
        size: 1.25,
        icon: masks['anonimus.png']
    },
    NIGHT_KING: {
        name: 'Night king',
        path: 'masks/night-king',
        size: 1.8,
        icon: masks['night-king.png']
    },
    APE: {
        name: 'Ape',
        path: 'masks/ape',
        size: 1.6,
        icon: masks['ape.png']
    },
    ZOMBIE: {
        name: 'Zombie',
        path: 'masks/zombie',
        size: 2.1,
        icon: masks['zombie.png']
    },
    MYERS: {
        name: 'Myers',
        path: 'masks/myers',
        size: 1.5,
        icon: masks['myers.png']
    }

};


export async function applyMask(publicID, mask, config = {}) {

    const {retryTime = 4000, x = 0, y = 0, scale: _scale = 1} = config;

    const _image = CLOUDINARY.image(publicID);

    _image.resize(
        crop()
            .width(500)
            .height(500)
            .gravity(focusOn(face()))
    )
    .overlay(
        source(
            image(mask.path).transformation(
                new Transformation()
                    .resize(
                        scale().width(mask.size * _scale).regionRelative()
                    )
            )
        )
        .position(
            new Position()
                .gravity(focusOn("adv_faces"))
                .offsetX(x)
                .offsetY(y)
        )
    );
        

    const url = _image.toURL();

    //Check if image is ready
    const {promise, resolve} = Promise.withResolvers();

    const img = new Image();

    img.src = url;

    img.addEventListener('load', () => {

        //Image loaded status 200
        resolve({image: _image, url});
    });

    img.addEventListener('error', () => {

        //Image not loaded status 423, try again
        setTimeout(() => img.src = url, retryTime);
    });

    return promise;
}
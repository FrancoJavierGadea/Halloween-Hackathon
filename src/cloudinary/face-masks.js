import white_skull from "@assets/icons/skull-1.svg?url";
import mexican_skull from "@assets/icons/skull-2.svg?url";
import clown from "@assets/icons/clown-1.svg?url";
import pirate from "@assets/icons/pirate.svg?url";
import zombie from "@assets/icons/zombie.svg?url";
import CLOUDINARY from "./Cloudinary.js";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { generativeReplace } from "@cloudinary/url-gen/actions/effect";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";



export const FACE_MASKS = {
    WHITE_SKULL: {
        name: 'White Skull',
        prompt: {
            from: 'the face completely by painting over it covering it entirely',
            to: "A Halloween makeup mask that preserve original face and resembles a skeletal face with stark white bone structures across the entire skull including the cheekbones jawline and forehead featuring hollow black eyes and deep shadows around the mouth and nose creating a haunting and unsettling appearance that is entirely black and white with no vibrant colors the design should evoke a sense of discomfort similar to a deathly grim figure",
        },
        icon: white_skull,
    },
    MEXICAN_SKULL: {
        name: 'Mexican Skull',
        prompt: {
            from: 'the face completely by painting over it covering it entirely',
            to: "A Halloween makeup mask that preserve original face and resembles a skeletal face with stark white bone structures across the entire skull including cheekbones jawline and forehead featuring hollow black eyes deep shadows around the mouth and nose with intricate colorful details like red being the predominant color along with accents of blue red and yellow creating a haunting yet artistic contrast the design should evoke discomfort while incorporating vibrant decorative patterns that enhance the eerie skeletal appearance",
        },
        icon: mexican_skull,
    },
    PIRATE_SKULL: {
        name: 'Pirate Skull',
        prompt: {
            from: 'the face completely by painting over it covering it entirely',
            to: "A pirate skeleton mask with a white base showing bone structures across the entire face with prominent cheekbones a hollowed-out nose and black sunken eyes the mouth is painted with a wide skeletal grin showing teeth extending up to the cheekbones dark cracks and shadows are added to enhance the bony appearance around the eyes and mouth the mask is decorated with pirate-themed details such as a red bandana painted across the forehead and a black eyepatch over one eye giving the illusion of a classic pirate look while maintaining the eerie skeletal structure",
        },
        icon: pirate
    },
    CLOWN: {
        name: 'Clown',
        prompt: {
            from: 'the face completely by painting over it covering it entirely',
            to: "A Halloween makeup mask that resembles a clown face inspired by the Joker with a white base featuring exaggerated red lips extending into a sinister grin hollow black eyes with dark circles around them and a prominent jagged smile highlighted with vivid red accents and colorful details like green and purple adding a vibrant yet unsettling contrast creating a playful yet menacing appearance that evokes discomfort and captures the essence of a creepy clown",
        },
        icon: clown,
    },
    ZOMBIE: {
        name: 'Zombie',
        prompt: {
            from: 'the face completely by painting over it covering it entirely',
            to: "A decaying zombie face with rotting flesh hanging loosely from the bone the skin is grayish-green with patches of deep rot and open wounds the lower jawbone is partially exposed with tattered flesh barely clinging to it revealing broken yellowed teeth beneath hollow eye sockets stare out with one eye missing and the other glazed over with decay the nose is mostly gone leaving a gaping hole while the cheeks are sunken in with jagged tears in the skin",
        } ,
        icon: zombie
    }
};


export const EXAMPLES = [
    'samples/people/smiling-man.jpg',
    'samples/smile.jpg',
    'midudev.jpg'
];


export function applyMask(publicID, mask, config = {}){
    
    const {retryTime = 4000} = config;

    const image = CLOUDINARY.image(publicID);

    image.resize(
        crop()
          .width(500)
          .height(500)
          .gravity(focusOn(face()))
    )
    .effect(
        generativeReplace()
        .from(mask.prompt.from)
        .to(mask.prompt.to)
        .preserveGeometry()
        .detectMultiple()
    );

    const url = image.toURL();

    //Check if image is ready
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
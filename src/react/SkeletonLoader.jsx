import { useEffect, useState } from "react";
import SKELETON from "@assets/sketon-loader/index.js";

const MESSAGES = {
    es: [
        "Agregando un toque espectral...",
        "Invocando fantasmas amistosos...",
        "Susurrando secretos del más allá...",
        "Cargando sustos escalofriantes...",
        "Invocando espíritus juguetones...",
        "Agregando niebla sobrenatural...",
        "Apareciendo desde otra dimensión...",
        "Preparando un viaje al mundo espectral...",
        "Espantando tus preocupaciones...",
        "Desmaterializando tu forma terrenal...",
        "Sintiendo un escalofrío fantasmal...",
    ],
    en: [
        "Adding a spectral touch...",
        "Summoning friendly ghosts...",
        "Whispering secrets from beyond...",
        "Loading chilling scares...",
        "Invoking playful spirits...",
        "Adding supernatural mist...",
        "Appearing from another dimension...",
        "Preparing a journey to the spectral world...",
        "Spooking away your worries...",
        "Dematerializing your earthly form...",
        "Feeling a ghostly chill...",
    ]
};


export default function SkeletonLoader({statusText, messages = MESSAGES.es, time = 3500}){

    const [currentMessage, setCurrentMessage] = useState(messages.at(0));

    useEffect(() => {

        if(messages.length <= 1) return;

        const intervalID = setInterval(() => {

            const n = Math.floor(Math.random() *  messages.length);

            setCurrentMessage(messages[n]);

        }, time);

        return () => {

            clearInterval(intervalID);
        }

    }, [messages, time]);


    const [currentImage, setCurrentImage] = useState(SKELETON.at(0));

    useEffect(() => {

        if(SKELETON.length <= 1) return;

        const intervalID = setInterval(() => {

            const n = Math.floor(Math.random() *  SKELETON.length);

            setCurrentImage(SKELETON[n]);

        }, time);

        return () => {

            clearInterval(intervalID);
        }

    }, [SKELETON, time]);

    return <div className="Skeleton-loader">

        <img src={currentImage} />

        <p className="Message">{currentMessage}</p>

        { statusText && 
            <p className="Status-text">{statusText}</p>
        }
    </div>
}
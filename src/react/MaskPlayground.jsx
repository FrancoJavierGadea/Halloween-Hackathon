
import { getImage, IA_EFFECTS } from "@cloudinary/Cloudinary.js";
import {EXAMPLES, FACE_MASKS} from "@cloudinary/face-masks.js";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";


import "./MaskPlayground.css";
import SkeletonLoader from "./SkeletonLoader.jsx";
import UploadWiget from "./UploadWidget.jsx";





export default function MaskPlayground({}){

    const [publicID, setPublicID] = useState(EXAMPLES.at(1));

    const [originalImage, setOriginalImage] = useState(null);

    useEffect(() => {

        getImage(publicID, [
            { gravity: "face", height: 400, width: 400, crop: "auto" },
            { quality: "auto", fetch_format: "auto" },
            { effect: IA_EFFECTS.GEN_RESTORE },
        ])
        .then((result) => {

            setOriginalImage(result?.url);
        });

    }, [publicID]);


    //MARK: Masks
    const [currentMask, setCurrentMask] = useState('WHITE_SKULL');

    const [masks, setMasks] = useState(null);

    const [cont, setCont] = useState(0);

    useEffect(() => {

        (async () => {

            const promises = Object.entries(FACE_MASKS)
            .map(async ([key, mask]) => {

                const result = await getImage(publicID, [
                    { gravity: "face", height: 400, width: 400, crop: "auto" },
                    { quality: "auto", fetch_format: "auto" },
                    { effect: IA_EFFECTS.GEN_RESTORE },
                    { 
                        effect: IA_EFFECTS.GEN_REPLACE({
                            'from': mask.prompt.from,
                            'to': mask.prompt.to,
                            'preserve-geometry': true,
                            'multiple': true
                        })
                    }, 
                ]);

                setCont(v => ++v);

                return [key, result?.url];
            });

            const result = await Promise.all(promises);
            const masks = Object.fromEntries(result);
            
            setMasks(masks);
            setCont(0);
        })();
        
    }, [publicID]);


    const imageLoaded = useCallback((result) => {

        setPublicID(result.info.public_id);
        setCont(0);
        setOriginalImage(null);
        setMasks(null);

    }, []);

    //MARK: JSX
    return <div className="Mask-Playground">

        <div className="Images-container">

            <div className="Original-image">
                { originalImage ? 
                    <img src={originalImage} /> 
                    : 
                    <basic-loader />
                }  
            </div>

            <div className="Transform-image">
                { masks ?
                    <img src={masks[currentMask]} />
                    :
                    <SkeletonLoader statusText={`Loading... ${cont}/${Object.values(FACE_MASKS).length}`} />
                }
            </div>
        </div>


        <div className="Mask-Playground-controls">

            <UploadWiget onLoad={imageLoaded} />
            
            {
                Object.entries(FACE_MASKS).map(([key, {name, icon}], i) => {

                    return <button className={clsx('btn', {'btn-active': key === currentMask})} 
                    
                        value={key} title={name} key={`btn-${key}`}
                    
                        onClick={(e) => setCurrentMask(e.currentTarget.value)} 
                    >
                        <img src={icon} alt="" />
                    </button>
                })
            }
        </div>

        
    </div>
}
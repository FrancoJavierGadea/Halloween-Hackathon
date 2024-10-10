
import { getImage, IA_EFFECTS } from "@cloudinary/Cloudinary.js";
import {FACE_MASKS} from "@cloudinary/face-masks.js";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";


import "./MaskPlayground.css";


export default function MaskPlayground({publicID = 'midudev'}){

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

    useEffect(() => {

        (async () => {

            const promises = Object.entries(FACE_MASKS)
            .map(async ([key, mask]) => {

                const result = await getImage(publicID, [
                    { gravity: "face", height: 400, width: 400, crop: "auto" },
                    { quality: "auto", fetch_format: "auto" },
                    { effect: IA_EFFECTS.GEN_RESTORE },
                    {
                        effect: IA_EFFECTS.GEN_BACKGROUND_REPLACE({
                            prompt: 'Replace the background with a night very creepy scene'
                        })
                    },
                    { 
                        effect: IA_EFFECTS.GEN_REPLACE({
                            'from': 'Face',
                            'to': mask.prompt,
                            'preserve-geometry': true,
                            'multiple': true
                        })
                    }, 
                ]);

                return [key, result?.url];
            });

            const result = await Promise.all(promises);

            const masks = Object.fromEntries(result);

            setMasks(masks);
        })();
        
    }, [publicID]);

    //MARK: JSX
    return <div className="Mask-Playground">

        <div className="Images-container">

            <div className="Original-image">
                { originalImage ? 
                    <img src={originalImage} /> 
                    : 
                    'Loading...'
                }  
            </div>

            <div className="Transform-image">
                { masks ?
                    <img src={masks[currentMask]} />
                    :
                    'Loading...'
                }
            </div>
        </div>


        <div className="Mask-Playground-controls">
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
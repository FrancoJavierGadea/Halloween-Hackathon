

import { applyMask, MASKS } from "@/cloudinary/real-mask.js";
import { getImage } from "@cloudinary/Cloudinary.js";
import { EXAMPLES } from "@cloudinary/face-masks.js";
import { useCallback, useEffect, useState } from "react";
import UploadWiget from "./UploadWidget.jsx";
import clsx from "clsx";

import "@react/OverlayPlayground.css";
import SkeletonLoader from "./SkeletonLoader.jsx";

export default function OverlayPlayground(){


    const [publicID, setPublicID] = useState(EXAMPLES.at(1));

    const [originalImage, setOriginalImage] = useState(null);

    useEffect(() => {

        getImage(publicID)
        .then((result) => {

            setOriginalImage(result?.url);
        });

    }, [publicID]);


    const [currentMask, setCurrentMask] = useState('SKULL_1');

    const [image, setImage] = useState(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [scale, setScale] = useState(1);

    useEffect(() => {

        setImage(null);

        const timeoutID = setTimeout(() => {

            const mask = MASKS[currentMask];
    
            applyMask(publicID, mask, {x, y, scale})
            .then(({url}) => {
    
                setImage(url);
            })

        }, 2500);


        return () => {

            if(timeoutID) clearTimeout(timeoutID);
        }

    }, [publicID, currentMask, x, y, scale]);


    const imageLoaded = useCallback((result) => {

        setPublicID(result.info.public_id);

        setOriginalImage(null);
        setImage(null);
        setX(0);
        setY(0);
        setScale(1);

    }, []);




    //MARK: JSX
    return <div className="Overlay-playground">

        <div className="Images-container">

            <div className="Original-image">
                { originalImage ? 
                    <img src={originalImage} /> 
                    : 
                    <basic-loader />
                }  
            </div>

            <div className="Transform-image">
                { image ?
                    <img src={image} />
                    :
                    <SkeletonLoader />
                }
            </div>
        </div>


        <div className="Overlay-playground-controls">

            <UploadWiget onLoad={imageLoaded} />

            <div className="input-group">
                <button className="form-control" onClick={() => setX(v => --v)}>-</button>
                <span className="input-group-text">
                    <strong className="me-1">Move X:</strong> {x}
                </span>
                <button className="form-control" onClick={() => setX(v => ++v)}>+</button>
            </div>

            <div className="input-group">
                <button className="form-control" onClick={() => setY(v => --v)}>-</button>
                <span className="input-group-text">
                    <strong className="me-1">Move Y:</strong> {y}
                </span>
                <button className="form-control" onClick={() => setY(v => ++v)}>+</button>
            </div>

            <div className="input-group">
                <button className="form-control" onClick={() => setScale(v => Number((v - 0.01).toFixed(2)))}>-</button>
                <span className="input-group-text">
                    <strong className="me-1">Scale:</strong> {scale}
                </span>
                <button className="form-control" onClick={() => setScale(v => Number((v + 0.01).toFixed(2)))}>+</button>
            </div>
        </div>

        <div className="Masks-controls">
            {
                Object.entries(MASKS).map(([key, {name, icon}], i) => {

                    return <button className={clsx('btn', {'btn-active': key === currentMask})} 
                    
                        value={key} title={name} key={`btn-${key}`}
                    
                        onClick={(e) => setCurrentMask(e.currentTarget.value)} 
                    >
                        <img src={icon} alt={`Mask of ${name}`} loading="lazy" />
                    </button>
                })
            }
        </div>
    </div>;
}
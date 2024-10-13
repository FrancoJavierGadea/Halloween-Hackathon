import { initWidget } from "@cloudinary/WidgetLoader.js";
import { useMemo } from "react"


export default function UploadWiget({onLoad = () => {}}){

    const widget = useMemo(() => {

        return initWidget(onLoad);

    }, [onLoad]);

    return <>
    
        <button className="btn btn-primary Upload-btn" onClick={() => widget.open()}>
            Upload Image
        </button>
    </>
}
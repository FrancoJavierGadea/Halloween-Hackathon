
import { v2 as cloudinary } from "cloudinary";


export const prerender = false;



export const POST = async ({request}) => {
    
    console.log(import.meta.env);
    
    if(request.headers.get("Content-type") === 'application/json'){

        const paramsToSign = await request.json();

        const sign = cloudinary.utils.api_sign_request(paramsToSign, import.meta.env.CLOUDINARY_APP_SECRET);

        return new Response(
            JSON.stringify({
                message: "Operation successful",
                sign
            }),
            {
                status: 200,
            }
        );
    }

    return new Response(
        JSON.stringify({
            message: "Error",
        }),
        {
            status: 400,
        }
    );
}

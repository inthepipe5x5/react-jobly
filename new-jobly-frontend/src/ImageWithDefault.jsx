/* eslint-disable react/prop-types */
// ImageWithDefault.jsx
import {Icons8} from './assets/icons8-company-100.png'
import teamworkImg from "./assets/teamwork.png";
import { useState } from 'react';


const ImageWithDefault = ({ src, defaultSrc, altInfo }) => {
    const [imageSrc, setImageSrc] = useState(src);


    const handleError = () => {
        //set defaultSrc according to type
        defaultSrc = defaultSrc === 'company' ? Icons8 : teamworkImg  
        setImageSrc(defaultSrc);
    };

    return (
        <img
            src={imageSrc}
            onError={handleError}
            alt={altInfo}
            className="mt-3"
            style={{ maxWidth: "200px", height: "auto" }}    
            >
        </img>
    )
}

export default ImageWithDefault

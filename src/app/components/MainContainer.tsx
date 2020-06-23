import React, { useEffect, useState } from 'react';
import {imageService} from '../services/image-service'
import Main from './Main'

export default function MainContainer(){
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    useEffect( ()=>{
        const getImages = async () => {
            setIsLoading(true);
            try {
              const images = await imageService.getImages();
              setImages(images)
             
            } catch (error) {
              // TODO: errors
            }
            setIsLoading(false);
          };
          getImages();
    },[])


    return (
        <div>
            {
            !isLoading && (  <Main images={images}></Main>)
                  
            }
        </div>
    )
}
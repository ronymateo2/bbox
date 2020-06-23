import React, { useEffect, useState } from 'react';
import { imageService } from '../services/image-service'
import Main from '../components/Main'
import { useDispatch, useSelector } from 'react-redux';
import { add, update, redo, undo } from '../store/actions'
import { store } from '../store/store'
import { Rectangle } from '../model/rectangle';
import { Box } from '../model/box';
import { AppState } from '../model/appState';
export default function MainContainer() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [rectangles, setRectangles] = React.useState<Rectangle[]>([]);
  const [currentImg, setCurrentImg] = React.useState<string>('');
  const [box, setBox] = React.useState<Box>();
  const boxes = useSelector((state : AppState) => state.boxes)

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      try {
        const images = await imageService.getImages();
        setCurrentImg(images[0]) // TODO: validation in case no images
        setImages(images)
        setBox(getBox(images[0]))
      } catch (error) {
        // TODO: handle errors
      }
      setIsLoading(false);
    };
    getImages();
  }, [])

  function getBox(id: string) {
    return store.getState().boxes.find(b => b.url == id)
  }

  function onRedo(currentImg: string) {
    dispatch(redo(currentImg))
    const box = getBox(currentImg)
    setRectangles([...box!.past, box!.present])
    setBox(box)
  }

  function onUndo(currentImg: string) {
    dispatch(undo(currentImg))
    const box = getBox(currentImg)
    setRectangles([...box!.past, box!.present])
    setBox(box)
  }


  function onSumbit() {

  }

  function onPreviewChanged(img: string) {
    debugger;
    setCurrentImg(img) // TODO: validation in case no images
    const box = getBox(img)
    if(box){
      setRectangles([...box!.past, box!.present])
      setBox(box)
    }else{
      setRectangles([])
      setBox(undefined)
    }
  }

  function onUpdate(news: Rectangle[], currentImg: string) {
    setRectangles(news.map(r => ({ ...r })))
    const box = getBox(currentImg)
    if (!box) {
      const newPast = news.slice(0, news.length - 1)
      dispatch(add({
        url: currentImg,
        future: [],
        past: newPast,
        present: news[news.length - 1]
      }))
    }
    else {
      const present = news[news.length - 1]
      const newPast = news.slice(0, news.length - 1)

      dispatch(update({
        url: currentImg,
        future: [],
        past: newPast,
        present: present
      }))
    }
    setBox(getBox(currentImg))
  }

  return (
    <div>
      {!isLoading && (<Main
        rectangles={rectangles}
        images={images}
        onRedo={onRedo}
        onUndo={onUndo}
        onUpdate={onUpdate}
        onSumbit={onSumbit}
        box={box!}
        boxes= {boxes}
        currentImg={currentImg}
        onPreviewChanged={onPreviewChanged}

      ></Main>)}
    </div>
  )
}
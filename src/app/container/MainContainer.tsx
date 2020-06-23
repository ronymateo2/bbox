import React, { useEffect, useState } from 'react';
import { imageService } from '../services/image-service'
import Main from '../components/Main'
import { useDispatch } from 'react-redux';
import { add, update, redo, undo } from '../store/actions'
import { store } from '../store/store'
import { Rectangle } from '../model/rectangle';
export default function MainContainer() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [rectangles, setRectangles] = React.useState<Rectangle[]>([]);
  const [currentImg, setCurrentImg] = React.useState<string>('');


  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      try {
        const images = await imageService.getImages();
        setCurrentImg(images[0]) // TODO validation in case no images
        setImages(images)

      } catch (error) {
        // TODO: handle errors
      }
      setIsLoading(false);
    };
    getImages();
  }, [])

  function onRedo(currentImg: string) {
    dispatch(redo(currentImg))
    const box = store.getState().boxes.find(b => b.url == currentImg)
    setRectangles([...box!.past, box!.present])
  }

  function onUndo(currentImg: string) {
    dispatch(undo(currentImg))
    const box = store.getState().boxes.find(b => b.url == currentImg)
    setRectangles([...box!.past, box!.present])
  }

  function onSumbit() {



  }


  function onPreviewChanged() {

  }

  function onUpdate(news: Rectangle[], currentImg: string) {
    setRectangles(news.map(r => ({ ...r })))
    const box = store.getState().boxes.find(b => b.url == currentImg)
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
        currentImg={currentImg}
        onPreviewChanged={onPreviewChanged}

      ></Main>)}
    </div>
  )
}
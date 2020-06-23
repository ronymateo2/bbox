import React, { Fragment } from 'react';
import Title from "./Title";
import { Box } from '@material-ui/core';
import { Rectangle } from '../model/rectangle';

function draw(ctx: CanvasRenderingContext2D, rectangles: Rectangle[],
    img: HTMLImageElement) {
    ctx.clearRect(0, 0, img.width, img.height);
    ctx.drawImage(img, 0, 0);
    ctx.strokeStyle = "limegreen";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (var i = 0; i < rectangles.length; ++i) {
        var rectangle = rectangles[i];
        ctx.rect(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height
        );
    }
    ctx.stroke();

}

function getMousePosition(canvas: HTMLCanvasElement, evt: MouseEvent): [number, number] {
    if (canvas && evt) {
        let bounds = canvas.getBoundingClientRect();
        return [
            evt.clientX - bounds.left,
            evt.clientY - bounds.top
        ];
    }
    return [0, 0]
}

interface ViewerProps {
    img: string,
    rectanges: Rectangle[]
    updateRectanges: (rec: Rectangle[]) => void
}

export default function Viewer(props: ViewerProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
    React.useEffect(() => {
        let img: HTMLImageElement;
        let imgSrc = props.img;
        let rectangles: Rectangle[] = props.rectanges.map(r => ({ ...r }))
        let isDrawing = false;
        let mouseStartX = 0.0;
        let mouseStartY = 0.0;
        let mouseEndX = 0.0;
        let mouseEndY = 0.0;

        function handleMouseDown(evt: MouseEvent) {
            if (!isDrawing) {
                isDrawing = true;
                [mouseStartX, mouseStartY] = getMousePosition(canvasRef.current!, evt);
                canvasRef.current!.style.cursor = "crosshair";
            }
        }

        function handleMouseUp(evt: MouseEvent) {
            if (isDrawing) {
                isDrawing = false;
                [mouseEndX, mouseEndY] = getMousePosition(canvasRef.current!, evt);
                rectangles.push({
                    x: mouseStartX,
                    y: mouseStartY,
                    width: mouseEndX - mouseStartX,
                    height: mouseEndY - mouseStartY
                } as Rectangle)

                draw(context!, rectangles, img)

                canvasRef.current!.style.cursor = "default";
                props.updateRectanges(rectangles)
            }
        }

        function handleMouseMove(evt: MouseEvent) {
            if (isDrawing) {
                [mouseEndX, mouseEndY] = getMousePosition(canvasRef.current!, evt);
                draw(context!, rectangles, img)
                context!.strokeStyle = "darkred";
                context!.lineWidth = 2;
                context!.beginPath();
                context!.rect(
                    mouseStartX,
                    mouseStartY,
                    mouseEndX - mouseStartX,
                    mouseEndY - mouseStartY
                );
                context!.stroke();
            }
        }

        function imageLoad() {
            context!.clearRect(0, 0, img.width, img.height);
            canvasRef.current!.width = img.width;
            canvasRef.current!.height = img.height;
            context!.drawImage(img, 0, 0);
            draw(context!, rectangles, img)
        }

        if (canvasRef.current) {
            const renderCtx = canvasRef.current.getContext('2d');
            if (renderCtx) {
                canvasRef.current.addEventListener('mousedown', handleMouseDown);
                canvasRef.current.addEventListener('mouseup', handleMouseUp);
                canvasRef.current.addEventListener('mousemove', handleMouseMove);
                setContext(renderCtx);
            }
            if (context) {
                img = new Image();
                img.addEventListener('load', imageLoad)
                img.src = imgSrc;
            }

            return function clenup() {
                if (canvasRef.current) {
                    canvasRef.current.removeEventListener('mousedown', handleMouseDown);
                    canvasRef.current.removeEventListener('mouseup', handleMouseUp);
                    canvasRef.current.removeEventListener('mousemove', handleMouseMove);
                }

                if (img) {
                    img.removeEventListener('load', imageLoad)
                }
            }
        }
    }, [context, props.img, props.rectanges]);

    return (
        <Fragment>
            <Title>Main View</Title>
            <Box m={1} justifyContent="center" display="flex">
                <canvas
                    id="canvas"
                    ref={canvasRef}
                    style={{
                        margin: "auto",
                        display: "block"
                    }}
                ></canvas>
            </Box>
        </Fragment>
    )
}
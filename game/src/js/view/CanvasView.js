import {canvasController} from "../index";

export default class CanvasView{
    addImage(addImages, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight){

        let img = new Image();

        img.onload = function(){
            if(sx && sy){
                canvasController.cnvContext().drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            else if(dWidth && dHeight)
                canvasController.cnvContext().drawImage(img, dx, dy, dWidth, dHeight);
            else
                canvasController.cnvContext().drawImage(img, dx, dy);

        };

        img.src = addImages;
    }
}
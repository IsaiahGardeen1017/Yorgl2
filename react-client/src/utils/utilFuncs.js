export function getImageSrcFromImages(images, maxSize){
    if(!images){
        return '';
    }
    if(images.length === 1){
        return images[0].url;
    }
    let url = '';
    let currSize = 0;
    for(const image of images){
        const size = image.width;
        if(size <= maxSize){
            if(size > currSize){
                currSize = size;
                url = image.url;
            }
        }
    }
    return url;
}
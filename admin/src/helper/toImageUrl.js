import isBaseEncoded from './isBaseEncoded';
import isFullUrl from './isFullUrl';
const baseurl = `${window.location.protocol}//${process.env.REACT_APP_API_URL}/`;

export default function(image = "" ){
    // alert(image);
    if(isBaseEncoded(image)) {
      return image;
    }
  
    if(isFullUrl(image)) {
      return image;
    }
  
    return baseurl + image;
}

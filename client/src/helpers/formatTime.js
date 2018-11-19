const formatTime = (hours, mins, secs) => {
  let formatedTime = '';
  const separator = ':';
  if(hours > 0) {
    if(hours.toString().length > 1){
      formatedTime += hours + separator;
    } else {
      formatedTime += '0' + hours + separator;
    }
  }

  if (mins.toString().length > 1) {
    formatedTime += mins + separator;
  } else {
    formatedTime += '0' + mins + separator;
  }

  if (secs.toString().length > 1) {
    formatedTime += secs;
  } else {
    formatedTime += '0' + secs;
  }

  return formatedTime;
}

export default formatTime;
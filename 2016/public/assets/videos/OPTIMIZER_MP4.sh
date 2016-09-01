#! /bin/bash

while true; do
    echo "What video?";
    read -e file

    if [ ! -e $file ]; then
      echo "File not found!"
    else

      echo "\n\nOPTIMIZING MP4\n\n";
      ffmpeg -i $file -c:v libx264 -crf 22 -c:a libvo_aacenc -movflags faststart "${file/\.mp4|\.m4v/-final.mp4}";
      
      echo "\n\nCONVERTING TO WEBM\n\n";
      ffmpeg -i "${file/\.mp4|\.m4v/-final.mp4}" "${file/\.mp4/-final.webm}"

      break;
    fi

done


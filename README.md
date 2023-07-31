# thumbnailDonloader

Passes through the mp3 files then let you to select cover images from a browser 
then it tags them into the ID3 tags of the correspond mp3 files.

## usage
Put your mp3 files in the source folder.

Then run:
```powershell
npm start

//web browser will open for you
```
After you run it a google images page will be open all you need is to select the image 
and then press `F1` it will tag the selected image to the correspond mp3 file
then will pass to the next mp3 file untill will iterate through them all.

### this is how to select the image:
<p align="left">
  <img width="800" src="https://github.com/matan-chan/thumbnailDonloader/blob/main/example/screenshot.jpg?raw=true">
</p>

after this  you press the `F1` bottom.

this is the logs
```powershell
100_gecs_757_{official_audio}.mp3 download Completed
faild to download איזי_מריאור_רשמי_e_z_marior_official.mp3 thumbnail
faild to download lord_of_the_lost_the_curtain_falls_napalm_records.mp3 thumbnail
```

The downloaded files can be found the `finishedMusic` folder.

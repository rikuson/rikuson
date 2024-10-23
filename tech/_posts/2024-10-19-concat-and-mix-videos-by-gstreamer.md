---
layout: post
title: Concatenating and Mixing Video Files with GStreamer
image: https://rikson.imgix.net/2024-10-19-concat-and-mix-videos-by-gstreamer.jpg
---

In this guide, I'll show you how to dynamically concatenate and mix video files using GStreamer, including a shell script that make it more flexible. For this demonstration, we'll use the popular open-source video *Big Buck Bunny* (1080p), which can be downloaded from the official Blender project page:

<https://peach.blender.org>

## Video Concatenation

Let’s start by concatenating two video files. The following GStreamer command attempts to concatenate two files. It works for some video files but, unfortunately, *Big Buck Bunny* fails to play in this case. The reason for this issue might require further investigation.

Here’s the GStreamer pipeline I used:

```
gst-launch-1.0 \
  concat name=concat_v ! autovideosink \
  concat name=concat_a ! autoaudiosink \
  filesrc location=input.mp4 ! qtdemux name=demux1 \
    demux1.video_0 ! queue ! decodebin ! concat_v. \
    demux1.audio_0 ! queue ! decodebin ! audioconvert ! concat_a. \
  filesrc location=input.mp4 ! qtdemux name=demux2 \
    demux2.video_0 ! queue ! decodebin ! concat_v. \
    demux2.audio_0 ! queue ! decodebin ! audioconvert ! concat_a.
```

This pipeline creates separate concatenation elements for video (`concat_v`) and audio (`concat_a`). Both input streams are demuxed, decoded, and passed through to their respective concatenation elements before being rendered by `autovideosink` and `autoaudiosink`.

## Split View: Displaying Multiple Videos Simultaneously

Next, we'll explore how to combine multiple videos into a split view. I’ll be splitting the screen into a 2x2 grid, with each section displaying a separate instance of the video. This is particularly useful for creating video walls or multi-screen setups.

For this example, I’m working on a MacBook Air with a 13.3-inch display (2560x1600 resolution), and since the aspect ratio of the video is 16:9, each screen will be 1280x800 to fit perfectly.

Here’s the GStreamer pipeline:

```
gst-launch-1.0 compositor name=mix \
  sink_1::xpos=0      sink_1::ypos=0 \
  sink_2::xpos=1280   sink_2::ypos=0 \
  sink_3::xpos=0      sink_3::ypos=800 \
  sink_4::xpos=1280   sink_4::ypos=800 \
  ! autovideosink \
  filesrc location="big_buck_bunny_1080p_h264.mov" ! qtdemux name=demux_1 \
    demux_1.video_0 ! queue ! decodebin ! videoscale ! video/x-raw,width=1280,height=800 ! mix.sink_1 \
    demux_1.audio_0 ! queue ! decodebin ! audioconvert ! autoaudiosink \
  filesrc location="big_buck_bunny_1080p_h264.mov" ! qtdemux name=demux_2 \
    demux_2.video_0 ! queue ! decodebin ! videoscale ! video/x-raw,width=1280,height=800 ! mix.sink_2 \
    demux_2.audio_0 ! queue ! decodebin ! audioconvert ! autoaudiosink \
  filesrc location="big_buck_bunny_1080p_h264.mov" ! qtdemux name=demux_3 \
    demux_3.video_0 ! queue ! decodebin ! videoscale ! video/x-raw,width=1280,height=800 ! mix.sink_3 \
    demux_3.audio_0 ! queue ! decodebin ! audioconvert ! autoaudiosink \
  filesrc location="big_buck_bunny_1080p_h264.mov" ! qtdemux name=demux_4 \
    demux_4.video_0 ! queue ! decodebin ! videoscale ! video/x-raw,width=1280,height=800 ! mix.sink_4 \
    demux_4.audio_0 ! queue ! decodebin ! audioconvert ! autoaudiosink
```

In this pipeline, we use the `compositor` element to lay out the video streams in a 2x2 grid. Each video is scaled to fit into a 1280x800 region of the screen. We also play the corresponding audio tracks for each video, which are routed through `autoaudiosink` for playback.

The result is a four-way split-screen, showing the same video in four quadrants of the display.





## Shell Script for Dynamic Concatenation and Mixing

If you want to automate the concatenation and mixing process, here's a shell script that can handle multiple video files dynamically. It takes multiple file paths as arguments and splits the display into a grid of video streams.

The grid can be customized by adjusting the `col` and `row` variables to determine how many videos to display simultaneously.

In my environment, I was able to split the display into as many as 42 regions by adding `sync=false` to the `autovideosink `element. Without this option, the limit was 36 regions.

`system_profiler` is to get the display resolution on macOS. You can replace it with other commands to get the display resolution on other platforms.
```
#!/bin/bash

resolution=$(system_profiler SPDisplaysDataType | grep Resolution | sed -E 's/[^0-9]+([0-9]+) x ([0-9]+).*/\1 \2/')
display_width=$(echo $resolution | awk '{print $1}')
display_height=$(echo $resolution | awk '{print $2}')

col=2
row=2
count=$((col * row))

video_width=854
video_height=480

aspect=$(echo "scale=2; $((display_width / col)) / $((display_height / row))" | bc)

if (( $(echo "$aspect > 16 / 9" | bc -l) )); then
  video_width=$((display_width / col))
  video_height=$((video_width * 9 / 16 + 1))
else
  video_height=$((display_height / row))
  video_width=$((video_height * 16 / 9 + 1))
fi

echo "Display Resolution: ${display_width}x${display_height}"
echo "Video Resolution: ${video_width}x${video_height}"

positions=()
for r in $(seq 0 $((row - 1))); do
  for c in $(seq 0 $((col - 1))); do
    xpos=$((c * display_width / col))
    ypos=$((r * display_height / row))
    positions+=("$xpos $ypos")
  done
done

compositor="compositor name=mix"
for ((i = 1; i <= count; i++)); do
  xpos=$(echo ${positions[$((i-1))]} | awk '{print $1}')
  ypos=$(echo ${positions[$((i-1))]} | awk '{print $2}')
  compositor+=" sink_$i::xpos=$xpos sink_$i::ypos=$ypos"
done

concats=""
i=0
for file in "$@"; do
  if [ "$i" -eq $count ]; then
    break
  fi
  i=$((i + 1))
  concats+="concat name=concat_${i}_v ! mix.sink_$i "
  concats+="concat name=concat_${i}_a ! level ! audioamplify amplification=1.0 ! autoaudiosink "
done

files=""
i=0
for file in $@; do
  n=$((i % count + 1))
  files+="filesrc location=${file} ! qtdemux name=demux_$i "
  files+="demux_$i.video_0 ! queue ! decodebin ! videoscale ! video/x-raw,width=${video_width},height=${video_height} ! concat_${n}_v. "
  files+="demux_$i.audio_0 ! queue ! decodebin ! audioconvert ! concat_${n}_a. "
  i=$((i + 1))
done

gst-launch-1.0 -q $compositor ! autovideosink $concats $files
```

### Playing Files Randomly

If you want to play the files in a random order, you can shuffle them with the following command:

```
ls /input/files/*.mp4 | shuf | xargs ./script.sh
```

This script provides a flexible solution for concatenating and mixing video files, allowing you to experiment with different layouts and video file combinations. Adjust the script as needed for your particular setup!

# How to set up
## 1. Install Google Assistant SDK
### https://developers.google.com/assistant/sdk/guides/service/python
## 2. Install Picovoice Porcupine
### https://github.com/Picovoice/porcupine#running-demo-applications
### Install the pip module
## 3. Configure pulseaudio
### install pavucontrol if you don't have it
### Create two sinks:
#### pactl load-module module-remap-sink sink_name=second master=alsa_output.pci-0000_00_05.0.analog-stereo
#### pactl load-module module-remap-sink sink_name=third master=alsa_output.pci-0000_00_05.0.analog-stereo
### if using the zoom linux client, set default input and output:
#### pacmd set-default-sink second
#### pacmd set-default-source third.monitor
### run pavucontrol to route audio
## 4. Start script:
### python pushtotalk.py --project-id <my-dev-project> --device-model-id <my-model>

# LA-Hacks-2020: Zoogle
### An interactive, voice-controlled Google assistant bot for Zoom meeting rooms.

## Inspiration

In this current quarantine, it seems like the whole world has moved to Zoom as their main outlet for collaboration and social interaction. In fact, our team was in a Zoom call trying to decide what to build for LA Hacks. During our brainstorm session, one of our team members began to play music for us using his phone through his headset. All of a sudden, Google Assistant was accidentally triggered, and a light bulb went off in our heads. The one thing we realized Zoom lacks is voice commands! We realized the power of such a feature and could not stop fantasizing about it, so we made it.

## Use Case

Picture this, you're in a meeting for a group research project and your team is debating the order of steps in photosynthesis. Instead of having one or more members tab out of the call, make a Google search, open a page, and read the answer out loud, someone can ask the bot and get an immediate response the whole group can hear! As the meeting progresses, you realize your group needs to stay quiet for half an hour to do some research - so, you tell the Zoom Bot to play some "lofi hip hop radio - beats to relax/study to." 

Now, let's say your team has finished the presentation and needs to practice. You can ask the Zoom Bot to set a timer to make sure your team doesn't go over your allotted presentation time while practicing. Finally, you've finished your meeting but realize your team should meet again for one more run-through, you can use the Zoom Bot to send a team calendar invite in the moment instead of after the fact.

Just in this one meeting, you can see that the Zoom Bot is very useful, as it leverages the full power of the Google Assistant and other Google services - imagine what you can do with it! 

## Using the Bot

Using the bot is simple! First, users log on to a web app we created in React and enter their meeting number and a username for the bot. After this, the bot will almost instantly join their meeting and be ready to listen and respond to commands! In the web app, the user who initialized bot can mute/unmute the bot at the push of the button as well as kick the bot from the meeting.

## Code
Dependencies: node.js, npm, python

First: ```git clone```

To set up the receiver, in a Linux environment (VM works, too), first follow the directions in the assistant folder, then do the following:
```
cd zoombot-receiver
npm install
npm start
```
To set up the sender, do the following in any OS:
```
cd zoombot-sender
npm install
npm start
```

## How it works

Building this project required a lot of moving parts that had to all be put together in a short time-frame. 

For a behind the scenes video look at: https://www.youtube.com/watch?v=hOBKsPCNJyQ&feature=youtu.be

1) Starting at the client-side we built a React-based web app that allows the user to add a bot to their meeting as well as control the bot. 

2) The inputs from the web app (the meeting ID and bot name) are then sent to our Firebase backend which then updates in real-time our bot side node.js app which is running on a Linux virtual machine. 

3) The "bot-side" app running on the Linux VM will then use this information to make calls to the Zoom SDK which allows the bot to join the specified Zoom meeting. 

4) Now that the "bot" has joined the meeting, we use a Linux library called Pulse Audio to pipe audio from the call to a hotword-detection script trained by Picovoice. 

5) Once the hotwords are found, audio is automatically directed to the Google Assistant SDK, where the message is transcribed and sent to the Google Cloud. 

6) The response from the Google Cloud is then sent back via Pulse Audio to the Zoom Web client, where the bot finally relays the response to all participants to hear!

## Challenges

Nearly every challenge our team faced stemmed from the fact Zoom and the Zoom SDK has zero support for voice bots. Our team spent the entire first night of the hackathon structuring our project in a way to "hack" a voice bot into a Zoom Call. 

One challenge was figuring out how to get audio from the web client our bot runs on to the Google SDK. We realized that we needed to pipe the audio from the call to the Google SDK. We eventually came to the conclusion that having the bot run within a Linux environment would be the easiest as it would allow us the use the Pulse Audio library to pipe audio between applications of our choosing. 

Another challenge we faced was how to give users the ability to use the hot words "Ok Google" and "Hey Google' like they are used to. Recently, Google deprecated support for hot word detection in its Google Assistant SDK, making the task more difficult. We eventually found a hot word detection trainer online that happened to be written in Python, just like the Google Assistant SDK, so we integrated them together.

Additionally, Zoom's developer resources were not at all extensive or the easiest to use. In fact, there was no way to create an app that controls a zoom client on a machine. Instead, we had to struggle to design a web-app that would launch into a Zoom call using Zoom's WebSDK. This was incredibly confusing for a significant amount of time since there was little information on importance of user account subscription and implementation with react. 

## What's next for Zoogle Assistant

We believe that Zoogle Assistant could have significant use cases in the business world. Imagine when you could use Zoogle to tap into your company's calendar and Slack to schedule meetings that work for everyone, have access to accounting projections/models to give business leaders access to critical financial metrics, and more all from the immediate convenience of your conference call. In essence, Zoogle will intelligently help you or bring up the information that you need, when you need it - so you can focus more on the important people in call with you.

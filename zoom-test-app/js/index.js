import { ZoomMtg } from '@zoomus/websdk';

console.log('checkSystemRequirements');
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
// if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av'); // CDN version default
// else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.2/lib', '/av'); // china cdn option 
ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const API_KEY = 'n1TaQgWDRfKlseHZEakN8w';
const API_SECRET = 'DLnpEoxBB1dAJVXrbEJaWKjoCSEjwTYiJoSr';

document.getElementById('join_meeting').addEventListener('click', (e) => {
    e.preventDefault();

    const meetConfig = {
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        meetingNumber: parseInt(document.getElementById('meeting_number').value, 10),
        userName: 'Google Assistant',
		userEmail: 'rpeletkov@gmail.com',
        passWord: '',
        leaveUrl: 'https://zoom.us',
        role: 0
    };
    const meetConfig2 = {
		"meetingNumber": meetConfig.meetingNumber,
		"role": meetConfig.role
	};

	// fetch(`http://localhost:4000/`, {
	// 	method: 'POST',
	// 	body: JSON.stringify(meetConfig2)
	// })
	// 	.then(result => result.text())
	// 	.then(response => {
	// 		console.log(response);
	// 		ZoomMtg.init({
	// 			debug: true,
	// 			leaveUrl: meetConfig.leaveUrl,
	// 			isSupportAV: true,
	// 			success: function() {
	// 				var sig = JSON.parse(response);
	// 				console.log(sig.signature);
	// 				ZoomMtg.join({
	// 					signature: sig.signature,
	// 					apiKey: meetConfig.apiKey,
	// 					meetingNumber: meetConfig.meetingNumber,
	// 					userName: meetConfig.userName,
	// 					// Email required for Webinars
	// 					userEmail: meetConfig.userEmail,
	// 					success(res) {
	// 						console.log(res)
	// 					},
	// 					error(res) {
	// 						console.log(res)
	// 					}
	// 				})
	// 			}
	// 		})
	// 	});
	ZoomMtg.generateSignature({
		meetingNumber: meetConfig.meetingNumber,
		apiKey: meetConfig.apiKey,
		apiSecret: meetConfig.apiSecret,
		role: meetConfig.role,
		success(res) {
			console.log('signature', res.result);

			ZoomMtg.init({
				leaveUrl: 'http://www.zoom.us',
				success() {
					ZoomMtg.join(
						{
							meetingNumber: meetConfig.meetingNumber,
							userName: meetConfig.userName,
							signature: res.result,
							apiKey: meetConfig.apiKey,
							userEmail: 'email@gmail.com',
							passWord: meetConfig.passWord,
							success() {
								//$('#nav-tool').hide();
								console.log('join meeting success');
								setTimeout(function () {
									var startButton = document.getElementById('pc-join');
									startButton.click();
								}, 3000);
							},
							error(res) {
								console.log(res);
							}
						}
					);

				},
				error(res) {
					console.log(res);
				}
			});

		}
	});


});

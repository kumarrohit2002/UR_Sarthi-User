import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


export default function Room() {
    const { roomId } = useParams();
    const appId=import.meta.env.VITE_zegocloud_app_ID;
    const server_Secret=import.meta.env.VITE_zegocloud_server_Secter;

    const myMeeting = async (element) => {
        const appID = Number(appId);
        const serverSecret = server_Secret;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            "Enter your name"
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [{
                name: 'Copy Link',
                url: `http://localhost:5173/room/${roomId}`
            }],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton: true
        })

    }
    return (
        <div className='h-[80vh]'>
            <div ref={myMeeting} />
        </div>
    )
}

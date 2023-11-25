import React from "react";
import socketClient from "./socket-client";
export default function NotifyToast() {
    const [notifySubject, setNotifySubject] = React.useState("");
    const [notifyVisible, setNotifyVisible] = React.useState(false);

    const clientUuid = localStorage.getItem('clientUuid');

    socketClient.on("notify", (data) => {
        console.log(data);
    });

    socketClient.on("disconnect", () => {
        console.log("disconnect");
    })

    socketClient.on('notification.internal.created', (data) => {
        if(data.receiver === clientUuid){
            setNotifySubject(data.subject);
            setNotifyVisible(true);
            setTimeout(() => {
                setNotifyVisible(false);
            }, 2000)
        }
    })

    return (
        <>
            {
                notifyVisible > 0 && (
                    <div className={`notify-toast`}>
                        <em>{notifySubject}</em>
                    </div>
                )
            }
        </>
    );
}
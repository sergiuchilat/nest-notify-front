import React from "react";
import socketClient from "./socket-client";
export default function NotifyCounter({ counter }) {
    const [notifyCount, setNotifyCount] = React.useState(counter);

    const clientUuid = localStorage.getItem('clientUuid');

    socketClient.on("notify", (data) => {
        console.log(data);
    });

    socketClient.on("disconnect", () => {
        console.log("disconnect");
    })

    socketClient.on('notification.internal.created', (data) => {

        if(data.receiver === clientUuid){
            setNotifyCount(notifyCount + 1);
        }
    })

    return (
        <div className={`notify-counter`}>
          <p>You have {JSON.stringify(notifyCount)} new notifications</p>
        </div>
    );
}
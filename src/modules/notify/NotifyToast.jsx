import React from "react";
import socketClient from "./socket-client";
import axios from "axios";

export default function NotifyToast() {
    const [notifySubject, setNotifySubject] = React.useState("");
    const [notifyUuid, setNotifyUuid] = React.useState("");
    const [notifyVisible, setNotifyVisible] = React.useState(false);

    const clientUuid = localStorage.getItem('clientUuid');
    const language = localStorage.getItem('language');

    socketClient.on("notify", (data) => {
        console.log(data);
    });

    socketClient.on("disconnect", () => {
        console.log("disconnect");
    })

    socketClient.on('notification.internal.created', (data) => {
        if(data.receiver === clientUuid){
            setNotifySubject(data.subject);
            setNotifyUuid(data.uuid)
            setNotifyVisible(true);
            setTimeout(() => {
                setNotifyVisible(false);
            }, 4000)
        }
    })

    const openNotification = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/notifications/internal/own/${clientUuid}/notifications/${notifyUuid}?language=${language}`)
            alert(response.data.body)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {
                notifyVisible > 0 && (
                    <div className={`notify-toast`}>
                        <div>
                            <em>{notifySubject}</em>
                            <button onClick={openNotification}>open</button>
                        </div>
                    </div>
                )
            }
        </>
    );
}
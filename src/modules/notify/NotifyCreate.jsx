import React, { useState } from 'react';
import axios from "axios";

export default function NotifyCreate(){

    const [subject, setSubject] = useState('Subject 1')
    const [body, setBody] = useState('Body 1')
    const [sender, setSender] = useState('123e4567-e89b-12d3-a456-426614174000')
    const [receivers, setReceivers] = useState([
        '0537c294-9424-48b7-af77-bf48ed7e94b1'
    ])

    const createNotification = async () => {
        const data = {
            sender_uuid: sender,
            receivers,
            content: [
                {
                    subject,
                    body,
                    language: 'EN'
                }
            ]
        }
        const url = 'http://localhost:3000/notifications/internal'
        try {
            const response = await axios.post(url, data)
            console.log(response)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className={'notification-create-form'}>
            <h1>NotifyCreate</h1>
            <div className={'form-element'}>
                <label>Subject</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value)
                    }}
                />
            </div>
            <div className={'form-element'}>
                <label>Body</label>
                <input
                    type="text"
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value)
                    }}
                />
            </div>
            <div className={'form-element'}>
                <label>Sender</label>
                <input
                    type="text"
                    value={sender}
                    onChange={(e) => {
                        setSender(e.target.value)
                    }}
                />
            </div>
            <div className={'form-element'}>
                <label>Receivers</label>
                <textarea
                    value={receivers}
                    id={'notification-receivers'}
                    onChange={(e) => {
                        setReceivers(e.target.value.split(','))
                    }}
                ></textarea>
            </div>
            <div className={'form-element'}>
                <span></span>
                <button onClick={createNotification}>Send</button>
            </div>
        </div>
    )
}
import React, { useState } from 'react';
import axios from "axios";

export default function NotifyCreate(){
    const [selectedChannel, setSelectedChannel] = useState('Internal')
    const [subject, setSubject] = useState('You have a new candidate at the interview')
    const [body, setBody] = useState('Tudor Turcanu, DM/POL/SOLA/24')
    const [sender, setSender] = useState('123e4567-e89b-12d3-a456-426614174000')
    const [telegramSubscriberUuid, setTelegramSubscriberUuid] = useState('0537c294-9424-48b7-af77-bf48ed7e94b2');
    const [telegramSubscriberLanguage, setTelegramSubscriberLanguage] = useState('EN');

    const [receivers, setReceivers] = useState([
        '0537c294-9424-48b7-af77-bf48ed7e94b2'
    ])

    const channels = [
        'Internal',
        'Telegram'
    ]

    const createNotification = async () => {
        if(selectedChannel === 'Internal'){
            await createNotificationInternal()
        } else if(selectedChannel === 'Telegram'){
            await createNotificationTelegram()
        }
    }

    const createNotificationInternal = async () => {
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
            //console.log(response)
        } catch (e) {
            console.log(e)
        }

    }

    const createNotificationTelegram = async () => {

        const data = {
            sender_uuid: sender,
            receivers,
            subject,
            body: body + ' <a href="https://domain.com/ro/leads/for-sales/95508">Open</a>',
        }
        const url = 'http://localhost:3000/notifications/telegram'
        try {
            const response = await axios.post(url, data)
            //console.log(response)
        } catch (e) {
            console.log(e)
        }

    }

    const subscribeToTelegram = async () => {
        const url = `https://t.me/NestNotifyBot?start=${telegramSubscriberUuid}---${telegramSubscriberLanguage}`
        window.open(url, '_blank')
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
                <label>Channel</label>
                <div>
                    {
                        channels.map(channel => (
                            <>
                                <label>
                                <input
                                    type="radio"
                                    value={channel}
                                    key={channel}
                                    checked={channel === selectedChannel}
                                    onChange={(e) => {setSelectedChannel(e.target.value)}}
                                /> {channel}
                                </label>
                            </>
                        ))
                    }

                </div>
            </div>
            <div className={'form-element'}>
                <span></span>
                <button onClick={createNotification}>Send</button>
            </div>
            <hr/>
            <h2>Subscribe to telegram</h2>
            <div>
                <label htmlFor="">Subscriber UUID</label>
                <input
                    type="text"
                    value={telegramSubscriberUuid}
                    onChange={(e) => setTelegramSubscriberUuid(e.target.value) }
                    style={{width: '100%'}}
                />
            </div>
            <label>Subscriber language</label>
            <div>
                {
                    ['EN', 'RO', 'RU'].map(language => (
                        <>
                            <label>
                                <input
                                    type="radio"
                                    value={language}
                                    key={language}
                                    checked={language === telegramSubscriberLanguage}
                                    onChange={(e) => {setTelegramSubscriberLanguage(e.target.value)}}
                                /> {language}
                            </label>
                        </>
                    ))
                }

            </div>
            <div>
                <button onClick={subscribeToTelegram}>Subscribe to telegram Notifications</button>
            </div>
        </div>
    )
}
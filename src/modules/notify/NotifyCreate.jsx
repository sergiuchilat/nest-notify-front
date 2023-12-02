import React, { useState } from 'react';
import axios from "axios";

export default function NotifyCreate(){
    const [selectedChannel, setSelectedChannel] = useState('Internal')
    const [subjectEN, setSubjectEN] = useState('You have a new candidate at the interview')
    const [subjectRO, setSubjectRO] = useState('Aveti un nou candidat la interviu')
    const [subjectRU, setSubjectRU] = useState('У вас новый кандидат на интервью')
    const [bodyEN, setBodyEN] = useState(`John Doe, DM/POL/SOLA/24 Acces <a href="https://am.com/ro/leads/for-sales/95508">this link</a> and the candidate's card will open in CRM`)
    const [bodyRO, setBodyRO] = useState(`John Doe, DM/POL/SOLA/24 Apasa pe <a href="https://am.com/ro/leads/for-sales/95508">acest link</a> si se va deschide cartela candidatului in CRM`)
    const [bodyRU, setBodyRU] = useState(`John Doe, DM/POL/SOLA/24 Кликни <a href="https://am.com/ro/leads/for-sales/95508">на ссылку</a> и откроется карточка кандидата в CRM`)
    const [sender, setSender] = useState('123e4567-e89b-12d3-a456-426614174000')
    const [telegramSubscriberUuid, setTelegramSubscriberUuid] = useState(localStorage.getItem('clientUuid'));
    const [telegramSubscriberLanguage, setTelegramSubscriberLanguage] = useState('EN');

    const [receivers, setReceivers] = useState([
        localStorage.getItem('clientUuid')
    ])

    const channels = [
        'Internal',
        'Telegram',
        'Email'
    ]

    const createNotification = async () => {
        if(selectedChannel === 'Internal'){
            await createNotificationInternal()
        } else if(selectedChannel === 'Telegram'){
            await createNotificationTelegram()
        } else if(selectedChannel === 'Email'){
            await createNotificationEmail()
        }
    }

    const createNotificationInternal = async () => {
        const translations = [];
        if(subjectEN && bodyEN){
            translations.push({
                subject: subjectEN,
                body: bodyEN,
                language: 'EN'
            })
        }
        if(subjectRO && bodyRO){
            translations.push({
                subject: subjectRO,
                body: bodyRO,
                language: 'RO'
            })
        }
        if(subjectRU && bodyRU){
            translations.push({
                subject: subjectRU,
                body: bodyRU,
                language: 'RU'
            })
        }
        const data = {
            sender_uuid: sender,
            receivers,
            translations
        }
        const url = 'http://localhost:3000/notifications/internal'
        try {
            await axios.post(url, data)
            alert('Internal notification sent')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const createNotificationTelegram = async () => {
        let body = bodyEN;
        let subject = subjectEN;
        if(telegramSubscriberLanguage === 'RO'){
            body = bodyRO
            subject = subjectRO
        } else if(telegramSubscriberLanguage === 'RU'){
            body = bodyRU
            subject = subjectRU
        }
        const data = {
            receivers,
            subject,
            body,
            language: telegramSubscriberLanguage
        }
        const url = 'http://localhost:3000/notifications/telegram'
        try {
            await axios.post(url, data)
            alert('Telegram notification sent')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const createNotificationEmail = async () => {
        let body = bodyEN;
        let subject = subjectEN;
        if(telegramSubscriberLanguage === 'RO'){
            body = bodyRO
            subject = subjectRO
        } else if(telegramSubscriberLanguage === 'RU'){
            body = bodyRU
            subject = subjectRU
        }
        const data = {
            receivers,
            subject,
            body,
            language: telegramSubscriberLanguage
        }
        const url = 'http://localhost:3000/notifications/mail'
        try {
            await axios.post(url, data)
            alert('Email sent')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const subscribeToTelegram = async () => {

        const subscribeUrl = `http://localhost:3000/notifications/telegram/subscribe/${telegramSubscriberUuid}/${telegramSubscriberLanguage}`
        try {
            const response = await axios.post(subscribeUrl, {})
            console.log(response.data?.receiver_uuid)
            if(response.data?.receiver_uuid){
                const id = Number(response.data?.id);
                const telegramUrl = `https://t.me/NestNotifyBot?start=${telegramSubscriberUuid}---${telegramSubscriberLanguage}---${id}`
                window.open(telegramUrl, '_blank')
            }
        } catch (e) {
            alert(e.response.data.message)
            console.log(e)
        }

    }

    const unsubscribeFromTelegram = async () => {

        const subscribeUrl = `http://localhost:3000/notifications/telegram/unsubscribe/${telegramSubscriberUuid}`
        try {
            const response = await axios.delete(subscribeUrl, {})
            console.log(response.data)
            if(response.data?.affected){
                alert('Unsubscribed')
            } else {
                alert('Not subscribed')
            }
        } catch (e) {
            alert(e.response.data.message)
            console.log(e)
        }

    }

    return (
        <div className={'notification-create-form'}>

            <h1>NotifyCreate</h1>
            <div className={'form-element'}>
                <label>Subject EN</label>
                <input
                    type="text"
                    value={subjectEN}
                    onChange={(e) => {
                        setSubjectEN(e.target.value)
                    }}
                />
            </div>
            <div className={'form-element'}>
                <label>Subject RO</label>
                <input
                    type="text"
                    value={subjectRO}
                    onChange={(e) => {
                        setSubjectRO(e.target.value)
                    }}
                />
            </div>
            <div className={'form-element'}>
                <label>Subject RU</label>
                <input
                    type="text"
                    value={subjectRU}
                    onChange={(e) => {
                        setSubjectRU(e.target.value)
                    }}
                />
            </div>
            <div className={'form-element'}>
                <label>Body EN</label>
                <textarea
                    value={bodyEN}
                    onChange={(e) => {
                        setBodyEN(e.target.value)
                    }}
                    rows={10}
                />
            </div>
            <div className={'form-element'}>
                <label>Body RO</label>
                <textarea
                    value={bodyRO}
                    onChange={(e) => {
                        setBodyRO(e.target.value)
                    }}
                    rows={10}
                />
            </div>
            <div className={'form-element'}>
                <label>Body RU</label>
                <textarea
                    value={bodyRU}
                    onChange={(e) => {
                        setBodyRU(e.target.value)
                    }}
                    rows={10}
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
                <button onClick={unsubscribeFromTelegram}>Unsubscribe from telegram Notifications</button>
            </div>
        </div>
    )
}
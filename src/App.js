import './App.css';
import NotifyCreate from './modules/notify/NotifyCreate';
import NotifyToast from "./modules/notify/NotifyToast";
import NotifyCounter from "./modules/notify/NotifyCounter";
import axios from "axios";
import {useState} from "react";
function App() {
    const clientUuid = '0537c294-9424-48b7-af77-bf48ed7e94b2'
    localStorage.setItem('clientUuid', clientUuid)
    localStorage.setItem('language', 'EN');
    const [counter, setCounter] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const getNewNotificationsCount = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/notifications/internal/own/${clientUuid}/unread-count`);
            console.log(response.data)
            setCounter(Number(response.data.count));
            setLoaded(true)
            console.log(counter)
        }catch (e) {
            console.log(e)
        }
    }

    getNewNotificationsCount().then()


    return (
        <>
            <NotifyCreate />
            {loaded && <NotifyCounter counter={counter} />}
            <NotifyToast/>
        </>
    );
}

export default App;

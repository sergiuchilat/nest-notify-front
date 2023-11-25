import './App.css';
import NotifyCreate from './modules/notify/NotifyCreate';
import NotifyToast from "./modules/notify/NotifyToast";
import NotifyCounter from "./modules/notify/NotifyCounter";
function App() {
    const clientUuid = '0537c294-9424-48b7-af77-bf48ed7e94b2'
    localStorage.setItem('clientUuid', clientUuid)
    return (
        <>
            <NotifyCreate />
            <NotifyCounter counter={0} />
            <NotifyToast/>
        </>
    );
}

export default App;

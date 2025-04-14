import {useNavigate} from "react-router-dom";

const FirstWindow = () => {
    const navigate = useNavigate();

    return (
        <div className={'container'}>
            <header>
                <h1>DailyFarm Project</h1>
            </header>
            <div>
                <button className={'window-button w-100 my-5'}
                        onContextMenu={(e) => e.preventDefault()}
                        onMouseUp={(event) => {
                            if (event.button === 0) {
                                navigate('/login');
                            }
                        }}>Login
                </button>
                <button className={'window-button w-100'}
                        onContextMenu={(e) => e.preventDefault()}
                        onMouseUp={(event) => {
                            if (event.button === 0) {
                                navigate('/register');
                            }
                        }}>Register
                </button>
            </div>
        </div>
    )
}

export default FirstWindow;
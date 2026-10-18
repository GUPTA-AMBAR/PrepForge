import './loading-screen.scss';

const LoadingScreen = ({ message = 'Loading...' }) => (
    <main className='loading-screen' aria-busy='true' aria-live='polite'>
        <div className='loading-screen__card' role='status'>
            <div className='loading-screen__animation' aria-hidden='true'>
                <span className='loading-screen__orbit loading-screen__orbit--outer' />
                <span className='loading-screen__orbit loading-screen__orbit--inner' />
                <span className='loading-screen__sparkle'>✦</span>
            </div>
            <p className='loading-screen__message'>{message}</p>
            <div className='loading-screen__dots' aria-hidden='true'>
                <span />
                <span />
                <span />
            </div>
        </div>
    </main>
)

export default LoadingScreen;

import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
            <BrowserRouter >
                <Routes />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
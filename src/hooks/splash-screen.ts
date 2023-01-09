import { useEffect } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';

export function useSplashScreen() {
    useEffect(() => {
        SplashScreen.hide()
        SplashScreen.show({
            autoHide: true,
            fadeInDuration: 200,
            fadeOutDuration: 200,
            showDuration: 2000
        });
    }, [])

    return null
}
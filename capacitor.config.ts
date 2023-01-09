import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.easyanim.starter',
  appName: 'Easy Animes',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#0d395f",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      // showSpinner: true,
      // androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      // splashImmersive: true,
      layoutName: "launch_screen",
      // useDialog: true,
    },
  },
  // cordova: {
  //   preferences: {
  //     LottieFullScreen: "true",
  //     LottieHideAfterAnimationEnd: "true",
  //     LottieAnimationLocation: "build/assets/splash.json"
  //   }
  // }
};

export default config;

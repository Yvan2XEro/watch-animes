import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.watchanimes.app',
  appName: 'Watch Animes',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#0d395f",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      layoutName: "launch_screen",
    },
    LocalNotifications: {
      smallIcon: "ic_stat_notif_icon",
      iconColor: "#ffffff",
    },
  },
};

export default config;

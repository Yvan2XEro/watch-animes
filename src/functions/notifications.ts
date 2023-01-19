import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";

export async function notifyLocally(title: string, body: string) {
    let options: ScheduleOptions = {
        notifications: [
            {
                id: Math.random(),
                title,
                body,
                iconColor: "#343466",
                schedule: {
                    allowWhileIdle: true,
                    every: "day"
                }
            },
        ],
    };
    return await LocalNotifications.schedule(options).then((k) => { });
}


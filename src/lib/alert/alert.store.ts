import { reactive } from "vue"

type Alert = {
    text: string,
    type: AlertType
}

type AlertType = "default" | "success" | "error"

export const alerts = reactive<Array<Alert>>([])

export const handleAlert = (alert: Alert) => {
    alerts.push(alert)
    setTimeout(() => {
        alerts.splice(0, 1)
    }, 5000);
}

export const useAlerts = () => {
    const alerts = reactive<Array<Alert>>([])

    const handleAlert = (alert: Alert) => {
        alerts.push(alert)
        setTimeout(() => {
            const [ first, ...rest] = alerts
            // alerts = rest
        }, 5000);
    }

    return { alerts, handleAlert }
}

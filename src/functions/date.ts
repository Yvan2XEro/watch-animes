import { format, formatDistance } from 'date-fns'

export function dateFromNow(date: Date): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days < 7) {
        return formatDistance(date, new Date())
    }
    return format(date, "yyyy-mm-dd HH:MM")
}
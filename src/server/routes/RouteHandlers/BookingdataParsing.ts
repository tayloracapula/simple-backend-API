import type { NewBookingData } from "server/handlers/leave_booking/NewBookingData";

export function isNewBookingData(data:any):data is NewBookingData {
    return typeof data === 'object' &&
        data !== null &&
        typeof data.user_id === 'number' &&
        typeof data.start_date === 'string' &&
        typeof data.end_date === 'string' &&
        typeof data.booking_type === 'string';
}

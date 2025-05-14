export function calculateBusinessDays(startDate:Date,endDate:Date): number {
    let count = 0;
    const currentDate = new Date(startDate);
    const endCompareDate = new Date(endDate);
    while (currentDate <= endCompareDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count
}
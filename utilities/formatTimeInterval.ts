
export function formatTimeInterval(startTime: Date, endTime: Date): string {
    const start = startTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const end = endTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    console.log(startTime);
    return start + ' - ' + end;
}

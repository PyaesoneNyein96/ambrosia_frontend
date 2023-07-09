
const timeFunction = (x) => {
    const dbTime = x;
    const [hours, minutes, seconds] = dbTime.split(':');
    const time = new Date();
    time.setHours(hours, minutes, seconds);

    const result = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return result
}

export { timeFunction }
export interface Entry {
    date: string;
    mood: string;
    reflection: string[];
}

export function analyzeCSV(text: string): Entry[] {
    const lines = text.split('\n');
    const headers = lines[0].split(',');

    // Parse the CSV data into an array of objects
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {} as Record<string, string>);
    });

    // Get the current date and determine the last full completed week
    const now = new Date();
    const dayOfWeek = now.getDay();
    const lastSunday = new Date(now);

    lastSunday.setDate(now.getDate() - dayOfWeek);
    const lastMonday = new Date(lastSunday);
    lastMonday.setDate(lastSunday.getDate() - 6);

    // Check if today is Sunday and if the entries for the current week are incomplete
    if (dayOfWeek === 0) {
        const currentWeekEntries = data.filter(entry => {
            const entryDate = new Date(entry['full_date']);
            return entryDate >= lastMonday && entryDate <= lastSunday;
        });

        // If the current week entries are incomplete, use the previous week
        if (currentWeekEntries.length < 7) {
            lastSunday.setDate(lastSunday.getDate() - 7);
            lastMonday.setDate(lastSunday.getDate() - 6);
        }
    }

    // Filter the entries based on the dates from the last full completed week
    const filteredData = data.filter(entry => {
        const entryDate = new Date(entry['full_date']);
        return entryDate >= lastMonday && entryDate <= lastSunday;
    });

    console.log(filteredData);

    return filteredData.map(entry => ({
        date: entry.full_date,
        mood: entry.mood,
        reflection: entry.note.substring(1, entry.note.length - 1).split('<br>')
    }));
};


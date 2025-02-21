export async function loadWorkDays(fileName) {
    try {
        const response = await fetch(fileName);
        if (!response.ok) throw new Error(`Failed to load ${fileName}`);

        const workDays = await response.json();
        return workDays;
    } catch (error) {
        console.error("Error loading data:", error);
        return []; // Return an empty array on error
    }
}


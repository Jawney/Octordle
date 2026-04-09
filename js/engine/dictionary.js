export async function loadDictionaries() {
    try {
        const [classic, extreme, dictionary] = await Promise.all([
            fetch('assets/classic.txt'),
            fetch('assets/extreme.txt'),
            fetch('assets/dictionary.txt')
        ]);

        // Helper to process text into a clean array of uppercase words
        const process = async (res) => (await res.text())
            .split(/\s+/)
            .map(w => w.trim().toUpperCase())
            .filter(w => w.length === 5);

        const classicWords = await process(classic);
        const extremeWords = await process(extreme);
        const allAllowed = await process(dictionary);
        
        console.log("Dictionaries Loaded Successfully.");
        console.log(`Classic: ${classicWords.length}, Extreme: ${extremeWords.length}, Total Allowed: ${allAllowed.length}`);
        
        return { 
            classic: classicWords, 
            extreme: extremeWords, 
            allAllowed 
        };
    } catch (err) {
        console.error("Dictionary Load Error:", err);
        const fallback = ["APPLE", "CIGAR", "BRAIN", "BREAD", "BRUSH", "CHAIR", "CHEST", "CHORD"];
        return { classic: fallback, extreme: fallback, allAllowed: fallback };
    }
}

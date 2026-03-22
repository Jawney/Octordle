export async function loadDictionaries() {
    try {
        const [s, a] = await Promise.all([
            fetch('assets/shuffled_real_wordles.txt'), 
            fetch('assets/official_allowed_guesses.txt')
        ]);
        const solutions = (await s.text()).split(/\s+/).filter(w => w.length === 5).map(w => w.toUpperCase());
        const extraAllowed = (await a.text()).split(/\s+/).filter(w => w.length === 5).map(w => w.toUpperCase());
        
        // MERGE SOLUTIONS into ALL_ALLOWED
        const allAllowed = Array.from(new Set([...solutions, ...extraAllowed]));
        console.log("Dictionary Loaded. Solutions:", solutions.length, "Total Allowed:", allAllowed.length);
        
        return { solutions, allAllowed };
    } catch (err) {
        console.error("Fetch Error:", err);
        // Fallback for development if files aren't available
        const solutions = ["APPLE", "CIGAR", "BRAIN", "BREAD", "BRUSH", "CHAIR", "CHEST", "CHORD"];
        return { solutions, allAllowed: solutions };
    }
}

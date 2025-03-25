export const learnWord = async (word: string) => {
    const response = await fetch("http://localhost:8080/api/learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: word }),
    });

    if (!response.ok) {
        throw new Error("Failed to learn word");
    }

    return response.json();
};


export const getResponse = async () => {
    const response = await fetch("http://localhost:8080/api/talk");

    if (!response.ok) {
        throw new Error("Failed to get word");
    }

    return response.json();
};

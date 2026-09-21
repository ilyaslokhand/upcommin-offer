export default function JsonLd({ data }) {
    if (
        !data ||
        (typeof data === "object" &&
            Object.keys(data).length === 0)
    ) {
        return null;
    }

    const json = JSON.stringify(data)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026");

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: json,
            }}
        />
    );
}


// Receive schema object
// ↓
// Check that it is not empty
// ↓
// Convert it into JSON
// ↓
// Escape unsafe characters
// ↓
// Place it inside a JSON-LD script
// ↓
// Google reads it
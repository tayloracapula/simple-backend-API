export function maskPasswords(obj: any): any {
    if (!obj) return obj;

    if (Array.isArray(obj)) {
        return obj.map((element) => maskPasswords(element));
    }

    const result = { ...obj };
    if (obj.password) {
        result.password = "#".repeat(obj.password.length);
    }
    for (const [key, value] of Object.entries(result)) {
        if (typeof value === "object" && value !== null) {
            result[key] = maskPasswords(result[key]);
        }
    }

    return result;
}

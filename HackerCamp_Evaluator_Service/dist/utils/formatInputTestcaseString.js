"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatInputTestcaseString(inputTestCaseString) {
    try {
        // Replace single quotes with double quotes (if needed for valid JSON)
        const normalizedString = inputTestCaseString.replace(/'/g, '"');
        // Check if input is valid JSON
        const parsed = JSON.parse(`[${normalizedString}]`);
        parsed === null || parsed === void 0 ? void 0 : parsed.unshift(1);
        // Convert each element to a proper format
        return (parsed
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((item) => {
            if (Array.isArray(item)) {
                return item.map((subItem) => subItem.toString().trim()).join(" ");
            }
            return item.toString().trim(); // Convert numbers, strings, etc., to strings
        })
            .join("\n"));
    }
    catch (error) {
        return `ERROR: Invalid input format - ${inputTestCaseString}`;
    }
}
exports.default = formatInputTestcaseString;

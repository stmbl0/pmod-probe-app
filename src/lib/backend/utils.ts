// yeah this is definitely chatgpt
export function split16BitTo8BitArray(num: number) {
    // Ensure the number is within the 16-bit range
    if (num < 0 || num > 65535) {
        throw new Error("Number out of range for 16-bit integer");
    }

    // Get the high byte (most significant 8 bits)
    const highByte = (num >> 8) & 0xFF;
    
    // Get the low byte (least significant 8 bits)
    const lowByte = num & 0xFF;

    // Return the array of two 8-bit numbers
    return [highByte, lowByte];
}
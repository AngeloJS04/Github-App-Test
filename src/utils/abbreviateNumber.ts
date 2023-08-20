export function abbreviateNumber(number: number): string {
    if (number < 1000) {
        return number.toString(); 
    }
    const abbreviations = ["K", "M", "B", "T"]; 
    let abbreviationIndex = 0;

    while (number >= 1000 && abbreviationIndex < abbreviations.length - 1) {
        number /= 1000;
        abbreviationIndex++;
    }
    const formattedNumber = number.toFixed(1);

    return `${formattedNumber}${abbreviations[abbreviationIndex]}`;
}
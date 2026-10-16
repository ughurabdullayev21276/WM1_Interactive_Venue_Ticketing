
const auditorium = {
    name: "ADA University C Building Auditorium",
    totalSeats: 267,
    sections: 7
}; // it stores basic information about the auditorium


console.log(auditorium);

// i added number of seats in each row of the auditorium
const lowerCenter = [10, 11, 12];
const lowerRight = [7, 8, 8];
const upperLeft = [8, 10, 9, 9, 8];
const upperCenter = [15, 16, 17, 18, 19];
const upperRight = [8, 10, 9, 9, 8];

const secondFloor = [15];

console.log("Lower Left:", lowerLeft);
console.log("Lower Center:", lowerCenter);
console.log("Lower Right:", lowerRight);
console.log("Upper Left:", upperLeft);
console.log("Upper Center:", upperCenter);
console.log("Upper Right:", upperRight);

console.log("Second Floor:", secondFloor);

// prices for tickets
const ticketPrices = {
    premium: 30,
    standard: 20,
    economy: 10
};

console.log("Ticket Prices:", ticketPrices);

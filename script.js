
const auditorium = {
    name: "ADA University C Building Auditorium",
    totalSeats: 267,
    sections: 7
}; // it stores basic information about the auditorium


console.log(auditorium);

// i added number of seats in each row of the auditorium
const lowerLeft = [7, 8, 8];
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





function createSeats(sectionId, rows) {
    const section = document.getElementById(sectionId);

    section.innerHTML = "";

    for (let r = rows.length - 1; r >= 0; r--) {

        const row = document.createElement("div");
        row.className = "seat-row";

        for (let i = 1; i <= rows[r]; i++) {

            const seat = document.createElement("button");
            seat.type = "button";
            seat.className = "seat";

            seat.setAttribute("aria-label",
                `Row ${r + 1}, Seat ${i}`);

            row.appendChild(seat);
        }

        section.appendChild(row);
    }
}


createSeats("lower-left", lowerLeft);
createSeats("lower-center", lowerCenter);
createSeats("lower-right", lowerRight);
createSeats("upper-left", upperLeft);
createSeats("upper-center", upperCenter);
createSeats("upper-right", upperRight);

createSeats("second-floor", secondFloor);
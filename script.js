
const auditorium = {
    name: "ADA University C Building Auditorium",
    totalSeats: 267,
    sections: 7
};

console.log(auditorium);


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


const ticketPrices = {
    premium: 50,
    standard: 30,
    economy: 15
};

console.log("Ticket Prices:", ticketPrices);


let inspectedSeat = null;


const unavailableSeats = [
    "lower-center-A-3",
    "lower-left-B-2",
    "upper-right-D-5",
    "upper-center-F-7"
];


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

            let rowLetter;

            if (sectionId.startsWith("lower")) {
                rowLetter = String.fromCharCode(65 + r);
            } else if (sectionId.startsWith("upper")) {
                rowLetter = String.fromCharCode(68 + r);
            } else {
                rowLetter = "I";
            }

            const seatId = `${sectionId}-${rowLetter}-${i}`;

            seat.setAttribute(
                "aria-label",
                `${sectionId}, Row ${rowLetter}, Seat ${i}`
            );

            if (unavailableSeats.includes(seatId)) {
                seat.classList.add("unavailable");
                seat.disabled = true;
            }
            seat.addEventListener("click", function() {

                if (inspectedSeat !== null) {
                    inspectedSeat.classList.remove("inspected");
                }

                seat.classList.add("inspected");
                inspectedSeat = seat;

                showSeatDetails(sectionId, r, i);
            });

            row.appendChild(seat);
        }

        section.appendChild(row);
    }
}


function showSeatDetails(sectionId, rowIndex, seatNumber) {

    const sectionName = sectionId
        .replace("-", " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());

    let rowLetter;

    if (sectionId.startsWith("lower")) {
        rowLetter = String.fromCharCode(65 + rowIndex);
    } else if (sectionId.startsWith("upper")) {
        rowLetter = String.fromCharCode(68 + rowIndex);
    } else {
        rowLetter = "I";
    }

    let price;

    if (sectionId.startsWith("lower")) {
        price = ticketPrices.premium;
    } else if (sectionId.startsWith("upper")) {
        price = ticketPrices.standard;
    } else {
        price = ticketPrices.economy;
    }

    const message = document.getElementById("seat-message");

    message.innerHTML = `
        Section: ${sectionName}<br>
        Row: ${rowLetter}<br>
        Seat: ${seatNumber}<br>
        Price: ${price} AZN
    `;
}

const mapContent = document.getElementById("map-content");

let zoomLevel = 1;
let moveX = 0;
let moveY = 0;

function updateMap() {
    mapContent.style.transform =
        `translate(${moveX}px, ${moveY}px) scale(${zoomLevel})`;
}

document.getElementById("zoom-in").addEventListener("click", function() {
    zoomLevel = Math.min(2, zoomLevel + 0.2);
    updateMap();
});

document.getElementById("zoom-out").addEventListener("click", function() {
    zoomLevel = Math.max(0.6, zoomLevel - 0.2);
    updateMap();
});

document.getElementById("move-up").addEventListener("click", function() {
    moveY += 30;
    updateMap();
});

document.getElementById("move-down").addEventListener("click", function() {
    moveY -= 30;
    updateMap();
});


document.getElementById("move-left").addEventListener("click", function() {
    moveX += 30;
    updateMap();
});

document.getElementById("move-right").addEventListener("click", function() {
    moveX -= 30;
    updateMap();
});

document.getElementById("reset-view").addEventListener("click", function() {
    zoomLevel = 1;
    moveX = 0;
    moveY = 0;
    mapContent.style.transform = "translate(0px, 0px) scale(1)";
});

let selectedSeat = null;
let selectedButton = null;
const cart = [];


createSeats("lower-left", lowerLeft);
createSeats("lower-center", lowerCenter);
createSeats("lower-right", lowerRight);
createSeats("upper-left", upperLeft);
createSeats("upper-center", upperCenter);
createSeats("upper-right", upperRight);
createSeats("second-floor", secondFloor);


const addButton = document.getElementById("add-to-cart");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

addButton.disabled = true;

document.querySelectorAll(".seat").forEach(function(seat) {
    seat.addEventListener("click", function() {

        if (seat.disabled) {
            return;
        }

        selectedButton = seat;

        const label = seat.getAttribute("aria-label");
        const parts = label.split(", ");

        const sectionId = parts[0];
        const row = parts[1].replace("Row ", "");
        const number = Number(parts[2].replace("Seat ", ""));
        const seatId = `${sectionId}-${row}-${number}`;

        let price;

        if (sectionId.startsWith("lower")) {
            price = ticketPrices.premium;
        } else if (sectionId.startsWith("upper")) {
            price = ticketPrices.standard;
        } else {
            price = ticketPrices.economy;
        }

        selectedSeat = {
            id: seatId,
            section: sectionId,
            row: row,
            number: number,
            price: price
        };

        const alreadyInCart = cart.find(function(ticket) {
            return ticket.id === seatId;
        });

        addButton.disabled = alreadyInCart !== undefined;

        if (alreadyInCart !== undefined) {
            seat.classList.remove("inspected");
        }
    });
});

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    for (const ticket of cart) {

        const item = document.createElement("li");
        const removeButton = document.createElement("button");

        item.textContent =
            `${ticket.section} - Row ${ticket.row} - Seat ${ticket.number} - ${ticket.price} AZN `;

        removeButton.textContent = "Remove";
        removeButton.type = "button";

        removeButton.addEventListener("click", function() {
            removeFromCart(ticket.id);
        });

        item.appendChild(removeButton);
        cartItems.appendChild(item);

        total += ticket.price;
    }

    totalElement.textContent = `${total} AZN`;

    const emptyCart = document.getElementById("empty-cart");

    if (emptyCart !== null) {
        emptyCart.style.display = cart.length === 0 ? "block" : "none";
    }
}

function addToCart() {

    if (selectedSeat === null || selectedButton === null) {
        return;
    }

    const existingTicket = cart.find(function(ticket) {
        return ticket.id === selectedSeat.id;
    });

    if (existingTicket !== undefined || selectedButton.disabled) {
        return;
    }

    cart.push(selectedSeat);

    selectedButton.classList.remove("inspected");
    selectedButton.classList.add("in-cart");

    addButton.disabled = true;

    updateCart();
}

function removeFromCart(seatId) {

    const ticketIndex = cart.findIndex(function(ticket) {
        return ticket.id === seatId;
    });

    if (ticketIndex === -1) {
        return;
    }

    cart.splice(ticketIndex, 1);

    const seatButtons = document.querySelectorAll(".seat");

    for (const seat of seatButtons) {
        const label = seat.getAttribute("aria-label");

        const parts = label.split(", ");

        const id = `${parts[0]}-${parts[1].replace("Row ", "")}-${parts[2].replace("Seat ", "")}`;

        if (id === seatId) {
            seat.classList.remove("in-cart");
            seat.classList.remove("inspected");

            if (selectedButton === seat) {
                selectedSeat = null;
                selectedButton = null;
                inspectedSeat = null;
                addButton.disabled = true;

                document.getElementById("seat-message").textContent =
                    "Select a seat to view details.";
            }

            break;
        }
    }

    updateCart();
}

addButton.addEventListener("click", addToCart);

updateCart();

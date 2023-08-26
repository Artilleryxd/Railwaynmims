const size = 5;
let mai = new Array(size), wai = new Array(size), front = -1, rear = -1, front2 = -1, rear2 = -1;

function book(id) {
    if (front === (rear + 1) % size) {
        const waitingMessage = document.getElementById("waitingMessage");
        waitingMessage.textContent = "Sorry, the main queue is full. You will be placed in the waiting list.";
        
        if (front2 === (rear2 + 1) % size) {
            const waitingFullMessage = document.getElementById("waitingFullMessage");
          waitingFullMessage.textContent = "Booking not availabe ,the waiting queue is full";
        } else {
            if (front2 === -1) {
                front2 = rear2 = 0;
                wai[rear2] = id;
            } else {
                rear2 = (rear2 + 1) % size;
                wai[rear2] = id;
            }
        }
    } else {
        if (front === -1) {
            front = rear = 0;
            mai[rear] = id;
        } else {
            rear = (rear + 1) % size;
            mai[rear] = id;
        }
    }
}

function fir() {
    if (front === -1) {
        console.log("No bookings yet.");
    } else {
        console.log("\nThe first person to get the ticket is: " + mai[front]);
        if (front2 === -1) {
            console.log("No one in the waiting list.");
        } else {
            console.log("The first person in the waiting list is: " + wai[front2]);
        }
    }
}

function cancel() {
    if (front === -1) {
        console.log("\nNo booking to cancel.");
    } else {
        if (front === rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % size;
        }

        if (front2 !== -1) {
            mai[rear] = wai[front2];
            rear = (rear + 1) % size;
            front2 = (front2 + 1) % size;
        }
        console.log("\nBooking canceled successfully.");
    }
}

function getMainQueue() {
    if (front === -1) {
        return "Empty";
    } else {
        let mainQueue = mai[front].toString();
        for (let i = (front + 1) % size; i !== (rear + 1) % size; i = (i + 1) % size) {
            mainQueue += " " + mai[i].toString();
        }
        return mainQueue;
    }
}

function getWaitingQueue() {
    if (front2 === -1) {
        return "Empty";
    } else {
        let waitingQueue = wai[front2].toString();
        for (let i = (front2 + 1) % size; i !== (rear2 + 1) % size; i = (i + 1) % size) {
            waitingQueue += " " + wai[i].toString();
        }
        return waitingQueue;
    }
}

function display() {
    const mainQueueElement = document.getElementById("mainQueueDisplay");
    const waitingQueueElement = document.getElementById("waitingQueueDisplay");

    mainQueueElement.textContent = "Main Queue: " + getMainQueue();
    waitingQueueElement.textContent = "Waiting Queue: " + getWaitingQueue();
}

function main() {
    const appElement = document.getElementById("app");

    const menu = `
        <div class="container">
            <h1>Booking System</h1>
            <div class="menu">
                <button id="bookBtn">Book</button>
                <button id="cancelBtn">Cancel</button>
                <button id="displayBtn">Display Queues</button>
                <button id="firstBtn">See First ID</button>
                <button id="exitBtn">Exit</button>
            </div>
            <div id="display">
                <p id="waitingMessage"></p>
                <p id="waitingFullMessage"></p>
                <div class="queue">
                    <p id="mainQueueDisplay">Main Queue: Empty</p>
                    <p id="waitingQueueDisplay">Waiting Queue: Empty</p>
                </div>
            </div>
        </div>
    `;
    appElement.innerHTML = menu;

    const bookBtn = document.getElementById("bookBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const displayBtn = document.getElementById("displayBtn");
    const firstBtn = document.getElementById("firstBtn");
    const exitBtn = document.getElementById("exitBtn");

    bookBtn.addEventListener("click", () => {
        const id = parseInt(prompt("Enter passenger ID:"));
        book(id);
        display();
    });

    cancelBtn.addEventListener("click", () => {
        const id = parseInt(prompt("Enter passenger ID to cancel:"));
        if (!isNaN(id)) {
            cancel(id);
            updateDisplay();
        } else {
            console.log("Invalid passenger ID ! .");    
        }
    });
    displayBtn.addEventListener("click", () => {
        display();
    });
    
    firstBtn.addEventListener("click", () => {
        fir();
    });
    
    exitBtn.addEventListener("click", () => {
        const displayElement = document.getElementById("display");
        displayElement.innerHTML = "<p>Thank You for choosing us!</p>";
    });
}
main();

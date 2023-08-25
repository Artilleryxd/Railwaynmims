const size = 5;
let i, mai = new Array(size), wai = new Array(size), front = -1, rear = -1, front2 = -1, rear2 = -1;

function book(id) {
    if (front === (rear + 1) % size) {
        console.log("\nSorry, the main queue is full. You will be placed in the waiting list.");
        if (front2 === (rear2 + 1) % size) {
            console.log("The waiting queue is full");
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

function display() {
    console.log("\nThe main queue is: ");
    if (front <= rear) {
        process.stdout.write(mai[front] + " ");
        for (i = front + 1; i <= rear; i++) {
            process.stdout.write(mai[i] + " ");
        }
    } else {
        for (i = front; i < size; i++) {
            process.stdout.write(mai[i] + " ");
        }
        for (i = 0; i <= rear; i++) {
            process.stdout.write(mai[i] + " ");
        }
    }
    console.log();

    console.log("The waiting queue is: ");
    if (front2 !== -1) {
        process.stdout.write(wai[front2] + " ");
        for (i = front2 + 1; i <= rear2; i++) {
            process.stdout.write(wai[i] + " ");
        }
    } else {
        console.log("Empty");
    }
    console.log();
}

function main() {
    let m, id;
    do {
        console.log("\nMenu:\n1. Book\n2. Cancel\n3. Display queues\n4. See first ID\n5. Exit\n");
        m = parseInt(prompt("Enter your choice:"));

        if (m === 1) {
            id = parseInt(prompt("Enter passenger ID:"));
            book(id);
        } else if (m === 2) {
            cancel();
        } else if (m === 3) {
            display();
        } else if (m === 4) {
            fir();
        } else if (m !== 5) {
            console.log("Invalid option. Please choose a valid option.");
        }
    } while (m !== 5);

    console.log("Exiting the program.");
}

main();

const size = 5;
let i, mai = new Array(size), wai = new Array(size), front = -1, rear = -1, front2 = -1, rear2 = -1, ind = -1;

function book(id) {
    if (front === (rear + 1) % size) {
        console.log("The main queue is full, You will be placed in the waiting list");
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
    console.log("The first person to get the ticket is: " + mai[front]);
    console.log("The first person of the waiting list is: " + wai[front2]);
}

function cancel() {
    if (front === -1) {
        console.log("No booking to cancel");
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
    }
}

function del(id) {
    console.log("Enter the ID you want to delete");
    // Assuming you have some way to get user input in JavaScript
    id = parseInt(/* user input here */);

    let found = false;

    // Search for the ID in the main queue
    if (front <= rear) {
        for (i = front; i <= rear; i++) {
            if (mai[i] === id) {
                found = true;
                ind = i;
                break;
            }
        }
    } else {
        for (i = front; i <= size - 1; i++) {
            if (mai[i] === id) {
                found = true;
                ind = i;
                break;
            }
        }
        for (i = 0; i <= rear; i++) {
            if (mai[i] === id) {
                found = true;
                ind = i;
                break;
            }
        }
    }

    if (found) {
        if (front <= rear) {
            for (i = ind; i <= rear; i++) {
                mai[i] = mai[(i + 1) % size];
            }
            if (front2 !== -1) {
                mai[rear] = wai[front2];
                front2++;
            } else {
                rear--;
            }
        } else {
            if (ind > front) {
                for (i = ind; i < size; i++) {
                    mai[i] = mai[(i + 1) % size];
                }
                for (i = 0; i <= rear; i++) {
                    mai[i] = mai[(i + 1) % size];
                }
                if (front2 !== -1) {
                    mai[rear] = wai[front2];
                    front++;
                } else {
                    rear--;
                }
            }
        }
        console.log("ID deleted successfully.");
    } else {
        console.log("Invalid ID. Please enter a valid ID.");
    }
}

function display() {
    console.log("The main queue is: ");
    if (front <= rear) {
        for (i = front; i <= rear; i++) {
            console.log(mai[i] + " ");
        }
    } else {
        for (i = front; i < size; i++) {
            console.log(mai[i] + " ");
        }
        for (i = 0; i <= rear; i++) {
            console.log(mai[i] + " ");
        }
    }

    console.log("The waiting queue is: ");
    if (front2 !== -1) {
        if (front2 <= rear2) {
            for (i = front2; i <= rear2; i++) {
                console.log(wai[i] + " ");
            }
        } else {
            for (i = front2; i < size; i++) {
                console.log(wai[i] + " ");
            }
            for (i = 0; i <= rear2; i++) {
                console.log(wai[i] + " ");
            }
        }
    }
}

function main() {
    let m, id;
    do {
        console.log("\n1 to book\n2 to cancel\n3 to display\n4 to see first ID\n5 to delete\n6 to exit");
        // Assuming you have some way to get user input in JavaScript
        m = parseInt(/* user input here */);
        
        if (m === 1) {
            console.log("Enter passenger ID: ");
            // Assuming you have some way to get user input in JavaScript
            id = parseInt(/* user input here */);
            book(id);
        } else if (m === 2) {
            cancel();
        } else if (m === 3) {
            display();
        } else if (m === 4) {
            fir();
        } else if (m === 5) {
            del(id);
        } else if (m !== 6) {
            console.log("Invalid option. Please choose a valid option.");
        }
    } while (m !== 6);
}

main();

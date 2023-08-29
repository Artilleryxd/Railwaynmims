#include <iostream>
#define size 5
using namespace std;
int i, mai[size], wai[size], front = -1, rear = -1, front2 = -1, rear2 = -1,ind=-1;
void book(int id) {
    if (front == (rear + 1) % size) {
        cout<<" ";
        cout << "The main queue is full, You will be placed in the waiting list" << endl;
        if (front2 == (rear2 + 1) % size) {
            cout << "The waiting queue is full" << endl;
        }
        else {
            if (front2 == -1) {
                front2 = rear2 = 0;
                wai[rear2] = id;
            }
            else {
                rear2 = (rear2 + 1) % size;
                wai[rear2] = id;
            }
        }
    }
    else {
        if (front == -1) {
            front = rear = 0;
            mai[rear] = id;
        }
        else {
            rear = (rear + 1) % size;
            mai[rear] = id;
        }
    }
}
void fir(){
    cout<<"the first person to get the ticket is: "<<mai[front]<<endl;
    cout<<"The first person of the waiting list is: "<<wai[front2]<<endl;
}
void cancel() {
    if (front == -1) {
        cout << "No booking to cancel" << endl;
    }
    else {
        if (front == rear) {
            front = rear = -1;
        }
        else {
            front = (front + 1) % size;
        }

        if (front2 != -1) {
            mai[rear] = wai[front2];
            rear = (rear + 1) % size;
            front2 = (front2 + 1) % size;
        }
    }
}
void del(int id){
    cout<<"Enter the id you want to delete"<<endl;
    cin>>id;
    if(front<rear){
        for(i=front;i<=rear;i++){
            if(mai[i]==id){
                ind = i;
            }
        }
    }
    else{
        for(i=front;i<=size-1;i++){
            if(mai[i]==id){
                ind=i;
            }
        }
        for(i=0;i<=rear;i++){
            if(mai[i]==id){
                ind=i;
            }
        }
    }
    if(ind==-1){
        cout<<"\nInvalid id please enter a valid id"<<endl;
}
}
void display() {
    cout << "The main queue is: " << endl;
    if (front <= rear) {
        for (i = front; i <= rear; i++) {
            cout << mai[i] << " ";
        }
    }
    else {
        for (i = front; i < size; i++) {
            cout << mai[i] << " ";
        }
        for (i = 0; i <= rear; i++) {
            cout << mai[i] << " ";
        }
    }
    cout << endl;

    cout << "The waiting queue is: " << endl;
    if (front2 != -1) {
        if (front2 <= rear2) {
            for (i = front2; i <= rear2; i++) {
                cout << wai[i] << " ";
            }
        }
        else {
            for (i = front2; i < size; i++) {
                cout << wai[i] << " ";
            }
            for (i = 0; i <= rear2; i++) {
                cout << wai[i] << " ";
            }
        }
    }
    cout <<ind<<endl;
}

int main() {
    int m, id;
    do {
        cout << "\n1 to book\n2 to cancel\n3 to display\n4 to see first ID\n5 to delete\n6 to exit" << endl;
        cin >> m;
        if (m == 1) {
            cout << "Enter passenger ID: ";
            cin >> id;
            book(id);
        }
        else if (m == 2) {
            cancel();
        }
        else if (m == 3) {
            display();
        }
        else if(m==4){
            fir();
        }
        else if(m==5){
            del(id);
        }
        else if (m != 6) {
            cout << "Invalid option. Please choose a valid option." << endl;
        }
    } while (m != 6);

    return 0;
}

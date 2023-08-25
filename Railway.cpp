#include <iostream>
#define size 5
using namespace std;

int i, mai[size], wai[size], front = -1, rear = -1, front2 = -1, rear2 = -1;

void book(int id)
{
    if (front == (rear + 1) % size)
    {
        cout << " ";
        cout << "\nSorry, the main queue is full. You will be placed in the waiting list." << endl;
        if (front2 == (rear2 + 1) % size)
        {
            cout << "The waiting queue is full" << endl;
        }
        else
        {
            if (front2 == -1)
            {
                front2 = rear2 = 0;
                wai[rear2] = id;
            }
            else
            {
                rear2 = (rear2 + 1) % size;
                wai[rear2] = id;
            }
        }
    }
    else
    {
        if (front == -1)
        {
            front = rear = 0;
            mai[rear] = id;
        }
        else
        {
            rear = (rear + 1) % size;
            mai[rear] = id;
        }
    }
}
void fir()
{
    cout << "\nThe first person to get the ticket is: " << mai[front] << endl;
    cout << "The first person of the waiting list is: " << wai[front2] << endl;
}
void cancel()
{
    if (front == -1)
    {
        cout << "\nNo booking to cancel." << endl;
    }
    else
    {
        if (front == rear)
        {
            front = rear = -1;
        }
        else
        {
            front = (front + 1) % size;
        }

        if (front2 != -1)
        {
            mai[rear] = wai[front2];
            rear = (rear + 1) % size;
            front2 = (front2 + 1) % size;
        }
        cout << "\nBooking canceled successfully." << endl;
    }
}

void display()
{
    cout << "\nThe main queue is: " << endl;
    if (front <= rear)
    {
        for (i = front; i <= rear; i++)
        {
            cout << mai[i] << " ";
        }
    }
    else
    {
        for (i = front; i < size; i++)
        {
            cout << mai[i] << " ";
        }
        for (i = 0; i <= rear; i++)
        {
            cout << mai[i] << " ";
        }
    }
    cout << endl;

    cout << "The waiting queue is: " << endl;
    if (front2 != -1)
    {
        if (front2 <= rear2)
        {
            for (i = front2; i <= rear2; i++)
            {
                cout << wai[i] << " ";
            }
        }
        else
        {
            for (i = front2; i < size; i++)
            {
                cout << wai[i] << " ";
            }
            for (i = 0; i <= rear2; i++)
            {
                cout << wai[i] << " ";
            }
        }
    }
    cout << "Empty" << endl;
}

int main()
{
    int m, id;
    do
    {
        cout << "\nMenu:\n1. Book\n2. Cancel\n3. Display queues\n4. See first ID\n5. Exit\n"
             << endl;
        cin >> m;
        if (m == 1)
        {
            cout << "Enter passenger ID: ";
            cin >> id;
            book(id);
        }
        else if (m == 2)
        {
            cancel();
        }
        else if (m == 3)
        {
            display();
        }
        else if (m == 4)
        {
            fir();
        }
        else if (m != 5)
        {
            cout << "Invalid option. Please choose a valid option." << endl;
        }
    } while (m != 5);

    cout << "Exiting the program." << endl;
    return 0;
}

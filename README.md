# Event Management Platform

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/shalinikatore32/REPOSITORY_NAME.git
   ```
2. Install the dependencies:
   ```
   cd REPOSITORY_NAME
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   SECRET_KEY=your-secret-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   EMAIL_USER=your-email-username
   EMAIL_PASS=your-email-password
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage

The event management platform provides the following features:

1. **User Authentication**: Users can sign up as attendees, organizers, or guests. Organizers can create and manage events, while attendees can register for events and purchase tickets.
2. **Event Creation and Management**: Organizers can create new events, edit event details, and manage event attendees.
3. **Event Registration and Ticket Purchase**: Attendees can register for events and purchase tickets using Stripe integration.
4. **Attendee Management**: Organizers can view and manage attendee information, including attendance tracking and feedback.
5. **Event Analytics**: Organizers can view event analytics, such as attendee count, ticket sales, and event trends.
6. **Email Notifications**: The platform can send email notifications to attendees, such as event reminders and updates.

## API

The event management platform provides the following API endpoints:

| Endpoint                                     | Method | Description                                                  |
| -------------------------------------------- | ------ | ------------------------------------------------------------ |
| `/api/signup`                                | POST   | Create a new user account.                                  |
| `/api/signin`                                | POST   | Sign in to the platform.                                    |
| `/api/events/create-event`                   | POST   | Create a new event.                                         |
| `/api/events`                                | GET    | Fetch all events.                                          |
| `/api/events/:id`                            | GET    | Fetch a specific event by ID.                              |
| `/api/events/:id/edit`                       | PUT    | Update an existing event.                                  |
| `/api/events/:eventId/register`              | POST   | Register for an event.                                     |
| `/api/events/:eventId/tickets`               | GET    | Fetch all tickets for an event.                            |
| `/api/events/:eventId/tickets/:ticketId`     | GET    | Fetch a specific ticket.                                   |
| `/api/events/:eventId/tickets/:ticketId/purchase` | POST | Purchase a ticket.                                        |
| `/api/attendees/mark`                        | POST   | Mark an attendee as present.                               |
| `/api/analytics/:id`                         | GET    | Fetch event analytics for a specific event.               |

## Contributing

Contributions to the event management platform are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.


## Testing

The event management platform includes unit tests and integration tests. To run the tests, use the following command:

```
npm test
```

The tests cover various aspects of the application, including user authentication, event management, ticket purchase, and attendee management.

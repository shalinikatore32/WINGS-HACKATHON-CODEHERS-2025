import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventSignup from './singin-signup-pages/EventSignup';
import EventSignin from './singin-signup-pages/EventSignin';
import LandingPage from "./landing-page/LandingPage";
import Dashboard from "./dashboard-pages/Dashboard";
import CreateEvent from "./dashboard-pages/sidebar-components/CreateEvent";
import CardEditor from "./dashboard-pages/sidebar-components/card-creation/CardEditor";
import Logout from "./singin-signup-pages/Logout";
import MorePublicEvents from "./landing-page/MorePublicEvents";
import MyEvent from "./dashboard-pages/sidebar-components/MyEvents";

import Appcsv from "./dashboard-pages/sidebar-components/attendeesui/Appcsv";
import Appinvites from "./dashboard-pages/sidebar-components/attendeesui/Appinvites";
import Appm from "./dashboard-pages/sidebar-components/attendeesui/Appm";
import "./App.css";
import EventDetail from "./dashboard-pages/sidebar-components/EventDetails";
import EditEvent from "./dashboard-pages/sidebar-components/EditEvent";
import EventDescription from "./landing-page/EventDescription";
import AttendeeDashboard from "./attendee-dashboard/Dashboard";

import EventRegistration from "./landing-page/EventRegistration";
import RegisteredEvents from "./attendee-dashboard/RegisteredEvents";
import TicketCreationForm from "./dashboard-pages/sidebar-components/TicketCreationForm";
import BuyTicketWrapper from "./landing-page/BuyTicket";
import SuccessPage from "./landing-page/SuccessPage";
import AttendancePage from "./dashboard-pages/sidebar-components/AttendancePage";
import ProtectedRoute from './ProtectedRoute';
import EventAnalytics from './dashboard-pages/sidebar-components/MyDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/public-events" element={<MorePublicEvents />} />
        
        
        <Route path="/signup" element={<EventSignup />} />
        <Route path="/signin" element={<EventSignin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/event/:eventId" element={<EventDescription />} />
        <Route
          path="/events/:eventId/purchase/:ticketId"
          element={<BuyTicketWrapper />}
        />
        <Route
          path="/events/:eventId/tickets/:ticketId/success"
          element={<SuccessPage />}
        />
        <Route
          path="/events/:eventId/register"
          element={<EventRegistration />}
        />

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        >
          <Route path="mydashboard" element={ <EventAnalytics/>} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="card-creation" element={<CardEditor />} />
          <Route path="my-events" element={<MyEvent />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="event/edit/:id" element={<EditEvent />} />
          
          <Route
            path="create-tickets/:eventId"
            element={<TicketCreationForm />}
          />
          <Route path="events/:eventId/add-attendee" element={<Appm />} />

          <Route path="attendees/send-csv" element={<Appcsv />} />
          <Route path="attendees/:eventId/send-invites" element={<Appinvites />} />
          
        </Route>

        <Route
          path="/attendee/dashboard"
          element={<ProtectedRoute element={<AttendeeDashboard />} />}
        >
          <Route path="registered" element={<RegisteredEvents />} />
        </Route>
        
        <Route path="/attendance" element={<AttendancePage />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      
        </Routes>
      </Router>
  );
}

export default App;

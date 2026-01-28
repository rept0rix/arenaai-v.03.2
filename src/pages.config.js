/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import AccessibilityStatement from './pages/AccessibilityStatement';
import Admin from './pages/Admin';
import ArenaClub from './pages/ArenaClub';
import Blog from './pages/Blog';
import BuyingGuide from './pages/BuyingGuide';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import CustomLogin from './pages/CustomLogin';
import DeveloperCRM from './pages/DeveloperCRM';
import DeveloperDashboard from './pages/DeveloperDashboard';
import DeveloperThankYou from './pages/DeveloperThankYou';
import Filters from './pages/Filters';
import Financing from './pages/Financing';
import FinancingConfirmation from './pages/FinancingConfirmation';
import ForDevelopers from './pages/ForDevelopers';
import History from './pages/History';
import Home from './pages/Home';
import Landing from './pages/Landing';
import LeadDetails from './pages/LeadDetails';
import PetahTikvaLanding from './pages/PetahTikvaLanding';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProjectAnalytics from './pages/ProjectAnalytics';
import ProjectComparison from './pages/ProjectComparison';
import ProjectDetails from './pages/ProjectDetails';
import ProjectLeads from './pages/ProjectLeads';
import PropertyComparison from './pages/PropertyComparison';
import PropertyComparisonInfo from './pages/PropertyComparisonInfo';
import PropertyDetails from './pages/PropertyDetails';
import SavedProperties from './pages/SavedProperties';
import ScheduleMeeting from './pages/ScheduleMeeting';
import Settings from './pages/Settings';
import TermsOfService from './pages/TermsOfService';
import TermsOfServiceDevelopers from './pages/TermsOfServiceDevelopers';
import UserProfile from './pages/UserProfile';
import VirtualTours from './pages/VirtualTours';
import YourBack from './pages/YourBack';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AccessibilityStatement": AccessibilityStatement,
    "Admin": Admin,
    "ArenaClub": ArenaClub,
    "Blog": Blog,
    "BuyingGuide": BuyingGuide,
    "Chat": Chat,
    "Contact": Contact,
    "CustomLogin": CustomLogin,
    "DeveloperCRM": DeveloperCRM,
    "DeveloperDashboard": DeveloperDashboard,
    "DeveloperThankYou": DeveloperThankYou,
    "Filters": Filters,
    "Financing": Financing,
    "FinancingConfirmation": FinancingConfirmation,
    "ForDevelopers": ForDevelopers,
    "History": History,
    "Home": Home,
    "Landing": Landing,
    "LeadDetails": LeadDetails,
    "PetahTikvaLanding": PetahTikvaLanding,
    "PrivacyPolicy": PrivacyPolicy,
    "ProjectAnalytics": ProjectAnalytics,
    "ProjectComparison": ProjectComparison,
    "ProjectDetails": ProjectDetails,
    "ProjectLeads": ProjectLeads,
    "PropertyComparison": PropertyComparison,
    "PropertyComparisonInfo": PropertyComparisonInfo,
    "PropertyDetails": PropertyDetails,
    "SavedProperties": SavedProperties,
    "ScheduleMeeting": ScheduleMeeting,
    "Settings": Settings,
    "TermsOfService": TermsOfService,
    "TermsOfServiceDevelopers": TermsOfServiceDevelopers,
    "UserProfile": UserProfile,
    "VirtualTours": VirtualTours,
    "YourBack": YourBack,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
    Layout: __Layout,
};
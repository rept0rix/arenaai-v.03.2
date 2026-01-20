import About from './pages/About';
import AccessibilityStatement from './pages/AccessibilityStatement';
import Admin from './pages/Admin';
import ArenaClub from './pages/ArenaClub';
import Blog from './pages/Blog';
import BuyingGuide from './pages/BuyingGuide';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import CustomLogin from './pages/CustomLogin';
import DeveloperAdmin from './pages/DeveloperAdmin';
import DeveloperDashboard from './pages/DeveloperDashboard';
import DeveloperThankYou from './pages/DeveloperThankYou';
import Filters from './pages/Filters';
import Financing from './pages/Financing';
import FinancingConfirmation from './pages/FinancingConfirmation';
import ForDevelopers from './pages/ForDevelopers';
import History from './pages/History';
import Home from './pages/Home';
import Landing from './pages/Landing';
import PetahTikvaLanding from './pages/PetahTikvaLanding';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProjectComparison from './pages/ProjectComparison';
import ProjectDetails from './pages/ProjectDetails';
import PropertyComparison from './pages/PropertyComparison';
import PropertyComparisonInfo from './pages/PropertyComparisonInfo';
import PropertyDetails from './pages/PropertyDetails';
import SavedProperties from './pages/SavedProperties';
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
    "DeveloperAdmin": DeveloperAdmin,
    "DeveloperDashboard": DeveloperDashboard,
    "DeveloperThankYou": DeveloperThankYou,
    "Filters": Filters,
    "Financing": Financing,
    "FinancingConfirmation": FinancingConfirmation,
    "ForDevelopers": ForDevelopers,
    "History": History,
    "Home": Home,
    "Landing": Landing,
    "PetahTikvaLanding": PetahTikvaLanding,
    "PrivacyPolicy": PrivacyPolicy,
    "ProjectComparison": ProjectComparison,
    "ProjectDetails": ProjectDetails,
    "PropertyComparison": PropertyComparison,
    "PropertyComparisonInfo": PropertyComparisonInfo,
    "PropertyDetails": PropertyDetails,
    "SavedProperties": SavedProperties,
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
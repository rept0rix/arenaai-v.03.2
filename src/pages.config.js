import Admin from './pages/Admin';
import Home from './pages/Home';
import Chat from './pages/Chat';
import PropertyDetails from './pages/PropertyDetails';
import Landing from './pages/Landing';
import DeveloperAdmin from './pages/DeveloperAdmin';
import PropertyComparison from './pages/PropertyComparison';
import Filters from './pages/Filters';
import About from './pages/About';
import Financing from './pages/Financing';
import History from './pages/History';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import BuyingGuide from './pages/BuyingGuide';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AccessibilityStatement from './pages/AccessibilityStatement';
import ArenaClub from './pages/ArenaClub';
import SavedProperties from './pages/SavedProperties';
import FinancingConfirmation from './pages/FinancingConfirmation';
import ForDevelopers from './pages/ForDevelopers';
import DeveloperThankYou from './pages/DeveloperThankYou';
import TermsOfServiceDevelopers from './pages/TermsOfServiceDevelopers';
import DeveloperDashboard from './pages/DeveloperDashboard';
import VirtualTours from './pages/VirtualTours';
import PropertyComparisonInfo from './pages/PropertyComparisonInfo';
import PetahTikvaLanding from './pages/PetahTikvaLanding';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "Home": Home,
    "Chat": Chat,
    "PropertyDetails": PropertyDetails,
    "Landing": Landing,
    "DeveloperAdmin": DeveloperAdmin,
    "PropertyComparison": PropertyComparison,
    "Filters": Filters,
    "About": About,
    "Financing": Financing,
    "History": History,
    "UserProfile": UserProfile,
    "Settings": Settings,
    "TermsOfService": TermsOfService,
    "Contact": Contact,
    "BuyingGuide": BuyingGuide,
    "Blog": Blog,
    "PrivacyPolicy": PrivacyPolicy,
    "AccessibilityStatement": AccessibilityStatement,
    "ArenaClub": ArenaClub,
    "SavedProperties": SavedProperties,
    "FinancingConfirmation": FinancingConfirmation,
    "ForDevelopers": ForDevelopers,
    "DeveloperThankYou": DeveloperThankYou,
    "TermsOfServiceDevelopers": TermsOfServiceDevelopers,
    "DeveloperDashboard": DeveloperDashboard,
    "VirtualTours": VirtualTours,
    "PropertyComparisonInfo": PropertyComparisonInfo,
    "PetahTikvaLanding": PetahTikvaLanding,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
    Layout: __Layout,
};
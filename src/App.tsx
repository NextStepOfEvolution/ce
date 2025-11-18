import { useState } from "react";
import { Home } from "./screens/Home";
import { Parking } from "./screens/Parking";
import { Charging } from "./screens/Charging";
import { Cases } from "./screens/Cases";
import { Access } from "./screens/Access";
import { Barrier } from "./screens/Barrier";
import { Wallet } from "./screens/Wallet";
import { Profile } from "./screens/Profile";
import { Notifications } from "./screens/Notifications";
import { BottomNav } from "./components/BottomNav";
import { Cams } from "./screens/Cams";
import { Login } from "./screens/Login";
import { AuthService } from "./services";

export type Screen =
  | "home"
  | "parking"
  | "cams"
  | "charging"
  | "cases"
  | "access"
  | "wallet"
  | "profile"
  | "notifications"
  | "barrier";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated);
  
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <Home onNavigate={setCurrentScreen} />;
      case "parking":
        return (
          <Parking onBack={() => setCurrentScreen("home")} />
        );
      case "charging":
        return (
          <Charging onBack={() => setCurrentScreen("home")} />
        );
      case "cams":
        return <Cams onBack={() => setCurrentScreen("home")} />;
      case "cases":
        return (
          <Cases onBack={() => setCurrentScreen("home")} />
        );
      case "access":
        return (
          <Access onBack={() => setCurrentScreen("home")} />
        );
      case "barrier":
        return (
          <Barrier onBack={() => setCurrentScreen("home")} />
        );
      case "wallet":
        return <Wallet />;
      case "profile":
        return <Profile onLogout={() => setIsAuthenticated(false)} />;
      case "notifications":
        return (
          <Notifications
            onBack={() => setCurrentScreen("home")}
          />
        );
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {renderScreen()}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
      />
    </div>
  );
}
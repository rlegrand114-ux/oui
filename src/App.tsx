import { Router, Route, Switch } from "wouter";
import Home from "./pages/Home";
function NotFound() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
      <p className="text-white/50 uppercase tracking-widest text-sm">404 — Page introuvable</p>
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

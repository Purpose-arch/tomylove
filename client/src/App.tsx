import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import PinPage from "@/pages/pin";
import HomePage from "@/pages/home";
import ReasonsPage from "@/pages/reasons";
import PhotosPage from "@/pages/photos";
import MailPage from "@/pages/mail";
import LockedPage from "@/pages/locked";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PinPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/reasons" component={ReasonsPage} />
      <Route path="/photos" component={PhotosPage} />
      <Route path="/mail" component={MailPage} />
      <Route path="/locked" component={LockedPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

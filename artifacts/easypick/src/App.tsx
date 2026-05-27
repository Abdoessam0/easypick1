import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EasypickProvider } from "@/lib/easypick-context";
import WelcomePage from "@/pages/Welcome";
import ModePage from "@/pages/Mode";
import QuickPage from "@/pages/Quick";
import SmartPage from "@/pages/Smart";
import ResultsPage from "@/pages/Results";
import ComparePage from "@/pages/Compare";
import ChoosePage from "@/pages/Choose";
import OrderPage from "@/pages/Order";
import NotFoundPage from "@/pages/NotFound";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/mode" component={ModePage} />
      <Route path="/quick" component={QuickPage} />
      <Route path="/smart" component={SmartPage} />
      <Route path="/results" component={ResultsPage} />
      <Route path="/compare" component={ComparePage} />
      <Route path="/choose" component={ChoosePage} />
      <Route path="/order" component={OrderPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EasypickProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </EasypickProvider>
    </QueryClientProvider>
  );
}

export default App;

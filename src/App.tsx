import { Route, Routes } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { HomePage } from "./pages/HomePage";
import { CareersPage } from "./pages/CareersPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { ApplyPage } from "./pages/ApplyPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { ContactPage } from "./pages/ContactPage";

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1D1D1F] antialiased">
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:slug" element={<JobDetailPage />} />
          <Route path="/careers/:slug/apply" element={<ApplyPage />} />
          <Route path="/careers/:slug/apply/thank-you" element={<ThankYouPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;

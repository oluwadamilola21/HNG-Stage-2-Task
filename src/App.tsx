import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import InvoiceList from "./pages/InvoicesPage";
import InvoiceDetail from "./pages/InvoicesDetailPage";
import { InvoicesProvider } from "./context/InvoicesContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Route>
    )
  );

  return (
    <InvoicesProvider>
      <RouterProvider router={router} />
    </InvoicesProvider>
  );
}

export default App;
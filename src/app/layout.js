import { Poppins } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/context/FormDataContext";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "CRUD Menu Management with Firebase Realtime Database",
  description: `Effortlessly create, manage, and update your menus with this user-friendly CRUD menu application. 
    Firebase Realtime Database ensures real-time data synchronization, keeping your menus always up-to-date.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <FormProvider>
        <body className={poppins.className}>
          <main>{children} </main>
        </body>
      </FormProvider>
    </html>
  );
}

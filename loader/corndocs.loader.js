module.exports = function (source) {
  let new_content = `
     import "../styles/globals.css";
     import "../styles/progress.css";
     import "../styles/custom.css";
     import type { AppProps } from "next/app";
     import { SidebarProvider } from "../context/SidebarContext";
     import { DarkmodeProvider } from "../context/DarkModeContext";
     import { CommandProvider } from "../context/CommandContext";
     import Layout from "../components/layout/Layout

     function MyApp({ Component, pageProps }: AppProps) {
       return (
         <>
           <CommandProvider>
             <SidebarProvider>
               <DarkmodeProvider>
                 <Layout>
                   <Component {...pageProps} />
                 </Layout>
               </DarkmodeProvider>
             </SidebarProvider>
           </CommandProvider>
         </>
       );
     }

     export default MyApp;`;

  return `${new_content}`;
};

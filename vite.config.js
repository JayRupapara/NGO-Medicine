import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: "https://ngo-medicine.onrender.com",
    proxy: "https://ngo-medicine.onrender.com",

    // proxy: {
    //   "/api/registerdoner": {
    //     target: "https://ngo-medicine.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/api/logindoner": {
    //     target: "https://ngo-medicine.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/api/donatemedicine": {
    //     target: "https://ngo-medicine.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/api/getdonatedmedicine": {
    //     target: "https://ngo-medicine.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/api/admin/addadmin": {
    //     target: "https://ngo-medicine.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/api/admin/loginadmin": {
    //     target: "https://ngo-medicine.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },

    // proxy: {
    //   "*": {
    //     target: "https://ngo-medicine.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});

const APP_URL = import.meta.env.VITE_REACT_APP_BASE_URL ?? import.meta.env.BASE_URL ?? "http://localhost:5173";
const ENV = import.meta.env.MODE || "development";

export const config = {
    app: {
        url: APP_URL,
        env: ENV,
        title: "Jobly",
        devMode: ENV === "development" || import.meta.env.DEV //boolean whether the app is in dev mode,
    }
}
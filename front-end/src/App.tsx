import "./App.css";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {
  //   useEffect(() => {
  //     WebSocketService.connect();
  //     console.log("Connect to the server");

  //     return () => {
  //       WebSocketService.disconnect();
  //       console.log("Disonnect to the server");
  //     };
  //   }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;

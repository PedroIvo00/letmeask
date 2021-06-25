import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  // função app

  return (
    // FAZ O ROTEAMENTO DE ENDEREÇOS
    <BrowserRouter>
      {/* REALIZA CONTEÚDO APENAS SE ESTIVER LOGADO */}
      <AuthContextProvider>
        {/* ALTERA O ENDEREÇO DESTINO DEPENDENDO DO CAMINHO INSERIDO EM ROTA */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/news" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" exact component={AdminRoom} />

        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

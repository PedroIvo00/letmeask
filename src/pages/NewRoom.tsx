import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';
import { ToggleButton } from '../components/ToggleButton';


export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');
    const { theme, toggleTheme } = useTheme();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        // SE A SALA EXISTIR, INSERE INFORMAÇÕES DA SALA SALVAS NO FIREBASE
        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth" className={theme}>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas aqui da sua audiência em tempo-real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <ToggleButton
                        toggle={theme}
                        type="checkbox"
                        onChange={toggleTheme} />
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Criar uma nova sala</h2>
                    {/* FORMULARIO QUE RECOLHE INFORMAÇÕES PARA CRIAR NOVA SALA */}
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
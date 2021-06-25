import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likeCount: number;
    // string OU nulo
    likeId: string | undefined;
}

// usado para reusar funcionalidades
export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');
    // LISTA AS PERGUNTAS SEMPRE QUE UMA FOR ADICIONADA

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    // SOME sempre retorna true ou false, SE ENCONTROU
                    // USER.ID É DEPENDENCIA Q VEM DE USEEFFECT()
                    //FIND sempre retorna o EXATO
                    //caso retorne resultado ?. traz posição zero
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })
        // SE POR ALGUM MOTIVO DO ID DO USER MUDAR, PRECISA CARREGAR PERGUNTA DE NOVO POR ISSO PASSA O ID
        return () => {
            // REMOVE TODOS OS LISTENERS APÓS O LISTENER.ON()
            roomRef.off('value');
        }
    }, [roomId, user?.id]);

    return { questions, title }
}
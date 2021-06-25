import './styles.scss';
// REACTNODE É QUALQUER COISA ACEITAVEL NO JSX OU EM RETURN
import { ReactNode } from 'react';
import cx from 'classnames';

type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighLighted?: boolean;
}

export function Questions({
    content,
    author,
    isAnswered = false,
    isHighLighted = false,
    children,
}: QuestionsProps) {
    return (
        // className usa a biblioteca CLASSNAMES
        // usado para simplificar parametros de decisao
        // aqui simplificou:    
        // `question ${isAnswered ? 'answered' : ''}
        // ${isHighLighted ? 'highlighted' : ''}`
        <div className={cx(
            'question',
            { answered: isAnswered },
            { highlighted: isHighLighted && !isAnswered },
        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}
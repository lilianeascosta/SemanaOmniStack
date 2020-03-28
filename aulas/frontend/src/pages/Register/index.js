import React from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';

export default function Register() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [whatsapp, setWhatsapp] = React.useState('');
    const [city, setCity] = React.useState('');
    const [uf, setUf] = React.useState('');

    const history = useHistory(); //faz navegação entre uma função javascript

    async function handleRegister(e) { //função responsável por fazer o cadastro do usuario
        e.preventDefault(); //previne o comportamente padrao de cadastro de recarregar a pagina
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try{
            const response = await api.post('/ongs', data); //envia pro banco
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); //direciona o usuario pra rota login
        } catch(err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o logon
                    </Link> 
                </section>
                <form onSubmit={handleRegister} >
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} //pega o valor do input para a "atualização" levando para a variavel name
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder = "UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
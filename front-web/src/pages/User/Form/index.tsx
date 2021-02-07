import BaseForm from 'core/components/BaseForm';
import React, { useState } from 'react';
import './styles.scss';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {

    const [formData, setFormData] = useState<FormState>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roles: ''
    });

    const handleOnChange = (event: FormEvent) => {
        //Pegando o nome do campo e o seu valor
        const name = event.target.name;
        const value = event.target.value;
        
        setFormData(data => ({ ...data, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }

    return(
        <div className="container-form">
            <form onSubmit={handleSubmit}>
                <BaseForm title="CADASTRO UM USUÁRIO">
                    <div className="row">
                        <div className="col-6">
                            <input value={formData.firstName} name="firstName" onChange={handleOnChange} type="text" className="form-control" placeholder="Nome" />                        
                            <input value={formData.email} name="email" onChange={handleOnChange} type="text" className="form-control" placeholder="Email" /> 
                            <input value={formData.password} name="password" onChange={handleOnChange} type="text" className="form-control" placeholder="Digite aqui a Senha" />                      
                        </div>
                        <div className="col-6">
                            <input value={formData.lastName} name="lastName" onChange={handleOnChange} type="text" className="form-control" placeholder="Sobrenome" />
                            <select 
                                value={formData.roles}
                                name="roles" 
                                onChange={handleOnChange}
                                className="form-control mb-5" 
                            >
                                <option value="2">ADMINISTRADOR</option>
                                <option value="1">OPERADOR</option>
                            </select>
                            {/* <input value={formData.password} name="password" onChange={handleOnChange} type="text" className="form-control" placeholder="Repita aqui a Senha" /> */}
                        </div>
                    </div>
                </BaseForm>
            </form>
        </div>        
    )
}

export default Form;
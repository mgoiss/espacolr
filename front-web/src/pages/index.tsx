import React from 'react';
import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg'
import { ReactComponent as ScheduleImage } from 'core/assets/images/scheduling.svg'
import BaseScreen from 'core/components/BaseScreen';
import { useHistory } from 'react-router';


const Public = () => {

  const history = useHistory().location.pathname;

  return (
    <>
      { history.includes('login') ?
        < BaseScreen
          img={< AuthImage />}
          title="Seja Bem Vindo"
          subTitle="Informe as suas credenciais e acesse nosso sistema."
        />
        : (history.includes('recover') ?
          < BaseScreen
            img={< AuthImage />}
            title="Esqueceu, foi?"
            subTitle="Não se preocupe, é super normal esquecer<br/>a senha. Basta infromar seu email que te<br/>ajudamos com a recuperação."
          />
          : (
            < BaseScreen
              img={< ScheduleImage />}
              title="Qual a Data?"
              subTitle="Para agendar um dia no Espaço LR basta prencher os<br/>dados."
            />
          )
        )
      }
    </>

  );
}

export default Public;
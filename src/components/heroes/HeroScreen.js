import React from 'react';
import { useParams, Redirect } from 'react-router-dom';


import { getHeroeById } from '../../selectors/getHeroById'

export const HeroScreen = ({history}) => {

    const {heroeId} = useParams();

    const hero = getHeroeById( heroeId);

    if(!hero){
        return <Redirect to="/" />;
    }

    const handleReturn = () => {
        if( history.length <=2 ){
            hero.publisher === 'Marvel Comics' && history.push('/');
            hero.publisher === 'DC Comics' && history.push('/dc');
        }else{
        history.goBack();
        }
    }

    const {
        superhero,
        alter_ego,
        first_appearance,
        characters} = hero;

    return (
        <div className="card ms-3" style={ {maxWidth: '540px', maxHeight: '80vh' } }>
            <div className="row no-gutters">
                <div className="col-md-4" style={{height: '100%'}}>
                    <img src={ `../assets/heroes/${ heroeId }.jpg` } style={{height: '100%'}} className="card-img" alt={superhero}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{superhero}</h5>
                        <p className="card-text">{ alter_ego }</p>

                        {
                            (alter_ego !== characters)
                            && <p className="card-text">{characters}</p>
                        }

                        <p className="card-text">
                            <small className="text-muted"> { first_appearance }</small>
                        </p>

                        <h5>Characters</h5>
                        <p>{characters}</p>
                        <button 
                            className="btn btn-outline-info"
                            onClick={handleReturn}>
                            Return
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

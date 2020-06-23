import React from 'react';
import preloader from '../../../assets/images/preloader.svg';

const Preloader: React.FC = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <img alt={'preloader'} src={preloader} />
        </div>
    );
};

export default Preloader;

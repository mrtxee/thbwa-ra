import React from 'react';

const About = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col mt-0">
                    <p className="lead">
                        Tuya Home Online - это клиент платформы Интернета вещей Tuya Smart. Веб-клиент позволит
                        управлять умным домом с любого пользовательского устройства, вне зависимости от мобильного
                        приложения и источника данных.
                    </p>
                </div>
            </div>

            <div className="row mt-0">
                <div className="col text-end">
                    <img src={require('../assets/app01.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app02.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app05.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app10.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app09.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app03.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app07.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app04.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app06.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                    <img src={require('../assets/app08.png')} width="32" className="rounded opacity-75 ms-1 mt-1" alt="..."/>
                </div>
            </div>
            <div className="row">
                <div className="col mt-4">
                    <p className="lead">
                        Главные преимущества
                    </p>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-4">
                <div className="col p-4">
                    <p className="text-center">
                        <img src={require('../assets/1055687-crosspl.png')} width="140" height="140" className="rounded"
                             alt="..."/>
                    </p>
                    <p className="h4 text-center text-break">Кроссплатформенность</p>
                    <p>Возможность управлять умным домом с ПК, с любого клиентского устройства помимо смартфона</p>
                </div>
                <div className="col p-4">
                    <p className="text-center">
                        <img src={require('../assets/1055661-interf.png')} width="140" height="140" className="rounded"
                             alt="..."/>
                    </p>
                    <p className="h4 text-center text-break">Унифицированный интерфейс</p>
                    <p>Унифицированный интерфейс для всех устройств умного дома. Отсутсвуе визуальный шума, в сравнении
                        с мобильным приложением</p>
                </div>
                <div className="col p-4">
                    <p className="text-center">
                        <img src={require('../assets/1055652-sourc.png')} width="140" height="140" className="rounded"
                             alt="..."/>
                    </p>
                    <p className="h4 text-center text-break">Любой источник данных</p>
                    <p>Поддержка всех мобильных прижений платформы.
                        <small className="text-muted">Tuya Smart, SmartLiving, DIGMA, BlitzWolf, EKF Connect, ЭРА Smart,
                            iFEEL, IRBIS, STARWIND, Navigator, HIPER, ELARI, HomeAlone, SLS, DENVER, KOJIMA, GEOZON,
                            ЯСмарт,
                            Perenio, Minimir, Gosund, Sibling, Securic, Brilliant...</small>
                    </p>
                </div>
                <div className="col p-4">
                    <p className="text-center">
                        <img src={require('../assets/1055675-support.png')} width="140" height="140" className="rounded"
                             alt="..."/>
                    </p>
                    <p className="h4 text-center text-break">Поддержка</p>
                    <p>Открытая <a className="text-decoration-none link-dark" href="https://t.me/mrtxee">
                        <i className="bi bi-telegram"></i> поддержка</a> пользователей для совместного развития проекта
                        улучшения пользовательского опыта </p>
                </div>
            </div>
        </div>
    );
};

export default About;
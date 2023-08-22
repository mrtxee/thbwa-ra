import React from 'react';
import {Image} from "react-bootstrap";

// const Extra = ({signinModalID}) => {
// return (

const Faq = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col mt-0">
                    <p>Tuya Home Online реализует веб-интерфейс для управления Вашими умными устройствам.</p>
                    <p>Привязка устройств и программирование сценариев происходит через мобильное приложение. Для того,
                        чтобы у tuyahome.online получил доступ к Вашим устройствам, необходимо указать реквизиты доступа
                        к платформе <a href="https://auth.tuya.com" className="text-decoration-none">IOT
                            Tuya</a> в <a href="/user/profile/" className="text-decoration-none">профиле
                            пользователя</a>. Для получения реквизитов доступа Вам понадобится мобильное приложение и
                        инструкция ниже.
                    </p>
                    <h5>Как получить Access id, Access secret, UID?</h5>
                    <dl>
                        <dt>1. Войти в аккаунт tuya</dt>
                        <dd>
                            <figure className="figure">
                                <a href={require("../assets/faq01.png")} target="_blank" rel="noreferrer">
                                    <Image src={require("../assets/faq01.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                </a>
                                <figcaption className="figure-caption">
                                    Зарегистрироваться и войти в аккаунт <a target="_blank" rel="noreferrer"
                                                                            href="https://auth.tuya.com/"
                                                                            className="text-decoration-none">tuya.com</a>
                                </figcaption>
                            </figure>
                        </dd>
                        <dt>2. Создайте новый проект</dt>
                        <dd>
                            <figure className="figure">
                                <a href={require("../assets/faq03.png")} target="_blank" rel="noreferrer">
                                    <Image src={require("../assets/faq03.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                </a>
                                <figcaption className="figure-caption">
                                    <p className="mb-1">
                                        Перейти <strong>Cloud - Development</strong>
                                    </p>
                                    <p className="mb-1">
                                        Нажать <strong>Create Cloud Project</strong>
                                    </p></figcaption>
                            </figure>
                        </dd>
                        <dd>
                            <figure className="figure">
                                <a href={require("../assets/faq04.png")} target="_blank" rel="noreferrer">
                                    <Image src={require("../assets/faq04.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                </a>
                                <figcaption className="figure-caption">
                                    Заполнить описание нового проекта. <strong>Data Center</strong> - регион, с который
                                    был указан в мобильном приложении. Если не уверены, добавьте все регионы.
                                </figcaption>
                            </figure>
                        </dd>
                        <dd>
                            <figure className="figure">
                                <a href={require("../assets/faq05.png")} target="_blank" rel="noreferrer">
                                    <Image src={require("../assets/faq05.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                </a>
                                <figcaption className="figure-caption">
                                    Добавить все группы API-команд. Нажать <strong>All</strong>,
                                    нажать <strong>Authorize</strong>
                                </figcaption>
                            </figure>
                        </dd>
                        <dt>3. Подключить мобильное приложение</dt>
                        <dd>
                            <a href={require("../assets/faq07.png")} target="_blank" rel="noreferrer">
                                <figure className="figure">
                                    <Image src={require("../assets/faq07.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                    <figcaption className="figure-caption">
                                        Открыть созданный проект, Перейти на вкладку <strong>Devices - Link Tuya App
                                        Account</strong>, Нажать <strong>Add App Account</strong>
                                    </figcaption>
                                </figure>
                            </a>
                        </dd>
                        <dd>

                            <figure className="figure">
                                <a href={require("../assets/faq08.png")} target="_blank" rel="noreferrer">
                                    <Image src={require("../assets/faq08.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                </a>
                                <figcaption className="figure-caption">
                                    <p className="mb-1">
                                        В мобильном приложении нажать <strong>➕ - Scan QR-code</strong>, задать
                                        параметры доступа.
                                    </p>
                                    <p className="mb-1">
                                        Device Linking Method: <strong>Automatic Link</strong>
                                    </p>
                                    <p className="mb-1">
                                        Device Permition: <strong>Read, write and manage</strong>
                                    </p>
                                </figcaption>
                            </figure>
                        </dd>
                        <dd>
                            <figure className="figure">
                                <a href={require("../assets/faq09.png")} target="_blank" rel="noreferrer">
                                    <Image src={require("../assets/faq09.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                </a>
                                <figcaption className="figure-caption">
                                    Если вы все сделали правильно, получите сообщение об успешном добавлении устройств
                                </figcaption>
                            </figure>
                        </dd>
                        <dt>4. Скопировать реквизиты доступа</dt>
                        <dd>
                            <figure className="figure">
                                <a href={require("../assets/faq10.png")} target="_blank" rel="noreferrer">
                                    <Image src={require("../assets/faq10.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                </a>
                                <figcaption className="figure-caption">
                                    Открыть проект, перейти на вкладку <strong>Devices - Link Tuya App
                                    Account</strong> Скопировать <strong>UID</strong>.
                                </figcaption>
                            </figure>
                        </dd>
                        <dd>
                            <figure className="figure">
                                <a href={require("../assets/faq06.png")} target="_blank" rel="noreferrer">
                                    <Image src={require("../assets/faq06.png")} className="rounded border border-3"
                                           alt="..." fluid/>
                                </a>
                                <figcaption className="figure-caption">
                                    Открыть проект, перейти на вкладку <strong>Authorization - Cloud
                                    Authorization</strong> Скопировать <strong>Access ID, Access Secret</strong>.
                                </figcaption>
                            </figure>
                        </dd>
                    </dl>
                    <h5>Как получить Access id, Access secret, UID?</h5>
                    <dl>
                        <dd>
                            В этом поле необходимо выбрать регион из списка, который используется в Вашем мобильном
                            приложении.
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Faq;
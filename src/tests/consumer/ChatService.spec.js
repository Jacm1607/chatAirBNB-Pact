import { MatchersV3, PactV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ChatService } from '../../services/ChatService.js';
import { GuestUUID, HostUUID, chatsResponse, crearChat, crearChatResponse } from '../PactResponseChat.js';

const { like } = MatchersV3;

describe('El API de Chat', () => {

    let service;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'chat-service'
    });

    describe('crear chat', () => {
        it('retorna estado 201', () => {
            //Arrange
            provider.given('crear chat')
                .uponReceiving('para crear una Chat')
                .withRequest({
                    method: 'POST',
                    path: '/chat/create',
                    headers: {
                        'Accept': '*/*',
                    },
                    contentType: 'application/json',
                    body: like(crearChat)
                }).willRespondWith({
                    status: 201,
                    headers: { 'Content-Type': 'application/json; charset=utf-8'},
                    contentType: 'application/json',
                    body: like(crearChatResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                service = new ChatService(mockServer.url);
                return service.crear(crearChat.guestId, crearChat.hostId, crearChat.name).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.deep.equal(crearChatResponse);       
                });
            });

        });
    });

    describe('busca chats del anfitrion', () => {
        it('retorna una lista de chats del anfitrion encontrado', () => {
            //Arrange
            provider.given('realizar busqueda de chats del anfitrion')
                .uponReceiving('chats del anfitrion')
                .withRequest({
                    method: 'GET',
                    path: `/chat/host/${HostUUID}`,
                    headers: {
                        'Accept': 'application/json'
                    },
                    contentType: 'application/json',
                }).willRespondWith({
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: like(chatsResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                service = new ChatService(mockServer.url);
                return service.obtenerChatHost(HostUUID).then((response) => {
                    // Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(chatsResponse);   
                    expect(response).to.be.an('array');
                });
            });
        });
    });

    describe('busca chats del huesped', () => {
        it('retorna una lista de chats del huesped encontrado', () => {
            //Arrange
            provider.given('realizar busqueda de chats del huesped')
                .uponReceiving('chats del huesped')
                .withRequest({
                    method: 'GET',
                    path: `/chat/guest/${GuestUUID}`,
                    headers: {
                        'Accept': 'application/json'
                    },
                    contentType: 'application/json',
                }).willRespondWith({
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: like(chatsResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                service = new ChatService(mockServer.url);
                return service.obtenerChatGuest(GuestUUID).then((response) => {
                    // Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(chatsResponse);   
                    expect(response).to.be.an('array');
                });
            });
        });
    });
});
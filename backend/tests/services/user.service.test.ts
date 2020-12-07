import { UserService } from '../../src/services/user.service';
import { User, UserAttributes } from '../../src/models/user.model';
import dirtychai from 'dirty-chai';
import { expect } from 'chai';

// use command "npm run test" to run the tests

const chai = require('chai');
chai.use(dirtychai);

describe('UserService Tests', () => {

    const testUserService: UserService = new UserService();

    const user1: UserAttributes = {
        userId: 1,
        userName: 'Luca',
        password: 'notSecure10',
        email: 'luca@gmail.com',
        firstName: 'Luca',
        lastName: 'Schaller',
        gender: null,
        telephoneNumber: null,
        street: null,
        pinCode: null,
        city: 'Schmitten',
        country: null,
        admin: false,
        wallet: 500
    };

    const user2: UserAttributes = {
        userId: 2,
        userName: 'Lewis',
        password: 'notSecure20',
        email: 'lewis@gmail.com',
        firstName: 'Lewis',
        lastName: 'Holt',
        gender: null,
        telephoneNumber: null,
        street: null,
        pinCode: null,
        city: null,
        country: null,
        admin: true,
        wallet: 500
    };

    before('create admin', function() {
        User.create(user2);
    });

    describe('Test registration', () => {
        it('register user successfully', function() {
            testUserService.register(user1).then(user => {
                expect(user.userName).eq('Luca');
                expect(user.city).eq('Schmitten');
                expect(user.street).to.be.null();
                User.findOne({
                    where: {
                        userName: 'Luca'
                    }
                }).then(foundUser => {
                    expect(foundUser).not.to.be.null();
                    expect(foundUser.password).not.to.be.eq('notSecure10');
                });
            });
        });
        it('can not register with missing necassary attributes', function() {
            testUserService.register({
                userId: 3,
                userName: null,
                password: 'notSecure12',
                email: null,
                firstName: 'Nora',
                lastName: 'Weber',
                gender: null,
                telephoneNumber: null,
                street: null,
                pinCode: null,
                city: null,
                country: null,
                admin: false,
                wallet: 500
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
        it('can not register with taken userName', function() {
            testUserService.register({
                userId: 3,
                userName: 'Luca',
                password: 'notSecure12',
                email: 'nora@gmail.com',
                firstName: 'Nora',
                lastName: 'Weber',
                gender: null,
                telephoneNumber: null,
                street: null,
                pinCode: null,
                city: null,
                country: null,
                admin: false,
                wallet: 500
            }).catch(err => {
                expect(err.message).eq('This username is already taken!');
            });
        });
        it('can not register with taken email', function() {
            testUserService.register({
                userId: 3,
                userName: 'Nora',
                password: 'notSecure12',
                email: 'luca@gmail.com',
                firstName: 'Nora',
                lastName: 'Weber',
                gender: null,
                telephoneNumber: null,
                street: null,
                pinCode: null,
                city: null,
                country: null,
                admin: false,
                wallet: 500
            }).catch(err => {
                expect(err.message).eq('This e-mail is already taken!');
            });
        });
    });
    describe('Test login', () => {
        it('can log in successfully with userName', function() {
            testUserService.login({
                userNameOrMail: 'Luca',
                password: 'notSecure10'
            }).then(response => {
                expect(response).to.have.property('token');
            });
        });
        it('can log in successfully with email', function() {
            testUserService.login({
                userNameOrMail: 'luca@gmail.com',
                password: 'notSecure10'
            }).then(response => {
                expect(response).to.have.property('token');
            });
        });
        it('can not log in with wrong userName', function() {
            testUserService.login({
                userNameOrMail: 'Luca1',
                password: 'notSecure10'
            }).catch(err => {
                expect(err.message).eq('not authorized');
            });
        });
        it('can not log in with wrong password', function() {
            testUserService.login({
                userNameOrMail: 'Luca',
                password: 'hello'
            }).catch(err => {
                expect(err.message).eq('not authorized');
            });
        });
    });
    describe('Test update user', () => {
        it('can update user succsessfully', function() {
            testUserService.update(1, {
                userId: 1,
                userName: 'Luca',
                password: 'notSecure10',
                email: 'luca@gmail.com',
                firstName: 'Luca',
                lastName: 'Schaller',
                gender: null,
                telephoneNumber: null,
                street: null,
                pinCode: null,
                city: 'Freiburg',
                country: 'Switzerland',
                admin: false,
                wallet: 500
            }).then(() => {
                User.findOne({
                    where: {
                        userName: 'Luca'
                    }
                }).then(foundUser => {
                    expect(foundUser.city).eq('Freiburg');
                    expect(foundUser.country).eq('Switzerland');
                });
            });
        });
        it('can not update user with unallowed data', function() {
            testUserService.update(1, {
                userId: 1,
                userName: null,
                password: 'notSecure10',
                email: 'luca@gmail.com',
                firstName: 'Luca',
                lastName: 'Schaller',
                gender: null,
                telephoneNumber: null,
                street: null,
                pinCode: null,
                city: 'Schmitten',
                country: null,
                admin: false,
                wallet: 500
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
        it('can not update user which can not be found', function() {
            testUserService.update(5, {
                userId: 1,
                userName: 'Luca',
                password: 'notSecure10',
                email: 'luca@gmail.com',
                firstName: 'Luca',
                lastName: 'Schaller',
                gender: null,
                telephoneNumber: null,
                street: null,
                pinCode: null,
                city: 'Freiburg',
                country: null,
                admin: false,
                wallet: 500
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test get all users', () => {
        it('can return all registered users', function() {
            testUserService.getAll().then(users => {
                expect(users[0].userName).eq('Luca');
                expect(users.length).eq(2);
            });
        });
    });
    describe('Test get user', () => {
        it('can return one registered user', function() {
            testUserService.getUser(1).then(user => {
                expect(user.userName).eq('Luca');
            });
        });
        it('can not return nonregistered user', function() {
            testUserService.getUser(5).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test promote user to admin', () => {
        it('can promote user', function() {
            User.findOne({
                where: {
                    userName: 'Luca'
                }
            }).then(foundUser => {
                expect(foundUser.admin).to.be.false();
                testUserService.makeAdmin(user1).then(() => {
                    User.findOne({
                        where: {
                            userName: 'Luca'
                        }
                    }).then(foundOtherUser => {
                        expect(foundOtherUser.admin).to.be.true();
                    });
                });
            });
        });
        it('can not promote user who is not registered', function() {
            testUserService.makeAdmin({
                userId: 4,
                userName: 'Hans',
                password: 'notSecure20',
                email: 'hans@gmail.com',
                firstName: 'Hans',
                lastName: 'Müller',
                gender: null,
                telephoneNumber: null,
                street: null,
                pinCode: null,
                city: null,
                country: null,
                admin: false,
                wallet: 500
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test demote admin to user', () => {
        it('can demote admin', function() {
            User.findOne({
                where: {
                    userName: 'Lewis'
                }
            }).then(foundUser => {
                expect(foundUser.admin).to.be.true();
                testUserService.removeAdmin(user2).then(() => {
                    User.findOne({
                        where: {
                            userName: 'Lewis'
                        }
                    }).then(foundOtherUser => {
                        expect(foundOtherUser.admin).to.be.false();
                    });
                });
            });
        });
        it('can not demote admin who is not registered', function() {
            testUserService.removeAdmin({
                userId: 3,
                userName: 'Hans',
                password: 'notSecure20',
                email: 'hans@gmail.com',
                firstName: 'Hans',
                lastName: 'Müller',
                gender: null,
                telephoneNumber: null,
                street: null,
                pinCode: null,
                city: null,
                country: null,
                admin: true,
                wallet: 500
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
});

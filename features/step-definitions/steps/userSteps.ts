import { assert, expect } from 'chai';
import { Given, When, Then } from 'cucumber';
import httpClient from '../helpers/httpClient';
import * as faker from 'faker';

When('I add new user with unique email', async function () {
    const response = await httpClient.post('/users', {
        'name': faker.name.findName(),
        'email': faker.internet.email()
    });

    this.newUser = response.body;
    assert.strictEqual(response.statusCode, 201);
});

Then('I should receive a details for him', async function () {
    const response = await httpClient.get('/users/' + this.newUser.id);
    assert.strictEqual(response.statusCode, 200);
});

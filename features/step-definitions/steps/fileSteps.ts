import { assert } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import * as fs from 'fs';
import httpClient from '../helpers/httpClient';
import * as util from 'util';
import * as stream from 'stream';
const md5File = require('md5-file/promise');

const TEST_FILES_PATH = 'features/files/';
const RESULT_FILES_PATH = TEST_FILES_PATH + 'results/';
const EXPECTED_FILES_PATH = TEST_FILES_PATH + 'expected/';

const pipeline = util.promisify(stream.pipeline);
const unlink = util.promisify(fs.unlink);


const checkFileExists = async filePath => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, error => {
            resolve(!error);
        });
    });
};

Given('a service with flow steps {string}', async function (flowSteps) {
    const response = await httpClient.post('/services', { flowSteps: flowSteps.split(',') });

    this.service = response.body;

    assert.strictEqual(response.statusCode, 201);
});


When('I run the service execution with the file {string} and save results to {string}', async function (sourceFile, resultFile) {
    const resultFilePath = RESULT_FILES_PATH + resultFile;
    if (await checkFileExists(resultFilePath)) {
        await unlink(resultFilePath);
    }

    await pipeline(
        fs.createReadStream(TEST_FILES_PATH + sourceFile),
        httpClient.postWithStream(`/services/${this.service.id}/execute`),
        fs.createWriteStream(resultFilePath)
    );
});


Then('I should receive the result file {string} with the same hash as for {string}', async function (resultFile, expectedFile) {
   const hashes = await Promise.all([
       md5File(RESULT_FILES_PATH + resultFile),
       md5File(EXPECTED_FILES_PATH + expectedFile)
   ]);

    assert.strictEqual(hashes[0], hashes[1]);
});


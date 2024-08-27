// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
const { SHA, PR_NUMBER, SYSTEM_INFO, API_TEST_RESULT, E2E_TEST_RESULT, API_COVERAGE, E2E_COVERAGE } = process.env;

const replace = (obj: { [key: string]: any }) => Object.keys(obj).forEach(key => (typeof obj[key] === 'object' ? replace(obj[key]) : (obj[key] = String(obj[key]))));
const readFile = (filePath: string) => (fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : false);
const getCoverageReport = (filePath: string) => {
    const coverageReport = readFile(filePath);
    if (!coverageReport) {
        console.log(`Coverage Report File ${filePath.split('/').pop()} does not exist!`);
        return '';
    }
    return String(coverageReport.coverage);
};
const getTestResult = (suiteName: string, filePath: string, coverage: string) => {
    const testResult = readFile(filePath);
    if (!testResult) {
        console.log(`Coverage Report File ${filePath.split('/').pop()} does not exist!`);
        return [];
    }
    replace(testResult);
    return [suiteName, testResult.total_tests, testResult.passed, testResult.failed, testResult.flaky, testResult.skipped, testResult.suite_duration_formatted, coverage];
};

const addSummaryHeadingAndTable = core => {
    const tableHeader = [
        { data: 'Test :test_tube:', header: true },
        { data: 'Total :bar_chart:', header: true },
        { data: 'Passed :white_check_mark:', header: true },
        { data: 'Failed :rotating_light:', header: true },
        { data: 'Flaky :construction:', header: true },
        { data: 'Skipped :next_track_button:', header: true },
        { data: 'Duration :alarm_clock:', header: true },
        { data: 'Coverage :checkered_flag:', header: true },
    ];

    const apiTestResult = getTestResult('API Tests', API_TEST_RESULT, getCoverageReport(API_COVERAGE));
    const e2eTestResult = getTestResult('E2E Tests', E2E_TEST_RESULT, getCoverageReport(E2E_COVERAGE));
    const pr_number = SHA ? `PR: ${PR_NUMBER}` : '';
    const commit_sha = SHA ? `Commit SHA: ${SHA}` : '';

    if (apiTestResult.length || e2eTestResult.length) {
        core.summary.addHeading('Tests Summary').addRaw(pr_number).addRaw(commit_sha).addBreak().addBreak().addTable([tableHeader, apiTestResult, e2eTestResult]);
    }
};

const addList = core => {
    const envInfo = readFile(SYSTEM_INFO);
    if (!envInfo) {
        return false;
    }
    const pluginList = core.summary.addList(envInfo.activePlugins).stringify();
    core.summary.clear();
    const pluginDetails = core.summary.addDetails('Plugins: ', pluginList).stringify();
    core.summary.clear();
    return core.summary.addList([envInfo.wpVersion, envInfo.phpVersion, envInfo.mysqlVersion, String(envInfo.wpDebugMode), envInfo.theme, pluginDetails]).stringify();
};

const addSummaryFooter = (core:any, list:any) => {
    core.summary.addBreak().addDetails('Test Environment Details: ', list);
};

export default async ({ github, context, core }) => {
    const plugins = addList(core);
    await core.summary.clear();
    addSummaryHeadingAndTable(core);
    if (plugins) addSummaryFooter(core, plugins);
    const summary = core.summary.stringify();
    await core.summary.write();
    return summary;
};

import * as fs from 'fs';
import * as path from 'path';

interface TestReport {
    suite_name: string;
    total_tests: number;
    passed: number;
    failed: number;
    flaky: number;
    skipped: number;
    suite_duration: number;
    suite_duration_formatted?: string;
    tests: string[];
    passed_tests: string[];
    failed_tests: string[];
    flaky_tests: string[];
    skipped_tests: string[];
}

// Helper function to format duration
const getFormattedDuration = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    return `${hours < 1 ? '' : hours + 'h '}${minutes < 1 ? '' : minutes + 'm '}${seconds < 1 ? '' : seconds + 's'}`;
};

// Main function to merge reports
const mergeReports = (reportPaths: string[]): TestReport => {
    const mergedReport: TestReport = {
        suite_name: '',
        total_tests: 0,
        passed: 0,
        failed: 0,
        flaky: 0,
        skipped: 0,
        suite_duration: 0,
        suite_duration_formatted: '',
        tests: [],
        passed_tests: [],
        failed_tests: [],
        flaky_tests: [],
        skipped_tests: [],
    };

    reportPaths.forEach(reportPath => {
        const report: TestReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

        mergedReport.total_tests += report.total_tests;
        mergedReport.passed += report.passed;
        mergedReport.failed += report.failed;
        mergedReport.flaky += report.flaky;
        mergedReport.skipped += report.skipped;
        mergedReport.suite_duration += report.suite_duration;

        // Append and de-duplicate test arrays
        mergedReport.tests.push(...report.tests);
        mergedReport.passed_tests.push(...report.passed_tests);
        mergedReport.failed_tests.push(...report.failed_tests);
        mergedReport.flaky_tests.push(...report.flaky_tests);
        mergedReport.skipped_tests.push(...report.skipped_tests);
    });

    // Remove duplicates and sort arrays
    mergedReport.tests = [...new Set(mergedReport.tests)].sort();
    mergedReport.passed_tests = [...new Set(mergedReport.passed_tests)].sort();
    mergedReport.failed_tests = [...new Set(mergedReport.failed_tests)].sort();
    mergedReport.flaky_tests = [...new Set(mergedReport.flaky_tests)].sort();
    mergedReport.skipped_tests = [...new Set(mergedReport.skipped_tests)].sort();

    // Format the suite duration
    mergedReport.suite_duration_formatted = getFormattedDuration(mergedReport.suite_duration);

    return mergedReport;
};

// Main script execution
const reportsFolder = './all-reports'; // Change to your artifacts location
const reportPaths: string[] = [];

// Function to collect all results.json files
const findReports = (dir: string): void => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes(path.join('api'))) { // todo: update if api suite is also run in matrix job
                // Ignore directories containing 'api'
                findReports(fullPath); // Recurse into subdirectories
            }
        } else if (file === 'results.json' && !fullPath.includes(path.join('api'))) {
            reportPaths.push(fullPath);
        }
    });
};

findReports(reportsFolder);

if (reportPaths.length === 0) {
    console.error('No results.json files found in artifacts.');
    process.exit(1);
}

// Merge reports
const mergedReport = mergeReports(reportPaths);

// Save the merged report
const outputPath = './all-reports/merged-summary.json';
fs.writeFileSync(outputPath, JSON.stringify(mergedReport, null, 2), 'utf8');

console.log(`Merged summary report saved to ${outputPath}`);

// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
const path = require('path');

interface CoverageReport {
    total_features: number;
    total_covered_features: number;
    coverage: string;
    page_coverage: Record<string, number>;
    covered_features: string[];
    uncovered_features: string[];
}

// Helper function to merge page coverage
const mergePageCoverage = (existing: Record<string, number>, newCoverage: Record<string, number>): Record<string, number> => {
    const merged: Record<string, number> = { ...existing };
    for (const page in newCoverage) {
        if (newCoverage[page] !== undefined) {
            merged[page] = (merged[page] ?? 0) + newCoverage[page];
        }
    }
    return merged;
};

// Main function to merge coverage files
const mergeCoverageReports = (reportPaths: string[]): CoverageReport => {
    const mergedReport: CoverageReport = {
        total_features: 0,
        total_covered_features: 0,
        coverage: '0',
        page_coverage: {},
        covered_features: [],
        uncovered_features: [],
    };

    reportPaths.forEach(reportPath => {
        const report: CoverageReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

        // Add total features and covered features
        mergedReport.total_features += report.total_features;
        mergedReport.total_covered_features += report.total_covered_features;

        // Add coverage percentages (convert string to number, remove "%")
        mergedReport.coverage = (parseFloat(mergedReport.coverage.replace('%', '')) + parseFloat(report.coverage.replace('%', ''))).toFixed(2) + '%';

        // Merge page coverage
        mergedReport.page_coverage = mergePageCoverage(mergedReport.page_coverage, report.page_coverage);

        // Append features (deduplication and sorting will be handled separately)
        mergedReport.covered_features.push(...report.covered_features);
        mergedReport.uncovered_features.push(...report.uncovered_features);
    });

    // Deduplicate and sort features after all reports are merged
    mergedReport.covered_features = [...new Set(mergedReport.covered_features)].sort();
    mergedReport.uncovered_features = [...new Set(mergedReport.uncovered_features)].sort();

    // Recalculate overall coverage percentage
    mergedReport.coverage = ((mergedReport.total_covered_features / mergedReport.total_features) * 100).toFixed(2) + '%';

    for (const page in mergedReport.page_coverage) {
        if (mergedReport.page_coverage[page] !== undefined) {
            mergedReport.page_coverage[page] = parseFloat((mergedReport.page_coverage[page]! / reportPaths.length).toFixed(2));
        }
    }

    return mergedReport;
};

// Main script execution
const reportsFolder = './all-reports'; // Update to your artifacts folder location
const reportPaths: string[] = [];

// Collect all coverage.json files
const findReports = (dir: string): void => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes(path.join('api'))) {
                // todo: update if api suite is also run in matrix job
                // Ignore directories containing 'api'
                findReports(fullPath); // Recurse into subdirectories
            }
        } else if (file === 'coverage.json' && !fullPath.includes(path.join('api'))) {
            reportPaths.push(fullPath);
        }
    });
};

findReports(reportsFolder);

if (reportPaths.length === 0) {
    console.error('No coverage.json files found in artifacts.');
    process.exit(1);
}

// Merge reports
const mergedCoverage = mergeCoverageReports(reportPaths);

// Save the merged coverage report
const outputPath = './all-reports/merged-coverage.json';
fs.writeFileSync(outputPath, JSON.stringify(mergedCoverage, null, 2), 'utf8');

console.log(`Merged coverage report saved to ${outputPath}`);
